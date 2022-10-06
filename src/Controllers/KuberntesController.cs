using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/kubernetes")]
public class KubernetesController : ControllerBase
{
    private readonly ILogger<AppController> logger;
    private readonly KubernetesService kubernetesService;

    public KubernetesController(ILogger<AppController> logger, KubernetesService kubernetesService)
    {
        this.logger = logger;
        this.kubernetesService = kubernetesService;
    }

    [HttpGet("info")]
    public ActionResult<KubernetesInfo> GetInfo()
    {
        return kubernetesService.GetInfo();
    }

    [HttpGet("deploymentscale")]
    public ActionResult<DeploymentScale> GetDeploymentScale()
    {
        return kubernetesService.GetDeploymentScale();
    }

    [HttpPut("deploymentscale")]
    public ActionResult<DeploymentScale> PutDeploymentScale(DeploymentScale deploymentScale)
    {
        return kubernetesService.SetDeploymentScale(deploymentScale);
    }
}