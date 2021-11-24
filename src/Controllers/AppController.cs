using k8sdisturber.DataAccess;
using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/")]
public class AppController : ControllerBase
{
    private readonly ILogger<AppController> logger;
    private readonly UserRepositoryService userRepositoryService;
    private readonly AppService appService;
    private readonly InfoService infoService;

    public AppController(ILogger<AppController> logger, UserRepositoryService userRepositoryService, AppService appService, InfoService infoService)
    {
        this.logger = logger;
        this.userRepositoryService = userRepositoryService;
        this.appService = appService;
        this.infoService = infoService;
    }

    [HttpDelete]
    public IActionResult Delete()
    {
        logger.LogInformation("Request service deletion. Have a nice day!");
        Task.Delay(2000).ContinueWith(a => { Environment.Exit(1); });
        return Ok();
    }

    [HttpGet("readyz")]
    [Produces("text/plain")]
    public IActionResult ReadyZ()
    {
        return this.appService.IsReady ? Ok("ok") : StatusCode(503, "fail");
    }

    [HttpGet("livez")]
    [Produces("text/plain")]
    public IActionResult LiveZ()
    {
        return this.appService.IsAlive ? Ok("ok") : StatusCode(503, "fail");
    }

    [HttpGet("dbreadyz")]
    public IActionResult GetDatabaseStatus()
    {
        return this.userRepositoryService.DatabaseAvailable ? Ok("ok") : StatusCode(503, "database down");
    }

    [HttpGet("status")]
    public ActionResult<Status> GetStatus()
    {
        return new Status()
        {
            IsAlive = this.appService.IsAlive,
            IsReady = this.appService.IsReady
        };
    }

    [HttpPut("status")]
    public ActionResult<Status> SetStatus(Status status)
    {
        this.appService.IsAlive = status.IsAlive;
        this.appService.IsReady = status.IsReady;

        return new Status()
        {
            IsAlive = this.appService.IsAlive,
            IsReady = this.appService.IsReady
        };
    }

    [HttpPost("temporarystatus")]
    public ActionResult<TemporaryStatus> SetTemporaryStatus(TemporaryStatus status)
    {
        this.appService.SetTemoraryAliveState(status.MillisecondsIsAliveDuration, status.IsAlive);
        this.appService.SetTemporaryReadyState(status.MillisecondsIsReadyDuration, status.IsReady);

        return status;
    }
}
