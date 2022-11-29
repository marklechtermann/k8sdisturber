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

import useServerInfo from "../hooks/useServerInfo";

const Environment: React.FC = () => {

  const { info } = useServerInfo();

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
