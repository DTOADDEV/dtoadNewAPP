import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export const Hero = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Auth state changed in Hero:", session ? "logged in" : "logged out");
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCreateTask = () => {
    if (session) {
      navigate("/create-task");
    } else {
      navigate("/login");
    }
  };

  const handleExploreTasks = () => {
    navigate("/tasks");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0d0d] to-[#121212]">
      {/* Animated background with grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff00]/10 rounded-full filter blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff00]/5 rounded-full filter blur-[128px] animate-pulse" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up max-w-5xl mx-auto">
        {/* Logo placeholder - you can replace this with your actual logo */}
        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-[#00ff00]/20 to-[#00ff00]/40 rounded-full animate-glow" />
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white">
          From{" "}
          <span className="bg-gradient-to-r from-[#00ff00] to-[#00ff00]/80 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">
            Memes
          </span>{" "}
          to{" "}
          <span className="bg-gradient-to-r from-[#00ff00]/80 to-[#00ff00] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">
            Dreams
          </span>
        </h1>
        
        <h2 className="text-3xl sm:text-4xl font-medium text-[#ffffff]/90 mb-16 tracking-wide">
          Hop into the Future - The Meme Coin Revolution!
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            onClick={handleCreateTask}
            className="bg-[#00ff00] hover:bg-[#00ff00]/90 text-black text-lg px-12 py-6 h-auto shadow-[0_0_20px_rgba(0,255,0,0.5)] hover:shadow-[0_0_30px_rgba(0,255,0,0.7)] transition-all duration-300 rounded-xl group"
          >
            Join the Toad Army
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={handleExploreTasks}
            className="border-2 border-[#00ff00]/30 text-[#00ff00] hover:bg-[#00ff00]/10 text-lg px-12 py-6 h-auto backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,0,0.2)] hover:shadow-[0_0_30px_rgba(0,255,0,0.4)] transition-all duration-300 rounded-xl"
          >
            Explore Tasks
          </Button>
        </div>
      </div>

      {/* Animated robotic toad inspectors */}
      <div className="absolute bottom-0 left-0 w-24 h-24 animate-patrol-left">
        <div className="w-full h-full bg-[#00ff00]/20 rounded-full animate-pulse" />
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 animate-patrol-right">
        <div className="w-full h-full bg-[#00ff00]/20 rounded-full animate-pulse" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
    </div>
  );
};