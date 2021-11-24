using Bogus;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using static Bogus.DataSets.Name;

namespace k8sdisturber.DataAccess
{
    public class K8sDisturberContext : DbContext
    {
        private const int SEED = 353546;
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
        }

        public async void EnsureInitializedAsync()
        {
            if (!await this.Database.CanConnectAsync())
            {
                this.logger?.LogWarning($"Failed to connect to database {options.DBHostname}.");
                return;
            }

            await this.Database.EnsureCreatedAsync();

            // Check if Users table contains already some data
            var numberOfEntries = this.Users?.Count();
            if (numberOfEntries != null && numberOfEntries.Value > 0)
            {
                return;
            }

            Randomizer.Seed = new Random(SEED);

            // Create some database entries
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
