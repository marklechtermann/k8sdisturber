import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";

export default function Home() {
  const [info, setInfo] = useState({ ipAdresses: [] });
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
      <h4>Info</h4>
      <div>{info.hostname}</div>
      <div>
        {info.ipAdresses.map((ip) => (
          <div key={ip}>{ip}</div>
        ))}
      </div>
      <div>{info.osVersion}</div>
      <div>{info.processorCount}</div>
      <div>{info.processId}</div>

      <h4>Variables</h4>
      <h4>Payment</h4>

      <Table dark borderless>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
