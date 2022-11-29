import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead
} from "@mui/material";
import User from "../models/IUser";

interface IProps {
    users?: User[]
}

const UserTable: React.FC<IProps> = ({ users }) => {
    return <TableContainer component={Paper}>
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
                {users && users.map((u) => (
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
    </TableContainer>;
}

export default UserTable;