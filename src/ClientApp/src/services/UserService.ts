import User from "../models/IUser";

export default class UserService {
  public static async fetchUsers(): Promise<User[]> {
    const response = await fetch("/api/users?skip=0&take=200");
    return response.json() as Promise<User[]>;
  }

  public static async fetchDbStatus(): Promise<number> {
    const response = await fetch("/api/dbreadyz");
    return response.status;
  }
}
