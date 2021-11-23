using System.Net;
using k8sdisturber.Models;
using Microsoft.Extensions.Options;

namespace k8sdisturber.Services;

public class AppService
{
    private readonly ILogger<AppService> logger;
    private readonly AppOptions? options;
    private bool isAlive = false;
    private bool isReady = false;
    private Task? temporaryReadyStateTask;
    private Task? temporaryAliveStateTask;
    private Task? readyStateDelayTask;
    private Task? aliveStateDelayTask;
    private byte[] memory = new byte[0];
    private static Random random = new Random();

    public AppService(ILogger<AppService> logger, IOptions<AppOptions> options)
    {
        this.logger = logger;
        this.options = options?.Value;
    }

    public void Initialize()
    {
        if (this.options != null && this.options.LivenessDelay > 0)
        {
            this.IsAlive = false;
            this.SetAliveStateWithDelay(this.options.LivenessDelay, true);
        }
        else
        {
            this.IsAlive = true;
        }

        if (this.options != null && this.options.ReadinessDelay > 0)
        {
            this.IsReady = false;
            this.SetReadyStateWithDelay(this.options.ReadinessDelay, true);
        }
        else
        {
            this.IsReady = true;
        }
    }

    public int AllocatedMegaBytes
    {
        get => memory.Length / 1000000;
        set
        {
            try
            {
                var v = Math.Min(Math.Max(0, value), 2147);
                memory = new byte[1000000 * v];
                random.NextBytes(memory);
                GC.Collect();
            }
            catch (OutOfMemoryException)
            {
                this.logger.LogError("Out of memory! Terminating Application");
                Environment.Exit(1);
            }
        }
    }

    public bool IsReady
    {
        get => isReady;
        set
        {
            if (isReady != value)
            {
                isReady = value;
                this.logger?.LogInformation($"IsReady is {this.isReady}");
            }
        }
    }

    public bool IsAlive
    {
        get => isAlive;
        set
        {
            if (isAlive != value)
            {
                isAlive = value;
                this.logger?.LogInformation($"IsAlive is {this.isAlive}");
            }
        }
    }

    public void SetReadyStateWithDelay(int millisecondsDelay, bool isReady)
    {
        readyStateDelayTask = Task.Run(async () =>
        {
            this.logger.LogInformation($"Set ready state to {isReady} in {millisecondsDelay} ms.");
            await Task.Delay(millisecondsDelay);
            this.IsReady = isReady;
        });
    }

    public void SetAliveStateWithDelay(int millisecondsDelay, bool isAlive)
    {
        aliveStateDelayTask = Task.Run(async () =>
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