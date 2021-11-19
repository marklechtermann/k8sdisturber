using k8sdisturber.Models;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/info")]
public class InfoController : ControllerBase
{

    private readonly ILogger<WeatherForecastController> _logger;

    public InfoController(ILogger<WeatherForecastController> logger)
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
