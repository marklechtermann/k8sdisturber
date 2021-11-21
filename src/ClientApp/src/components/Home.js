import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";

export default function Home() {
  const [info, setInfo] = useState({
    ipAdresses: [],
    environmentVariables: [],
  });
  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const response = await fetch("/api/info");
    const data = await response.json();
    setInfo(data);
  };

  return (
    <>
      <h1>Info</h1>
      <Table dark borderless>
        <tbody>
          <tr>
            <td>Application Version</td>
            <td>{info.version}</td>
          </tr>
          <tr>
            <td>Hostname</td>
            <td>{info.hostname}</td>
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
              {info.ipAdresses.map((ip) => (
                <div key={ip}>{ip}</div>
              ))}
            </td>
          </tr>
        </tbody>
      </Table>

      <h1>Variables</h1>
      <Table dark borderless>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(info.environmentVariables).map((a) => (
            <tr key={a[0]}>
              <td>{a[0]}</td>
              <td>{a[1]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
