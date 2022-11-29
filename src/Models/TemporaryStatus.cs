namespace k8sdisturber.Models;

public class TemporaryStatus : Status
{
    public int MillisecondsIsAliveDuration { get; set; }

    public int MillisecondsIsReadyDuration { get; set; }

}
