import {
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import User from "../models/IUser";
import UserService from "../services/UserService";
import Title from "../components/Title";
import useUsers from "../hooks/useUsers";
import UserTable from "../components/UserTable";

type Props = {};

const Database: React.FC<Props> = ({ }) => {
  const { status, users } = useUsers();

  return (
    <>
      <Box paddingBottom="1rem">
        <Title>Database</Title>
        <div>Status: {status}</div>
      </Box>
      {<UserTable users={users}></UserTable>}
    </>
  );
};

export default Database;

