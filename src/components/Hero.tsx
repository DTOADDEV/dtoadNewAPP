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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00ff00]/5 via-transparent to-transparent" />
      </div>
      
      {/* Animated Robotic Toads */}
      <div className="absolute top-[10%] left-[5%] w-20 h-20 animate-patrol">
        <div className="w-full h-full bg-[#00ff00]/20 rounded-full backdrop-blur-sm border border-[#00ff00]/30 shadow-[0_0_15px_#00ff00]" />
      </div>
      <div className="absolute bottom-[10%] right-[5%] w-20 h-20 animate-patrol-reverse">
        <div className="w-full h-full bg-[#00ff00]/20 rounded-full backdrop-blur-sm border border-[#00ff00]/30 shadow-[0_0_15px_#00ff00]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up max-w-5xl mx-auto">
        <div className="w-32 h-32 mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full bg-[#00ff00]/20 animate-glow" />
          <div className="absolute inset-2 rounded-full bg-[#00ff00]/30 animate-glow-delay" />
          <div className="absolute inset-4 rounded-full bg-[#00ff00]/40 animate-pulse" />
        </div>
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
          From{" "}
          <span className="text-[#00ff00] drop-shadow-[0_0_10px_#00ff00]">
            Memes
          </span>{" "}
          to{" "}
          <span className="text-[#00ff00] drop-shadow-[0_0_10px_#00ff00]">
            Dreams
          </span>
        </h1>
        <h2 className="text-3xl sm:text-4xl font-medium text-white/80 mb-16 tracking-wide">
          Hop into the Future of Meme Coins
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            onClick={handleCreateTask}
            className="bg-[#00ff00] hover:bg-[#00ff00]/90 text-[#0d0d0d] text-lg px-12 py-6 h-auto shadow-[0_0_10px_#00ff00] hover:shadow-[0_0_20px_#00ff00] transition-all duration-300 rounded-xl transform hover:scale-110"
          >
            Join the Toad Army
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleExploreTasks}
            className="border-2 border-[#00ff00]/30 text-[#00ff00] hover:bg-[#00ff00]/10 text-lg px-12 py-6 h-auto shadow-lg hover:shadow-[0_0_20px_#00ff00] transition-all duration-300 rounded-xl"
          >
            Explore Tasks
          </Button>
        </div>
      </div>
    </div>
  );
};