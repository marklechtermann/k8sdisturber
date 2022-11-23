import { Gender } from "./Gender";

export default interface User {
  id: number;
  gender: Gender;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
}
