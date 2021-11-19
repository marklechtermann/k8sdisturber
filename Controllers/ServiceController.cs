using k8sdisturber.Models;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/")]
public class ServiceController : ControllerBase
{

    private readonly ILogger<ServiceController> _logger;

    public ServiceController(ILogger<ServiceController> logger)
    {
        _logger = logger;
    }

    [HttpDelete]
    public IActionResult Delete()
    {
        _logger.LogInformation("Request service deletion. Have a nice day!");
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
