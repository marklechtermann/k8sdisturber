using System.Collections;
using System.Linq;
using System.Net;
using k8sdisturber.Models;

namespace k8sdisturber.Services
{
    public class InfoService
    {
        private static readonly string instanceGuid = "";

        public ApplicationEnvironmentInfo? info;

        static InfoService()
        {
            instanceGuid = Guid.NewGuid().ToString();
        }

        public ApplicationEnvironmentInfo ApplicationEnvironmentInfo
        {
            get
            {
                if (info == null)
                {
                    this.info = GetInfo();
                }
                return info;
            }
        }

        private ApplicationEnvironmentInfo GetInfo()
        {
            var envs = Environment.GetEnvironmentVariables();
            Dictionary<string, string> environmentVariables = new Dictionary<string, string>();

            foreach (DictionaryEntry de in envs)
            {
                if (de.Key != null && de.Value != null)
                {
                    var key = de.Key.ToString();
                    var value = de.Value.ToString();
                    if (key != null && value != null)
                    {
                        environmentVariables.Add(key, value);
                    }
                }
            }
            environmentVariables = environmentVariables.OrderBy(kvp => kvp.Key).ToDictionary(pair => pair.Key, pair => pair.Value);

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
                InstanceId = instanceGuid
            };
        }

        private static IEnumerable<string> GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            return host.AddressList.Select(i => i.ToString());
        }

    }
}