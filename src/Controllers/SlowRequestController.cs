using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/slow/")]
public class SlowRequestController : ControllerBase
{
    private static readonly object slowLock = new object();

    private readonly ILogger<AppController> logger;
    private readonly InfoService infoService;

    public SlowRequestController(ILogger<AppController> logger, AppService appService, InfoService infoService)
    {
        this.logger = logger;
        this.infoService = infoService;
    }

    [HttpGet()]
    public ActionResult<SlowRequest> Slow(int delay)
    {
        var start = DateTime.Now;
        logger.LogInformation("Slow Request: Enter");
        lock (slowLock)
        {
            logger.LogInformation($"Slow Request: Wait {delay}...");
            Thread.Sleep(Math.Max(0, delay));
        }
        logger.LogInformation($"Slow Request: Finished");
        return Ok(new SlowRequest() { Start = start, End = DateTime.Now, InstanceId = this.infoService.ApplicationEnvironmentInfo.InstanceId, Hostname = this.infoService.ApplicationEnvironmentInfo.Hostname });
    }
}