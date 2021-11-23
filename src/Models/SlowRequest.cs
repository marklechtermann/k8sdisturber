namespace k8sdisturber.Models
{
    public class SlowRequest
    {
        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public string? InstanceId { get; set; }

        public string? Hostname { get; set; }
    }
}