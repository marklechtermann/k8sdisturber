import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import Title from "../components/Title";

interface ApplicationEnvironmentInfo {
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
}

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
      <Box component="div" sx={{ m: 4 }}>
        <Title>Home</Title>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="customized table">
            <TableBody>
              <TableRow>
                <TableCell>Application Version</TableCell>
                <TableCell>{info.version}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Instance ID</TableCell>
                <TableCell>{info.instanceId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hostname</TableCell>
                <TableCell>{info.hostname}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>{info.userName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>{info.userId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>OS version</TableCell>
                <TableCell>{info.osVersion}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Processor count</TableCell>
                <TableCell>{info.processorCount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Process ID</TableCell>
                <TableCell>{info.processId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>IP adresses</TableCell>
                <TableCell>
                  {info &&
                    info.ipAdresses &&
                    info.ipAdresses.map((ip) => <div key={ip}>{ip}</div>)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box component="div" sx={{ m: 4 }}>
        <Title>Variables</Title>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="customized table">
            <TableBody>
              {info &&
                info.environmentVariables &&
                info.environmentVariables.map((item) => (
                  <TableRow
                    key={item.key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{item.key}</TableCell>
                    <TableCell>{item.value}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Home;
