namespace k8sdisturber;

public class AppOptions
{
    public int ReadinessDelay { get; set; }
    public int LivenessDelay { get; set; }
    public string? DBHostname { get; set; }
    public string? DBUser { get; set; }
    public string? DBName { get; set; } = "k8sdisturber";
    public string? DBPassword { get; set; }

}