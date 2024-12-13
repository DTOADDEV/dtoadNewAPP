import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { UserHeader } from "@/components/profile/UserHeader";
import { MetricsCards } from "@/components/profile/MetricsCards";
import { FavoriteProjects } from "@/components/profile/FavoriteProjects";
import { SettingsContent } from "@/components/profile/SettingsContent";

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

const demoProjects = [
  {
    title: "DeFi Integration",
    description: "Smart contract integration for decentralized finance",
  },
  {
    title: "NFT Marketplace",
    description: "Digital marketplace for NFT trading",
  },
];

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    getProfile();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
  }

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

      // First try to get the existing profile
      let { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      // If no profile exists and there's a PGRST116 error (no rows returned)
      if (error?.code === 'PGRST116') {
        console.log("No profile found, creating new profile...");
        profile = await createProfile(session.user.id, session.user.email || '');
      } else if (error) {
        throw error;
      }

      setProfile(profile);
      setEditedBio(profile?.bio || "");
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

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setIsUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const fileExt = file.name.split(".").pop();
      const filePath = `${session.user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: filePath })
        .eq("id", session.user.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });

      getProfile();
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }

  const handleInviteFriends = () => {
    // Implement invite friends functionality
    toast({
      title: "Coming Soon",
      description: "Invite friends feature will be available soon!",
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!profile) {
    return <div className="flex items-center justify-center min-h-screen">Profile not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-dtoad-secondary/50 border-none">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-dtoad-primary data-[state=active]:text-white"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-dtoad-primary data-[state=active]:text-white"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 animate-fade-in-up">
            <UserHeader
              username={profile.username}
              walletAddress={profile.wallet_address}
              avatarUrl={profile.avatar_url}
              isUploading={isUploading}
              onAvatarChange={uploadAvatar}
              onInviteFriends={handleInviteFriends}
            />

            <MetricsCards
              tokensHeld={profile.tokens_held}
              tasksCompleted={profile.tasks_completed}
              referralsCount={profile.referrals_count}
              leaderboardRank={profile.leaderboard_rank}
            />

            <FavoriteProjects projects={demoProjects} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsContent
              walletAddress={profile.wallet_address}
              onConnectWallet={() => {}}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
