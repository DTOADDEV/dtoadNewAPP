import { createContext, useContext } from "react";

interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  bio: string;
  wallet_address: string;
  tokens_held: number;
  tasks_completed: number;
  referrals_count: number;
  leaderboard_rank: number;
}

interface ProfileContextType {
  profile: Profile | null;
  getProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children, value }: { children: React.ReactNode; value: ProfileContextType }) {
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
}