import { useEffect } from "react";
import { create } from "zustand";

import { getCurentUser } from "../lib/appwrite";
import { UserDocument } from "..";

interface MyState {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  user: UserDocument | null;
  setUser: (v: any) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  videoPlayed: string | null;
  setVideo: (v: any) => void;
}

export const useStore = create<MyState>()((set, get) => ({
  isLoggedIn: false,
  setIsLoggedIn: (v) => set(() => ({ isLoggedIn: v })),
  user: null,
  setUser: (v) => set(() => ({ user: v })),
  videoPlayed: null,
  setVideo: (v: string) => set(() => ({ videoPlayed: v })),
  isLoading: false,
  setIsLoading: (v) => set(() => ({ isLoading: v })),
}));

export default useStore;

export const UserLoader = () => {
  const { setUser, setIsLoading, setIsLoggedIn, user, isLoading, isLoggedIn } =
    useStore((state) => state);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const userData = await getCurentUser(); // F
        setUser(userData.documents[0]);
        setIsLoggedIn(!!userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return null;
};
