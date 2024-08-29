import { UserState } from "../enums/userState";

export interface User {
  userId: string;
  name: string;
  imageUrl: string;
  state: UserState;
}
