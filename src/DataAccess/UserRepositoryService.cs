namespace k8sdisturber.DataAccess
{

    public class UserRepositoryService
    {
        private readonly K8sDisturberContext context;

        public UserRepositoryService(K8sDisturberContext context)
        {
            if (context == null)
            {
                throw new ArgumentException("DB context is null");
            }
            this.context = context;
        }

        public bool DatabaseAvailable
        {
            get { return context.Database.CanConnect(); }
        }

        public IEnumerable<User> GetUsers(int skip, int take)
        {
            if (!context.Database.CanConnect() || context.Users == null)
            {
                return new List<User>();
            }
            return context.Users.OrderBy(u => u.Id).Skip(skip).Take(take).ToList();
        }

        internal User? GetUserById(int id)
        {
            if (!context.Database.CanConnect() || context.Users == null)
            {
                return new User();
            }

            return context.Users.FirstOrDefault(u => u.Id == id);
        }

    }
}