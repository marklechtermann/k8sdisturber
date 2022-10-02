import React, { useEffect, useState } from "react";

type Props = {};

enum Gender {
  Male = 0,
  Female = 1,
  Others = 2,
}

type User = {
  id: number;
  gender: Gender;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
};

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
    <div>
      <h1>Database</h1>
      <div style={dbstatus === 200 ? {} : { color: "yellow" }}>
        Status: {dbstatus}
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <th scope="row">{u.id}</th>
              <td>{u.userName}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Database;
