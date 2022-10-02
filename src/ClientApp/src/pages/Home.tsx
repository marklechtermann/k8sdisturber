import React, { useState, useEffect } from "react";

type ApplicationEnvironmentInfo = {
  hostname?: string;
  version?: string;
  ipAdresses?: string[];
  osVersion?: string;
  processorCount?: number;
  processId?: number;
  environmentVariables?: { key: string; value: string }[];
  userName?: string;
  userId?: number;
  instanceId?: string;
};

const Home: React.FC = () => {
  const [info, setInfo] = useState<ApplicationEnvironmentInfo>({});

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const response = await fetch("/api/info");
    try {
      const data = await response.json();
      setInfo(data);
    } catch {
      console.log("Failed to fetch data from /api/info");
    }
  };

  return (
    <>
      <h1>
        Info
        <button
          color="secondary"
          style={{ marginLeft: "1rem", marginBottom: "1rem" }}
          onClick={() => fetchInfo()}
        >
          Reload
        </button>
        <span></span>
      </h1>
      <table>
        <tbody>
          <tr>
            <td>Application Version</td>
            <td>{info.version}</td>
          </tr>
          <tr>
            <td>Instance ID</td>
            <td>{info.instanceId}</td>
          </tr>
          <tr>
            <td>Hostname</td>
            <td>{info.hostname}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{info.userName}</td>
          </tr>
          <tr>
            <td>User ID</td>
            <td>{info.userId}</td>
          </tr>
          <tr>
            <td>OS version</td>
            <td>{info.osVersion}</td>
          </tr>
          <tr>
            <td>Processor count</td>
            <td>{info.processorCount}</td>
          </tr>
          <tr>
            <td>Process ID</td>
            <td>{info.processId}</td>
          </tr>
          <tr>
            <td>IP adresses</td>
            <td>
              {info &&
                info.ipAdresses &&
                info.ipAdresses.map((ip) => <div key={ip}>{ip}</div>)}
            </td>
          </tr>
        </tbody>
      </table>

      <h1>Variables</h1>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {info &&
            info.environmentVariables &&
            info.environmentVariables.map((item) => (
              <tr key={item.key}>
                <td>{item.key}</td>
                <td>{item.value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
