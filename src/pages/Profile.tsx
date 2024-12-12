import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Wallet2, Users, Trophy, Coins, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Profile {
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

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      setProfile(data);
      setEditedBio(data?.bio || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="relative inline-block">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src={profile?.avatar_url ? `${supabase.storage.from("avatars").getPublicUrl(profile.avatar_url).data.publicUrl}` : undefined}
                alt="Profile"
              />
              <AvatarFallback>{profile?.username?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>
            <label
              className="absolute bottom-0 right-0 bg-dtoad-primary hover:bg-dtoad-primary/90 text-white p-2 rounded-full cursor-pointer"
              htmlFor="avatar-upload"
            >
              <Upload className="w-4 h-4" />
            </label>
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={isUploading}
            />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-dtoad-text">
            {profile?.username || "Anonymous"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tokens Held</CardTitle>
              <Coins className="h-4 w-4 text-dtoad-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.tokens_held || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              <Trophy className="h-4 w-4 text-dtoad-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.tasks_completed || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referrals</CardTitle>
              <Users className="h-4 w-4 text-dtoad-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.referrals_count || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rank</CardTitle>
              <Trophy className="h-4 w-4 text-dtoad-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#{profile?.leaderboard_rank || "N/A"}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bio</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      placeholder="Write something about yourself..."
                    />
                    <div className="flex space-x-2">
                      <Button onClick={updateBio}>Save</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p>{profile?.bio || "No bio yet"}</p>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Edit Bio
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">No recent activity</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Connection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {profile?.wallet_address ? (
                  <div className="flex items-center space-x-2">
                    <Wallet2 className="h-4 w-4 text-dtoad-primary" />
                    <span className="font-mono">
                      {`${profile.wallet_address.slice(0, 6)}...${profile.wallet_address.slice(-4)}`}
                    </span>
                  </div>
                ) : (
                  <Button onClick={connectWallet}>
                    <Wallet2 className="mr-2 h-4 w-4" /> Connect Wallet
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Referral Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {profile?.referral_code ? (
                  <div className="flex items-center space-x-2">
                    <code className="bg-dtoad-background/50 px-2 py-1 rounded">
                      {profile.referral_code}
                    </code>
                  </div>
                ) : (
                  <Button onClick={generateReferralCode}>
                    Generate Referral Code
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}