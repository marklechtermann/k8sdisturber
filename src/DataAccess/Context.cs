using Bogus;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using static Bogus.DataSets.Name;

namespace k8sdisturber.DataAccess
{

    public class K8sDisturberContext : DbContext
    {
        private readonly ILogger<K8sDisturberContext>? logger;
        private readonly AppOptions options;

        public K8sDisturberContext(ILogger<K8sDisturberContext>? logger, IOptions<AppOptions> options)
        {
            if (options == null || options.Value == null)
            {
                throw new ArgumentException();
            }
            this.logger = logger;
            this.options = options.Value;
        }

        public DbSet<User>? Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            this.logger?.LogInformation($"Try Conntect datase to {options.DBHostname}");
            optionsBuilder.UseNpgsql($"Host={options.DBHostname};Username={options.DBUser};Password={options.DBPassword};Database={options.DBName}");
            // this.Database.EnsureCreatedAsync().GetAwaiter().GetResult();
        }

        public async void ResetDatabase()
        {
            if (!await this.Database.CanConnectAsync())
            {
                return;
            }

            await this.Database.EnsureDeletedAsync();
            await this.Database.EnsureCreatedAsync();

            Randomizer.Seed = new Random(353546);

            var users = new List<User>();
            for (int i = 0; i < options.NumberOfUser; i++)
            {
                var testUsers = new Faker<User>()
                    .RuleFor(u => u.Gender, f => f.PickRandom<Gender>())
                    .RuleFor(u => u.FirstName, (f, u) => f.Name.FirstName(u.Gender))
                    .RuleFor(u => u.LastName, (f, u) => f.Name.LastName(u.Gender))
                    .RuleFor(u => u.Avatar, f => f.Internet.Avatar())
                    .RuleFor(u => u.UserName, (f, u) => f.Internet.UserName(u.FirstName, u.LastName))
                    .RuleFor(u => u.Email, (f, u) => f.Internet.Email(u.FirstName, u.LastName));
                var user = testUsers.Generate();
                users.Add(user);
            }
            this.Users?.AddRange(users);
            await this.SaveChangesAsync();
        }
    }
}

public class User
{
    public int Id { get; set; }
    public Gender Gender { get; set; }
    public string? UserName { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Avatar { get; set; }
    public string? Email { get; set; }
}