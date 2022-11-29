using Bogus;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using static Bogus.DataSets.Name;

namespace k8sdisturber.DataAccess;

public class K8sDisturberContext : DbContext
{
    private const int SEED = 353546;
    private readonly ILogger<K8sDisturberContext>? _logger;
    private readonly AppOptions _options;

    public K8sDisturberContext(ILogger<K8sDisturberContext>? logger, IOptions<AppOptions> options)
    {
        if (options == null || options.Value == null)
        {
            throw new ArgumentException("Options not set");
        }
        _logger = logger;
        _options = options.Value;
    }

    public DbSet<User>? Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql($"Host={_options.DBHostname};Username={_options.DBUser};Password={_options.DBPassword};Database={_options.DBName}");
    }

    public async Task<bool> EnsureInitializedAsync()
    {
        if (!await Database.CanConnectAsync())
        {
            _logger?.LogWarning($"Failed to connect to database.", _options.DBHostname);
            return false;
        }

        await Database.EnsureCreatedAsync();

        // Check if Users table contains already some data
        var numberOfEntries = Users?.Count();
        if (numberOfEntries != null && numberOfEntries.Value > 0)
        {
            return true;
        }

        _logger?.LogWarning($"Initializing database...");

        Randomizer.Seed = new Random(SEED);

        // Create some database entries
        var users = new List<User>();
        for (var i = 0; i < _options.NumberOfUser; i++)
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
        Users?.AddRange(users);
        await SaveChangesAsync();
        return true;
    }
}
