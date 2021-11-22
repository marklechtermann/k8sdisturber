using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

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

        public DbSet<Person>? Persons { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            this.logger?.LogInformation($"Try Conntect datase to {options.DBHostname}");
            optionsBuilder.UseNpgsql($"Host={options.DBHostname};Username={options.DBUser};Password={options.DBPassword};Database={options.DBName}");
        }

    }

    public class Person
    {

        public int Id { get; set; }
        public string? Name { get; set; }

    }

}