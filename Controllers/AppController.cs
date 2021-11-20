using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/")]
public class AppController : ControllerBase
{
    private readonly ILogger<AppController> logger;
    private readonly AppService appService;

    public AppController(ILogger<AppController> logger, AppService appService)
    {
        this.logger = logger;
        this.appService = appService;
    }

    [HttpDelete]
    public IActionResult Delete()
    {
        logger.LogInformation("Request service deletion. Have a nice day!");
        Task.Delay(2000).ContinueWith(a => { Environment.Exit(0); });
        return Ok();
    }

    [HttpPost("memory")]
    public ActionResult<MemoryRequest> AllocateMemory(MemoryRequest memoryRequest)
    {
        logger.LogInformation("Request service deletion. Have a nice day!");
        return Ok(new MemoryRequest());
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

    [HttpGet("status")]
    public ActionResult<Status> GetStatus()
    {
        return new Status()
        {
            IsAlive = this.appService.IsAlive,
            IsReady = this.appService.IsReady
        };
    }

    [HttpPost("status")]
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
        this.appService.SetTemporaryReadyState(status.MillisecondsIsAliveDuration, status.IsReady);

        return status;
    }
}
