using k8s;
using k8sdisturber.Models;

namespace k8sdisturber.Services;

public class KubernetesService
{
    private readonly ILogger<AppService>? _logger;

    public KubernetesService(ILogger<AppService>? logger)
    {
        _logger = logger;

        var envPodNamespace = Environment.GetEnvironmentVariable("KUBERNETES_NAMESPACE");
        K8sDisturberNamespace = string.IsNullOrEmpty(envPodNamespace) ? "k8sdisturber" : envPodNamespace;

        var config = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("KUBERNETES_SERVICE_HOST"))
            ? KubernetesClientConfiguration.InClusterConfig()
            : KubernetesClientConfiguration.BuildConfigFromConfigFile();
        Client = new Kubernetes(config);
    }

    public Kubernetes? Client { get; }

    public string K8sDisturberNamespace { get; }

    public KubernetesInfo GetInfo()
    {
        var info = new KubernetesInfo();

        try
        {
            if (Client != null)
            {
                info.PodInfos.AddRange(Client.CoreV1.ListNamespacedPod(K8sDisturberNamespace).Items.Select(pod =>
                {
                    return new PodInfo()
                    {
                        Name = pod.Metadata.Name,
                        Ip = pod.Status.PodIP,
                        Phase = pod.Status.Phase,
                        StartTime = pod.Status.StartTime
                    };
                }
                ));

                var replicaSet = Client.ListNamespacedReplicaSet(K8sDisturberNamespace).Items.FirstOrDefault(i => i.Metadata.Labels.Contains(new("app", "k8sdisturber")));
                if (replicaSet != null)
                {
                    info.ReplicaStatus.AvailableReplicas = replicaSet.Status.AvailableReplicas;
                    info.ReplicaStatus.ReadyReplicas = replicaSet.Status.ReadyReplicas;
                    info.ReplicaStatus.Replicas = replicaSet.Status.Replicas;
                }
            }
        }
        catch (HttpRequestException)
        {
            _logger?.LogInformation("K8s API server not available");
        }
        catch (k8s.Autorest.HttpOperationException)
        {
            _logger?.LogInformation("K8s ressource not available");
        }

        return info;
    }

    public DeploymentScale GetDeploymentScale()
    {
        var deploymentScale = new DeploymentScale();
        try
        {
            if (Client != null)
            {
                var scale = Client.ReadNamespacedDeploymentScale("k8sdisturber", K8sDisturberNamespace);
                deploymentScale.Replicas = scale.Spec.Replicas ?? -1;
            }
        }
        catch (HttpRequestException)
        {
            _logger?.LogInformation("K8s API server not available");
        }
        catch (k8s.Autorest.HttpOperationException)
        {
            _logger?.LogInformation("K8s ressource not available");
        }

        return deploymentScale;
    }

    public DeploymentScale SetDeploymentScale(DeploymentScale deploymentScale)
    {
        try
        {
            if (Client != null && deploymentScale.Replicas > 0 && deploymentScale.Replicas < 20)
            {
                var scale = Client.ReadNamespacedDeploymentScale("k8sdisturber", K8sDisturberNamespace);
                scale.Spec.Replicas = deploymentScale.Replicas;
                Client.ReplaceNamespacedDeploymentScale(scale, "k8sdisturber", K8sDisturberNamespace);
            }
        }
        catch (HttpRequestException)
        {
            _logger?.LogInformation("K8s API server not available");
        }
        catch (k8s.Autorest.HttpOperationException)
        {
            _logger?.LogInformation("K8s ressource not available");
        }

        return GetDeploymentScale();
    }
}
