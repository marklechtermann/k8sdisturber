using k8sdisturber.DataAccess;
using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/")]
public class AppController : ControllerBase
{
    private readonly ILogger<AppController> _logger;
    private readonly UserRepositoryService _userRepositoryService;
    private readonly AppService _appService;

    public AppController(ILogger<AppController> logger, UserRepositoryService userRepositoryService, AppService appService)
    {
        _logger = logger;
        _userRepositoryService = userRepositoryService;
        _appService = appService;
    }

    [HttpDelete]
    public IActionResult Delete()
    {
        _logger.LogInformation("Request service deletion. Have a nice day!");
        Task.Delay(2000).ContinueWith(a => { Environment.Exit(1); });
        return Ok();
    }

    [HttpGet("readyz")]
    [Produces("text/plain")]
    public IActionResult ReadyZ()
    {
        return _appService.IsReady ? Ok("ok") : StatusCode(503, "fail");
    }

    [HttpGet("livez")]
    [Produces("text/plain")]
    public IActionResult LiveZ()
    {
        return _appService.IsAlive ? Ok("ok") : StatusCode(503, "fail");
    }

    [HttpGet("dbreadyz")]
    public IActionResult GetDatabaseStatus()
    {
        return _userRepositoryService.DatabaseAvailable ? Ok("ok") : StatusCode(503, "database down");
    }

    [HttpGet("status")]
    public ActionResult<Status> GetStatus()
    {
        return new Status()
        {
            IsAlive = _appService.IsAlive,
            IsReady = _appService.IsReady
        };
    }

    [HttpPut("status")]
    public ActionResult<Status> SetStatus(Status status)
    {
        _appService.IsAlive = status.IsAlive;
        _appService.IsReady = status.IsReady;

        return new Status()
        {
            IsAlive = _appService.IsAlive,
            IsReady = _appService.IsReady
        };
    }

    [HttpPost("temporarystatus")]
    public ActionResult<TemporaryStatus> SetTemporaryStatus(TemporaryStatus status)
    {
        _appService.SetTemoraryAliveState(status.MillisecondsIsAliveDuration, status.IsAlive);
        _appService.SetTemporaryReadyState(status.MillisecondsIsReadyDuration, status.IsReady);

        return status;
    }
}
