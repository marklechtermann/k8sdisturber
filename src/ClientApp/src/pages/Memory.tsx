import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import ApiResult from "../components/ApiResult";
import Title from "../components/Title";

type Props = {};

const Memory: React.FC<Props> = () => {
  const [memorysize, setMemorysize] = useState({ allocatedMegaBytes: 0 });
  const [newMemorySize, setNewMemorySize] = useState(0);
  useEffect(() => {
    fetchMemory();
  }, []);

  const handleSubmit = (event: any) => {
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
      <Title>Memory Allocation</Title>
      <form onSubmit={handleSubmit}>
        <div>Here you can allocate memory. Up to 2 Gbyte can be allocated.</div>

        <Box component="div" sx={{ m: 4 }}>
          <TextField
            id="outlined-required"
            label="Memory (MByte)"
            value={newMemorySize}
            onChange={(e) => setNewMemorySize(parseInt(e.target.value))}
          />
        </Box>

        <Box component="div" sx={{ m: 4 }}>
          <Button variant="contained" type="submit">
            Allocate
          </Button>
        </Box>
      </form>
      <Title>Api</Title>
      <div>
        <ApiResult
          link="/api/memory"
          result={JSON.stringify(memorysize)}
        ></ApiResult>
      </div>
    </div>
  );
};

export default Memory;
