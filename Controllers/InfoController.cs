using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/info")]
public class InfoController : ControllerBase
{

    private readonly ILogger<InfoController> _logger;
    private readonly InfoService infoService;

    public InfoController(ILogger<InfoController> logger, InfoService infoService)
    {
        _logger = logger;
        this.infoService = infoService;
    }


    [HttpGet("")]
    public ActionResult<Info> Info()
    {
        return Ok(infoService.GetInfo());
    }



}
