import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import UserService from "../services/UserService";

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

const Environment: React.FC = () => {
  const [info, setInfo] = useState<ApplicationEnvironmentInfo>({});

  useEffect(() => {
    fetchInfo();
    UserService.fetchUsers();
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
        <Title>Environment Variables</Title>
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

export default Environment;
