import React, { useEffect, useState } from "react";

export default function Database({ history }) {
  const [users, setUsers] = useState([]);
  const [dbstatus, setDbstatus] = useState("");
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
      const data = await response.json();
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
}
