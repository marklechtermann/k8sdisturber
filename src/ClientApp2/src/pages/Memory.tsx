import React, { useState, useEffect } from "react";
import ApiResult from "../components/ApiResult";

export default function Memory() {
  const [memorysize, setMemorysize] = useState({ allocatedMegaBytes: 0 });
  const [newMemorySize, setNewMemorySize] = useState(0);
  useEffect(() => {
    fetchMemory();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMemory();
  };

  const fetchMemory = async () => {
    try {
      const response = await fetch("/api/memory");
      const data = await response.json();
      setMemorysize(data);
    } catch {
      console.log("Failed to fetch data from /api/memory");
    }
  };

  const setMemory = async () => {
    const response = await fetch("/api/memory", {
      method: "PUT",
      body: JSON.stringify({ allocatedMegaBytes: newMemorySize }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMemorysize(data);
  };

  return (
    <div>
      <h1>Memory Allocation</h1>
      <form onSubmit={handleSubmit}>
        <div>Here you can allocate memory. Up to 2 Gbyte can be allocated.</div>
        <label>Memory (MByte)</label>
        <div>
          <input
            autoComplete="nope"
            id="memory"
            name="memory"
            type="text"
            value={newMemorySize}
            onChange={(e) => setNewMemorySize(e.target.value)}
          />
        </div>
        <div>
          {" "}
          <button type="submit" color="primary">
            Do it!
          </button>
        </div>
      </form>
      <h1>Api</h1>
      <div>
        <ApiResult
          link="/api/memory"
          result={JSON.stringify(memorysize)}
        ></ApiResult>
      </div>
    </div>
  );
}
