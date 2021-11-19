import React, { useState, useEffect } from "react";

export default function Home() {
  const [info, setInfo] = useState({ a: 1 });
  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const response = await fetch("/api/info");
    const data = await response.json();
    setInfo(data);
  };

  const idAdresses = info.ipAdresses.map((ip) => <div key={ip}>{ip}</div>);

  return (
    <>
      <div>{info.hostname}</div>
      <div>{idAdresses}</div>
      <div>{info.osVersion}</div>
      <div>{info.processorCount}</div>
      <div>{info.processId}</div>
    </>
  );
}
