import { createContext } from "react";

export interface UserInfo {
  displayName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  photoURL: string | undefined;
  providerId: string;
  uid: string;
}

export const AuthContext = createContext<UserInfo | null>(null);
