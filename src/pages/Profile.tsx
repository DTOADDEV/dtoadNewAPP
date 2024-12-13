import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { UserHeader } from "@/components/profile/UserHeader";
import { MetricsCards } from "@/components/profile/MetricsCards";
import { FavoriteProjects } from "@/components/profile/FavoriteProjects";
import { SettingsContent } from "@/components/profile/SettingsContent";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { useProfileBio } from "@/hooks/useProfileBio";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { useProfile } from "@/hooks/useProfile";
import { Loader } from "lucide-react";

const demoProjects = [
  {
    title: "DeFi Integration",
    description: "Smart contract integration for decentralized finance"
  },
  {
    title: "NFT Marketplace",
    description: "Digital marketplace for NFT trading"
  }
];

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, isLoading, getProfile } = useProfile();
  const [isUploading, setIsUploading] = useState(false);
  const [session, setSession] = useState(null);
  const { editedBio, isEditing, handleBioChange, handleSaveBio, toggleEdit } = useProfileBio(profile?.bio || "");

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setSession(session);
        getProfile();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setSession(session);
      await getProfile();
    } catch (error) {
      console.error("Error checking user session:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
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
    toast({
      title: "Coming Soon",
      description: "Invite friends feature will be available soon!",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-dtoad-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-lg text-gray-600">Profile not found</p>
        <button 
          onClick={() => navigate("/")}
          className="text-dtoad-primary hover:underline"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <ProfileProvider value={{ profile, getProfile }}>
      <div className="container mx-auto px-4 pt-20 pb-8 min-h-screen bg-[#1E2E2A]">
        <div className="max-w-6xl mx-auto space-y-6">
          <p className="text-gray-400 mb-4">This is a demo of the profile functionality. Try exploring the different sections!</p>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <div className="sticky top-20 z-40">
              <div className="bg-[#0A1614] rounded-full p-1 max-w-md mx-auto">
                <TabsList className="w-full bg-transparent border-none">
                  <TabsTrigger
                    value="profile"
                    className="flex-1 text-white data-[state=active]:bg-transparent"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="flex-1 text-white data-[state=active]:bg-transparent"
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="profile" className="space-y-6 animate-fade-in-up">
              <div className="bg-[#1A2825] rounded-lg p-6">
                <UserHeader
                  username={profile.username}
                  walletAddress={profile.wallet_address}
                  avatarUrl={profile.avatar_url}
                  isUploading={isUploading}
                  onAvatarChange={uploadAvatar}
                  onInviteFriends={handleInviteFriends}
                />
              </div>

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
    </ProfileProvider>
  );
}
