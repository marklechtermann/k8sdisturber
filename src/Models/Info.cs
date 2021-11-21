namespace k8sdisturber.Models;

public class Info
{
    public string? Hostname { get; set; }
    public string? Version { get; set; }
    public IEnumerable<string>? IpAdresses { get; set; }
    public string? OsVersion { get; set; }
    public int ProcessorCount { get; set; }
    public int ProcessId { get; set; }
    public Dictionary<string, string>? EnvironmentVariables { get; set; }
}