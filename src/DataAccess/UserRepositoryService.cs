namespace k8sdisturber.DataAccess;

public class UserRepositoryService
{
    private readonly ILogger<UserRepositoryService>? _logger;
    private readonly K8sDisturberContext _context;

    public UserRepositoryService(ILogger<UserRepositoryService>? logger, K8sDisturberContext context)
    {
        _logger = logger;
        _context = context ?? throw new ArgumentException("DB context is null");
    }

    public bool DatabaseAvailable => _context.Database.CanConnect();

    public IEnumerable<User> GetUsers(int skip, int take)
    {
        if (!DatabaseAvailable || _context.Users == null)
        {
            _logger?.LogWarning("Database not available");
            return new List<User>();
        }

        _context.EnsureInitializedAsync().Wait();
        return _context.Users.OrderBy(u => u.Id).Skip(skip).Take(take).ToList();
    }

    internal User? GetUserById(int id)
    {
        if (!DatabaseAvailable || _context.Users == null)
        {
            _logger?.LogWarning("Database not available");
            return new User();
        }

        _context.EnsureInitializedAsync().Wait();
        return _context.Users.FirstOrDefault(u => u.Id == id);
    }
}
