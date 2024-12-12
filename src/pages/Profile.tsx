import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { MetricsCards } from "@/components/profile/MetricsCards";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { SettingsContent } from "@/components/profile/SettingsContent";

interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  bio: string;
  wallet_address: string;
  referral_code: string;
  tokens_held: number;
  tasks_completed: number;
  referrals_count: number;
  leaderboard_rank: number;
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    getProfile();
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
  }

  async function getProfile() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      // First try to get the existing profile
      let { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      // If no profile exists, create one
      if (!profile) {
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert([
            { 
              id: session.user.id,
              username: session.user.email?.split('@')[0] || 'Anonymous',
              tokens_held: 0,
              tasks_completed: 0,
              referrals_count: 0
            }
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        profile = newProfile;
      }

      if (error && error.code !== 'PGRST116') throw error;
      
      setProfile(profile);
      setEditedBio(profile?.bio || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
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

  async function updateBio() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { error } = await supabase
        .from("profiles")
        .update({ bio: editedBio })
        .eq("id", session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Bio updated successfully",
      });

      setIsEditing(false);
      getProfile();
    } catch (error) {
      console.error("Error updating bio:", error);
      toast({
        title: "Error",
        description: "Failed to update bio",
        variant: "destructive",
      });
    }
  }

  async function generateReferralCode() {
    try {
      const { data, error } = await supabase
        .rpc('generate_referral_code');

      if (error) throw error;

      toast({
        title: "Success",
        description: "Referral code generated successfully",
      });

      getProfile();
    } catch (error) {
      console.error("Error generating referral code:", error);
      toast({
        title: "Error",
        description: "Failed to generate referral code",
        variant: "destructive",
      });
    }
  }

  async function connectWallet() {
    try {
      if (typeof window.ethereum === "undefined") {
        toast({
          title: "Error",
          description: "Please install MetaMask to connect your wallet",
          variant: "destructive",
        });
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts[0]) {
        const { error } = await supabase
          .from("profiles")
          .update({ wallet_address: accounts[0] })
          .eq("id", profile?.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Wallet connected successfully",
        });

        getProfile();
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Error",
        description: "Failed to connect wallet",
        variant: "destructive",
      });
    }
  }

  if (!profile) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-white to-dtoad-primary/5">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <ProfileHeader
            username={profile.username}
            avatarUrl={profile.avatar_url}
            isUploading={isUploading}
            onAvatarChange={uploadAvatar}
          />
          <div className="pt-20 pb-6 px-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              {profile.username || "Anonymous"}
            </h2>
          </div>
        </div>

        <MetricsCards
          tokensHeld={profile.tokens_held}
          tasksCompleted={profile.tasks_completed}
          referralsCount={profile.referrals_count}
          leaderboardRank={profile.leaderboard_rank}
        />

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="w-full grid grid-cols-2 gap-4 bg-transparent">
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

          <TabsContent value="profile" className="space-y-4 animate-fade-in-up">
            <ProfileContent
              bio={profile.bio}
              isEditing={isEditing}
              editedBio={editedBio}
              onBioChange={setEditedBio}
              onSaveBio={updateBio}
              onEditToggle={() => setIsEditing(!isEditing)}
            />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsContent
              walletAddress={profile.wallet_address}
              referralCode={profile.referral_code}
              onConnectWallet={connectWallet}
              onGenerateReferralCode={generateReferralCode}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
