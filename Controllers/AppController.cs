using k8sdisturber.Models;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/")]
public class AppController : ControllerBase
{

    private readonly ILogger<AppController> _logger;

    public AppController(ILogger<AppController> logger)
    {
        _logger = logger;
    }

    [HttpDelete]
    public IActionResult Delete()
    {
        _logger.LogInformation("Request service deletion. Have a nice day!");
        Task.Delay(2000).ContinueWith(a => { Environment.Exit(0); });
        return Ok();
    }

    [HttpPost("memory")]
    public ActionResult<MemoryRequest> AllocateMemory(MemoryRequest memoryRequest)
    {
        _logger.LogInformation("Request service deletion. Have a nice day!");
        return Ok(new MemoryRequest());
    }

    [HttpGet("readyz")]
    [Produces("text/plain")]
    public IActionResult ReadyZ()
    {
        return Ok("ok");
    }

    [HttpGet("livez")]
    [Produces("text/plain")]
    public IActionResult LiveZ()
    {
        return Ok("ok");
    }

}
