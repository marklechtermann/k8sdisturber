namespace k8sdisturber.DataAccess
{
    public class UserRepositoryService
    {
        private readonly ILogger<UserRepositoryService>? logger;
        private readonly K8sDisturberContext context;

        public UserRepositoryService(ILogger<UserRepositoryService>? logger, K8sDisturberContext context)
        {
            if (context == null)
            {
                throw new ArgumentException("DB context is null");
            }

            this.logger = logger;
            this.context = context;
        }

        public bool DatabaseAvailable
        {
            get { return context.Database.CanConnect(); }
        }

        public IEnumerable<User> GetUsers(int skip, int take)
        {
            if (!this.DatabaseAvailable || context.Users == null)
            {
                this.logger?.LogWarning("Database not available");
                return new List<User>();
            }

            context.EnsureInitializedAsync().Wait();
            return context.Users.OrderBy(u => u.Id).Skip(skip).Take(take).ToList();
        }

        internal User? GetUserById(int id)
        {
            if (!this.DatabaseAvailable || context.Users == null)
            {
                this.logger?.LogWarning("Database not available");
                return new User();
            }

            context.EnsureInitializedAsync().Wait();
            return context.Users.FirstOrDefault(u => u.Id == id);
        }
    }
}