using k8sdisturber.Models;
using k8sdisturber.Services;
using Microsoft.AspNetCore.Mvc;

namespace k8sdisturber.Controllers;

[ApiController]
[Route("/api/kubernetes")]
public class KubernetesController : ControllerBase
{
    private readonly KubernetesService _kubernetesService;

    public KubernetesController(KubernetesService kubernetesService)
    {
        _kubernetesService = kubernetesService;
    }

    [HttpGet("info")]
    public ActionResult<KubernetesInfo> GetInfo()
    {
        return _kubernetesService.GetInfo();
    }

    [HttpGet("deploymentscale")]
    public ActionResult<DeploymentScale> GetDeploymentScale()
    {
        return _kubernetesService.GetDeploymentScale();
    }

    [HttpPut("deploymentscale")]
    public ActionResult<DeploymentScale> PutDeploymentScale(DeploymentScale deploymentScale)
    {
        return _kubernetesService.SetDeploymentScale(deploymentScale);
    }
}
