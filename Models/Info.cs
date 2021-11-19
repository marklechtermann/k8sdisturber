namespace k8sdisturber.Models;

public class Info
{
    public string? Hostname { get; set; }

    public IEnumerable<string>? IpAdresses { get; set; }

    public string? OsVersion { get; set; }

    public int ProcessorCount { get; set; }
    public int ProcessId { get; internal set; }
}