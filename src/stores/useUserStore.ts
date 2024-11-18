import { User } from "@models/user.type";
import { UserCustomer } from "@models/userCustomer.type";
import { UserStore } from "@models/userStore.type";
import { create } from "zustand";

type UserState = {
  user: User | undefined;
  userStore: UserStore | undefined;
  userCustomer: UserCustomer | undefined;
  profileImage: string | undefined;
  initializeUser: (user: User) => void;
  removeUsers: () => void;
  setProfileImage: (url: string) => void;
  updateUser: (user: any) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  userStore: undefined,
  // userCustomer: undefined,
  userCustomer: {
    id: "cleum9yc50002v8f8gnwv5rz0",
    pointsCurrent: 200,
    pointsTotal: 200,
    userId: "cleum9yc50002v8f8gnwv5rz9",
  },
  profileImage: undefined,
  initializeUser: (user: User) =>
    set({
      user: user,
      userStore: user.UserStore || undefined,
      userCustomer: user.UserCustomer || undefined,
    }),
  removeUsers: () =>
    set({
      user: undefined,
      userStore: undefined,
      userCustomer: undefined,
      profileImage: undefined,
    }),
  setProfileImage: (url: string) => set({ profileImage: url }),
  updateUser: (user: any) => set({ user: user }),
}));
