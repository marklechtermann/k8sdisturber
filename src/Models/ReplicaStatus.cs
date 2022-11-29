namespace k8sdisturber.Models;

public class ReplicaStatus
{
    public int? AvailableReplicas { get; internal set; }
    public int? ReadyReplicas { get; internal set; }
    public int Replicas { get; internal set; }
}
