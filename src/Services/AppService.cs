using Microsoft.Extensions.Options;

namespace k8sdisturber.Services;

public class AppService
{
    private readonly ILogger<AppService> _logger;
    private readonly AppOptions? _options;
    private bool _isAlive;
    private bool _isReady;
    private byte[] _memory = Array.Empty<byte>();
    private static readonly Random _random = new();

    public AppService(ILogger<AppService> logger, IOptions<AppOptions> options)
    {
        _logger = logger;
        _options = options?.Value;
    }

    public void Initialize()
    {
        if (_options != null && _options.LivenessDelay > 0)
        {
            IsAlive = false;
            SetAliveStateWithDelay(_options.LivenessDelay, true);
        }
        else
        {
            IsAlive = true;
        }

        if (_options != null && _options.ReadinessDelay > 0)
        {
            IsReady = false;
            SetReadyStateWithDelay(_options.ReadinessDelay, true);
        }
        else
        {
            IsReady = true;
        }
    }

    public int AllocatedMegaBytes
    {
        get => _memory.Length / 1000000;
        set
        {
            try
            {
                var v = Math.Min(Math.Max(0, value), 2147);
                _memory = new byte[1000000 * v];
                _random.NextBytes(_memory);
                GC.Collect();
            }
            catch (OutOfMemoryException)
            {
                _logger.LogError("Out of memory! Terminating Application");
                Environment.Exit(1);
            }
        }
    }

    public bool IsReady
    {
        get => _isReady;
        set
        {
            if (_isReady != value)
            {
                _isReady = value;
                _logger?.LogInformation("Ready state changed {_isReady}", _isReady);
            }
        }
    }

    public bool IsAlive
    {
        get => _isAlive;
        set
        {
            if (_isAlive != value)
            {
                _isAlive = value;
                _logger?.LogInformation("IsAlive state changed {_isAlive}", _isAlive);
            }
        }
    }

    public void SetReadyStateWithDelay(int millisecondsDelay, bool isReady)
    {
        Task.Run(async () =>
        {
            _logger.LogInformation("Set IsReady delay {MillisecondsDelay}", millisecondsDelay);
            await Task.Delay(millisecondsDelay);
            IsReady = isReady;
        });
    }

    public void SetAliveStateWithDelay(int millisecondsDelay, bool isAlive)
    {
        Task.Run(async () =>
        {
            _logger.LogInformation("Set IsAlive delay {MillisecondsDelay}", millisecondsDelay);
            await Task.Delay(millisecondsDelay);
            IsAlive = isAlive;
        });
    }

    public void SetTemporaryReadyState(int millisecondsDuration, bool isReady)
    {
        Task.Run(async () =>
       {
           _logger.LogInformation("Set temporary IsReady delay {MillisecondsDuration}", millisecondsDuration);

           var prevValue = IsReady;
           IsReady = isReady;
           await Task.Delay(millisecondsDuration).ContinueWith((t) =>
           {
               _logger.LogInformation("Reset temporary IsReady {MillisecondsDuration}", millisecondsDuration);

               IsReady = prevValue;
           });
       });
    }

    public void SetTemoraryAliveState(int millisecondsDuration, bool isAlive)
    {
        Task.Run(async () =>
        {
            _logger.LogInformation("Set temporary IsAlive delay {MillisecondsDuration}", millisecondsDuration);

            var prevValue = IsAlive;
            IsAlive = isAlive;
            await Task.Delay(millisecondsDuration).ContinueWith((t) =>
            {
                _logger.LogInformation($"Reset temporary IsAlive delay");

                IsAlive = prevValue;
            });
        });
    }

}
