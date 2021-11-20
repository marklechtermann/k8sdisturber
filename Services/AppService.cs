using System.Net;
using k8sdisturber.Models;

namespace k8sdisturber.Services;

public class AppService
{
    private readonly ILogger<AppService> logger;

    private bool isAlive = true;
    private bool isReady = true;
    private Task temporaryReadyStateTask;
    private Task temporaryAliveStateTask;

    public AppService(ILogger<AppService> logger)
    {
        this.logger = logger;
    }

    public bool IsReady
    {
        get => isReady;
        set
        {
            isReady = value;
            this.logger?.LogInformation($"IsReady is {this.isReady}");
        }
    }

    public bool IsAlive
    {
        get => isAlive;
        set
        {
            isAlive = value;
            this.logger?.LogInformation($"IsAlive is {this.isAlive}");
        }
    }

    public void SetReadyStateWithDelay(int millisecondsDelay, bool isReady)
    {
        var task = Task.Run(async () =>
        {
            this.logger.LogInformation($"Set ready state to {isReady} in {millisecondsDelay} ms.");
            await Task.Delay(millisecondsDelay);
            this.IsReady = isReady;
        });
    }

    public void SetAliveStateWithDelay(int millisecondsDelay, bool isAlive)
    {
        var task = Task.Run(async () =>
        {
            this.logger.LogInformation($"Set alive state to {isAlive} in {millisecondsDelay} ms.");
            await Task.Delay(millisecondsDelay);
            this.IsAlive = isAlive;
        });
    }

    public void SetTemporaryReadyState(int millisecondsDuration, bool isReady)
    {
        temporaryReadyStateTask = Task.Run(async () =>
        {
            this.logger.LogInformation($"Set temporary ready state to {isReady} for {millisecondsDuration} ms.");
            bool prevValue = this.IsReady;
            this.IsReady = isReady;
            await Task.Delay(millisecondsDuration).ContinueWith((t) =>
            {
                this.logger.LogInformation($"Reset temporary ready state to {prevValue}.");
                this.IsReady = prevValue;
            });
        });
    }

    public void SetTemoraryAliveState(int millisecondsDuration, bool isAlive)
    {
        temporaryAliveStateTask = Task.Run(async () =>
        {
            this.logger.LogInformation($"Set temporary alive state to {isAlive} for {millisecondsDuration} ms.");
            bool prevValue = this.IsAlive;
            this.IsAlive = isAlive;
            await Task.Delay(millisecondsDuration).ContinueWith((t) =>
            {
                this.logger.LogInformation($"Reset temporary alive state to {prevValue}.");
                this.IsAlive = prevValue;
            });
        });
    }

}