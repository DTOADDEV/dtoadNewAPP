import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { MetricsCards } from "@/components/profile/MetricsCards";
import { FavoriteProjects } from "@/components/profile/FavoriteProjects";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SettingsContent } from "@/components/profile/SettingsContent";
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

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader className="w-8 h-8 animate-spin text-dtoad-primary" />
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <p className="text-lg text-gray-400">Profile not found</p>
          <Link to="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <ProfileProvider value={{ profile, getProfile }}>
      <MainLayout>
        <div className="container max-w-4xl mx-auto space-y-8 pt-20 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Profile</h1>
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full bg-[#0A1614] rounded-full p-1">
              <TabsTrigger value="profile" className="flex-1 text-white data-[state=active]:bg-transparent">
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1 text-white data-[state=active]:bg-transparent">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6 space-y-6 animate-fade-in-up">
              <div className="bg-[#1A2825] rounded-lg p-6">
                <ProfileHeader
                  profile={profile}
                  onAvatarChange={uploadAvatar}
                  isUploading={isUploading}
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
      </MainLayout>
    </ProfileProvider>
  );
}