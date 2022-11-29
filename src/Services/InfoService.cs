using System.Collections;
using System.Net;
using k8sdisturber.Models;

namespace k8sdisturber.Services;

public class InfoService
{
    private static readonly string _instanceGuid = "";

    private ApplicationEnvironmentInfo? _info;

    static InfoService()
    {
        _instanceGuid = Guid.NewGuid().ToString();
    }

    public ApplicationEnvironmentInfo ApplicationEnvironmentInfo
    {
        get
        {
            _info ??= GetInfo();
            return _info;
        }
    }

    private static ApplicationEnvironmentInfo GetInfo()
    {
        var envs = Environment.GetEnvironmentVariables();
        var environmentVariables = new List<KeyValuePair<string, string>>();

        foreach (DictionaryEntry de in envs)
        {
            if (de.Key != null && de.Value != null)
            {
                var key = de.Key.ToString();
                var value = de.Value.ToString();
                if (key != null && value != null)
                {
                    environmentVariables.Add(new KeyValuePair<string, string>(key, value));
                }
            }
        }

        return new ApplicationEnvironmentInfo()
        {
            Hostname = Dns.GetHostName(),
            IpAdresses = GetLocalIPAddress(),
            OsVersion = Environment.OSVersion.VersionString,
            ProcessorCount = Environment.ProcessorCount,
            ProcessId = Environment.ProcessId,
            EnvironmentVariables = environmentVariables,
            Version = Environment.GetEnvironmentVariable("K8SVERSION"),
            UserName = Environment.UserName,
            UserId = Mono.Unix.UnixUserInfo.GetRealUserId(),
            InstanceId = _instanceGuid
        };
    }

    private static IEnumerable<string> GetLocalIPAddress()
    {
        var host = Dns.GetHostEntry(Dns.GetHostName());
        return host.AddressList.Select(i => i.ToString());
    }

}
