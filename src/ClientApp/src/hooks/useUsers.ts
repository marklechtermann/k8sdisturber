import { useQuery } from "@tanstack/react-query";
import User from "../models/IUser";

import userService from "../services/UserService";

const QUERY_KEY = "USERS";

export default function useUsers(): { status: number; users?: User[] } {
  const { data } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const status = await userService.fetchDbStatus();
      const users = await userService.fetchUsers();
      return { status, users };
    },
  });

  return { status: data ? data.status : 400, users: data?.users };
}
