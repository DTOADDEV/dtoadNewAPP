import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, Plus, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { NavLink } from "./navigation/NavLink";
import { MobileNavLink } from "./navigation/MobileNavLink";
import { Logo } from "./navigation/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      console.log("Auth state changed:", session ? "logged in" : "logged out");
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      let { data: profile, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', userId)
        .single();

      // If no profile exists and there's a PGRST116 error (no rows returned)
      if (error?.code === 'PGRST116') {
        console.log("No profile found in Navbar, creating new profile...");
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert([
            {
              id: userId,
              username: session?.user?.email?.split('@')[0],
              tokens_held: 0,
              tasks_completed: 0,
              referrals_count: 0
            }
          ])
          .select()
          .single();

        if (createError) throw createError;
        profile = newProfile;
      } else if (error) {
        throw error;
      }

      if (profile?.avatar_url) {
        setAvatarUrl(profile.avatar_url);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogoClick = () => {
    if (session) {
      navigate("/tasks");
    } else {
      navigate("/");
    }
  };

  const handleMobileMenuClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-dtoad-background/80 backdrop-blur-lg border-b border-dtoad-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo onClick={handleLogoClick} />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/tasks">Tasks</NavLink>
                <NavLink href="/news">News</NavLink>
                <NavLink href="/pricing">Pricing</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {session ? (
                <>
                  <Button 
                    onClick={() => navigate("/create-task")}
                    variant="outline" 
                    className="mr-3 font-semibold flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Task
                  </Button>
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center justify-center h-8 w-8 rounded-full hover:ring-2 hover:ring-dtoad-primary transition-all"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={avatarUrl ? `${supabase.storage.from("avatars").getPublicUrl(avatarUrl).data.publicUrl}` : undefined}
                        alt="Profile" 
                      />
                      <AvatarFallback>
                        <User className="h-4 w-4 text-dtoad-text" />
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </>
              ) : (
                <Button 
                  onClick={() => navigate("/login")}
                  className="bg-dtoad-primary hover:bg-dtoad-primary/90 font-semibold"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-dtoad-text hover:text-dtoad-primary focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/dashboard" onClick={() => handleMobileMenuClick("/dashboard")}>
              Dashboard
            </MobileNavLink>
            <MobileNavLink href="/tasks" onClick={() => handleMobileMenuClick("/tasks")}>
              Tasks
            </MobileNavLink>
            <MobileNavLink href="/news" onClick={() => handleMobileMenuClick("/news")}>
              News
            </MobileNavLink>
            <MobileNavLink href="/pricing" onClick={() => handleMobileMenuClick("/pricing")}>
              Pricing
            </MobileNavLink>
            {session && (
              <>
                <MobileNavLink href="/create-task" onClick={() => handleMobileMenuClick("/create-task")}>
                  Create Task
                </MobileNavLink>
                <MobileNavLink href="/profile" onClick={() => handleMobileMenuClick("/profile")}>
                  Profile
                </MobileNavLink>
              </>
            )}
          </div>
          {!session && (
            <div className="pt-4 pb-3 border-t border-dtoad-primary/20">
              <div className="px-2 space-y-1">
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full bg-dtoad-primary hover:bg-dtoad-primary/90 text-center justify-center"
                >
                  Login
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};