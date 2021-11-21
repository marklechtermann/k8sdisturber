using System.Net;
using k8sdisturber.Models;
using System.Collections;
using System.Linq;

namespace k8sdisturber.Services
{
    public class InfoService
    {
        public Info GetInfo()
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

            return new Info()
            {
                Hostname = Dns.GetHostName(),
                IpAdresses = GetLocalIPAddress(),
                OsVersion = Environment.OSVersion.VersionString,
                ProcessorCount = Environment.ProcessorCount,
                ProcessId = Environment.ProcessId,
                EnvironmentVariables = environmentVariables,
                Version = Environment.GetEnvironmentVariable("K8SVERSION")
            };
        }

        public static IEnumerable<string> GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            return host.AddressList.Select(i => i.ToString());
        }

    }
}