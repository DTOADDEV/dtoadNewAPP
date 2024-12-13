import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  async function createProfile(userId: string, email: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            username: email.split('@')[0],
            tokens_held: 0,
            tasks_completed: 0,
            referrals_count: 0
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
  }

  async function getProfile() {
    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      let { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error?.code === 'PGRST116') {
        console.log("No profile found, creating new profile...");
        profile = await createProfile(session.user.id, session.user.email || '');
      } else if (error) {
        throw error;
      }

      setProfile(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return { profile, isLoading, getProfile };
}