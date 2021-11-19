using System.Net;
using k8sdisturber.Models;

namespace k8sdisturber.Services;

public class InfoService
{

    public Info GetInfo()
    {
        return new Info()
        {
            Hostname = Dns.GetHostName(),
            IpAdresses = GetLocalIPAddress(),
            OsVersion = Environment.OSVersion.VersionString,
            ProcessorCount = Environment.ProcessorCount,
            ProcessId = Environment.ProcessId
        };
    }

    public static IEnumerable<string> GetLocalIPAddress()
    {
        var host = Dns.GetHostEntry(Dns.GetHostName());
        return host.AddressList.Select(i => i.ToString());
    }

}