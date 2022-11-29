using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/slow/")]
public class SlowRequestController : ControllerBase
{
    private static readonly object _slowLock = new();

    private readonly ILogger<AppController> _logger;
    private readonly InfoService _infoService;

    public SlowRequestController(ILogger<AppController> logger, InfoService infoService)
    {
        _logger = logger;
        _infoService = infoService;
    }

    [HttpGet()]
    public ActionResult<SlowRequest> Slow(int delay)
    {
        var start = DateTime.Now;
        _logger.LogInformation("Slow Request: Enter");
        lock (_slowLock)
        {
            _logger.LogInformation("Slow request {Delay}", delay);
            Thread.Sleep(Math.Max(0, delay));
        }
        _logger.LogInformation($"Slow Request: Finished");
        return Ok(new SlowRequest() { Start = start, End = DateTime.Now, InstanceId = _infoService.ApplicationEnvironmentInfo.InstanceId, Hostname = _infoService.ApplicationEnvironmentInfo.Hostname });
    }
}
