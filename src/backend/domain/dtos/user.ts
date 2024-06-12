import { UserState } from "../enums/userState";

export interface UserDTO {
  userId: string;
  name: string;
  imageUrl: string;
  state: UserState;
}
