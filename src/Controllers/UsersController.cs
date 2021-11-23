using k8sdisturber.DataAccess;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers
{
    [ApiController]
    [Route("/api/users")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<AppController> logger;
        private readonly UserRepositoryService userRepositoryService;

        public UsersController(ILogger<AppController> logger, UserRepositoryService userRepositoryService)
        {
            this.logger = logger;
            this.userRepositoryService = userRepositoryService;
        }

        [HttpGet()]
        public IEnumerable<User> GetUsers(int skip, int take)
        {
            return this.userRepositoryService.GetUsers(skip, take);
        }

        [HttpGet("{id}")]
        public ActionResult<User?> GetUserById(int id)
        {
            var user = this.userRepositoryService.GetUserById(id);
            return user != null ? Ok(user) : NotFound();
        }
    }
}