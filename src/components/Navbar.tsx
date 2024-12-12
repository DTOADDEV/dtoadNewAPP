import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { NavLink } from "./navigation/NavLink";
import { MobileNavLink } from "./navigation/MobileNavLink";
import { Logo } from "./navigation/Logo";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Auth state changed:", session ? "logged in" : "logged out");
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleAuthClick = () => {
    setIsSignUp(!isSignUp);
    navigate("/login");
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
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="text-dtoad-text hover:text-dtoad-primary font-semibold"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={handleAuthClick}
                  className="bg-dtoad-primary hover:bg-dtoad-primary/90 font-semibold flex items-center gap-2"
                >
                  {isSignUp ? (
                    <>
                      Sign Up
                      <ToggleRight className="h-5 w-5 ml-1" />
                    </>
                  ) : (
                    <>
                      Login
                      <ToggleLeft className="h-5 w-5 ml-1" />
                    </>
                  )}
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
              <MobileNavLink href="/create-task" onClick={() => handleMobileMenuClick("/create-task")}>
                Create Task
              </MobileNavLink>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-dtoad-primary/20">
            <div className="px-2 space-y-1">
              {session ? (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full text-center justify-center font-semibold"
                >
                  Logout
                </Button>
              ) : (
                <Button 
                  onClick={handleAuthClick}
                  className="w-full bg-dtoad-primary hover:bg-dtoad-primary/90 text-center justify-center font-semibold flex items-center gap-2"
                >
                  {isSignUp ? (
                    <>
                      Sign Up
                      <ToggleRight className="h-5 w-5 ml-1" />
                    </>
                  ) : (
                    <>
                      Login
                      <ToggleLeft className="h-5 w-5 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};