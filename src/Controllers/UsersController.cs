using k8sdisturber.DataAccess;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/users")]
public class UsersController : ControllerBase
{
    private readonly UserRepositoryService _userRepositoryService;

    public UsersController(UserRepositoryService userRepositoryService)
    {
        _userRepositoryService = userRepositoryService;
    }

    [HttpGet()]
    public IEnumerable<User> GetUsers(int skip, int take)
    {
        return _userRepositoryService.GetUsers(skip, take);
    }

    [HttpGet("{id}")]
    public ActionResult<User?> GetUserById(int id)
    {
        var user = _userRepositoryService.GetUserById(id);
        return user != null ? Ok(user) : NotFound();
    }
}
