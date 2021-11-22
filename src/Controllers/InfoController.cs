using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/")]
public class InfoController : ControllerBase
{

    private readonly ILogger<InfoController> _logger;
    private readonly InfoService infoService;

    public InfoController(ILogger<InfoController> logger, InfoService infoService)
    {
        _logger = logger;
        this.infoService = infoService;
    }

    [HttpGet("info")]
    public ActionResult<ApplicationEnvironmentInfo> Info()
    {
        return Ok(infoService.ApplicationEnvironmentInfo);
    }
}
