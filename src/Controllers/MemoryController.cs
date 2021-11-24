using k8sdisturber.DataAccess;
using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/memory/")]
public class MemoryController : ControllerBase
{
    private readonly ILogger<AppController> logger;
    private readonly AppService appService;

    public MemoryController(ILogger<AppController> logger, UserRepositoryService userRepositoryService, AppService appService, InfoService infoService)
    {
        this.logger = logger;
        this.appService = appService;
    }

    [HttpGet()]
    public ActionResult<MemoryAllocation> GetAllocatedMegaBytes()
    {
        return Ok(new MemoryAllocation() { AllocatedMegaBytes = this.appService.AllocatedMegaBytes });
    }

    [HttpPut()]
    public ActionResult<MemoryAllocation> PutAllocatedMegaBytes(MemoryAllocation memoryRequest)
    {
        this.appService.AllocatedMegaBytes = memoryRequest.AllocatedMegaBytes;
        return Ok(new MemoryAllocation() { AllocatedMegaBytes = this.appService.AllocatedMegaBytes });
    }
}
