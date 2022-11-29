using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/memory/")]
public class MemoryController : ControllerBase
{
    private readonly AppService _appService;

    public MemoryController(AppService appService)
    {
        _appService = appService;
    }

    [HttpGet()]
    public ActionResult<MemoryAllocation> GetAllocatedMegaBytes()
    {
        return Ok(new MemoryAllocation() { AllocatedMegaBytes = _appService.AllocatedMegaBytes });
    }

    [HttpPut()]
    public ActionResult<MemoryAllocation> PutAllocatedMegaBytes(MemoryAllocation memoryRequest)
    {
        _appService.AllocatedMegaBytes = memoryRequest.AllocatedMegaBytes;
        return Ok(new MemoryAllocation() { AllocatedMegaBytes = _appService.AllocatedMegaBytes });
    }
}
