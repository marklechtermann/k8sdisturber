namespace k8sdisturber.Models
{
    public class SlowRequest
    {
        public double Duration { get; set; }

        public string? InstanceId { get; set; }

        public string? Hostname { get; set; }
    }
}