import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { useProfile } from "@/hooks/useProfile";
import { Loader } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, isLoading, getProfile } = useProfile();
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
          <p className="text-lg text-dtoad-text-secondary">Profile not found</p>
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
                <Button variant="outline" size="icon" className="bg-dtoad-background-dark/50 border-dtoad-primary/20 hover:bg-dtoad-background-dark/70">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-dtoad-text">Profile</h1>
            </div>
          </div>

          <ProfileTabs 
            profile={profile}
            onConnectWallet={() => {}}
          />
        </div>
      </MainLayout>
    </ProfileProvider>
  );
}