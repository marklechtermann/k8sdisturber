import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";

type Props = {};

enum Gender {
  Male = 0,
  Female = 1,
  Others = 2,
}

interface User {
  id: number;
  gender: Gender;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
}

const Database: React.FC<Props> = ({}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [dbstatus, setDbstatus] = useState<number>(0);
  useEffect(() => {
    fetchUsers();
    fetchdbstatus();
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchUsers();
  }, [dbstatus]);

  useEffect(() => {
    fetchdbstatus();
    const interval = setInterval(() => {
      fetchdbstatus();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users?skip=0&take=200");
      const data = (await response.json()) as User[];
      setUsers(data);
    } catch {
      console.log("Failed to fetch data from /api/user");
    }
  };

  const fetchdbstatus = async () => {
    try {
      const response = await fetch("/api/dbreadyz");
      setDbstatus(response.status);
    } catch {
      console.log("Failed to fetch data from /api/dbreadyz");
    }
  };

  return (
    <>
      <Box paddingBottom="1rem">
        <Title>Database</Title>
        <div>Status: {dbstatus}</div>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>FirstName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell scope="row">{u.id}</TableCell>
                <TableCell>{u.userName}</TableCell>
                <TableCell>{u.firstName}</TableCell>
                <TableCell>{u.lastName}</TableCell>
                <TableCell>{u.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Database;
