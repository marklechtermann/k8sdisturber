namespace k8sdisturber.Models;

public class KubernetesInfo
{
    public List<PodInfo> PodInfos { get; } = new List<PodInfo>();
    public ReplicaStatus ReplicaStatus { get; } = new ReplicaStatus();
}
