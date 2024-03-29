namespace k8sdisturber.Models;

public class ApplicationEnvironmentInfo
{
    public string? Hostname { get; set; }
    public string? Version { get; set; }
    public IEnumerable<string>? IpAdresses { get; set; }
    public string? OsVersion { get; set; }
    public int ProcessorCount { get; set; }
    public int ProcessId { get; set; }
    public IEnumerable<KeyValuePair<string, string>>? EnvironmentVariables { get; set; }
    public string? UserName { get; internal set; }
    public long UserId { get; internal set; }
    public string? InstanceId { get; internal set; }
}

