namespace k8sdisturber.Models;

public class PodInfo
{
    public string? Name { get; internal set; }
    public string? Ip { get; internal set; }
    public string? Phase { get; internal set; }
    public DateTime? StartTime { get; internal set; }
}
