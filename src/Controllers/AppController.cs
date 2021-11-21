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

    private static readonly object slowLock = new object();

    public AppController(ILogger<AppController> logger, AppService appService)
    {
        this.logger = logger;
        this.appService = appService;
    }

    [HttpDelete]
    public IActionResult Delete()
    {
        logger.LogInformation("Request service deletion. Have a nice day!");
        Task.Delay(2000).ContinueWith(a => { Environment.Exit(1); });
        return Ok();
    }

    [HttpGet("slow")]
    public IActionResult Slow(int delay)
    {
        var start = DateTime.Now;
        logger.LogInformation("Slow Request: Enter...");
        lock (slowLock)
        {
            logger.LogInformation($"Slow Request: Wait {delay}...");
            Thread.Sleep(Math.Max(0, delay));
        }
        logger.LogInformation($"Slow Request: Finished");
        var duration = (DateTime.Now - start).TotalMilliseconds;
        return Ok($"{Math.Max(0, duration)} ms");
    }

    [HttpGet("memory")]
    public ActionResult<MemoryAllocation> GetAllocatedMegaBytes()
    {
        return Ok(new MemoryAllocation() { AllocatedMegaBytes = this.appService.AllocatedMegaBytes });
    }

    [HttpPut("memory")]
    public ActionResult<MemoryAllocation> PutAllocatedMegaBytes(MemoryAllocation memoryRequest)
    {
        this.appService.AllocatedMegaBytes = memoryRequest.AllocatedMegaBytes;
        return Ok(new MemoryAllocation() { AllocatedMegaBytes = this.appService.AllocatedMegaBytes });
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
