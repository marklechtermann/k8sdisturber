using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/info/")]
public class InfoController : ControllerBase
{
    private readonly InfoService _infoService;

    public InfoController(InfoService infoService)
    {
        _infoService = infoService;
    }

    [HttpGet()]
    public ActionResult<ApplicationEnvironmentInfo> Info()
    {
        return Ok(_infoService.ApplicationEnvironmentInfo);
    }
}
