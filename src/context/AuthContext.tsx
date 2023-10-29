import { createContext } from "react";

export interface UserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

export const AuthContext = createContext<UserInfo | null>(null);
