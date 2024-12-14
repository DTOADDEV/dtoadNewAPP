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

  const handleBuyNow = () => {
    if (session) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleJoinCommunity = () => {
    navigate("/tasks");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1A1F2C]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C] via-[#221F26] to-[#1A1F2C] animate-gradient-y">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#8B5CF6]/10 via-transparent to-transparent" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0EA5E9]/20 rounded-full filter blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D946EF]/20 rounded-full filter blur-[128px] animate-pulse" />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/lovable-uploads/0c625919-43a8-49cf-b251-be92ff858828.png"
            alt="DToad Logo"
            className="w-32 h-32 mx-auto animate-bounce-slow"
          />
        </div>

        {/* Main heading with gradient text */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#33C3F0] via-[#8B5CF6] to-[#D946EF] animate-text-gradient">
          From Memes to Dreams
        </h1>

        {/* Subheading with neon glow effect */}
        <h2 className="text-2xl sm:text-3xl font-medium text-[#F97316] mb-12 tracking-wide animate-pulse-slow neon-text">
          Hop into the Future - The Meme Coin Revolution!
        </h2>

        {/* Description with futuristic styling */}
        <p className="text-xl sm:text-2xl text-[#E2E8F0] mb-12 leading-relaxed font-light max-w-3xl mx-auto glass-text">
          Join the most innovative meme coin in the crypto space. Powered by robotic toads and fueled by community dreams.
        </p>

        {/* CTA buttons with neon effects */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            onClick={handleBuyNow}
            className="neon-button bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg px-12 py-6 h-auto rounded-xl transform transition-all duration-300 hover:scale-105"
          >
            Buy $DTOAD Now
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleJoinCommunity}
            className="neon-button-outline border-2 border-[#33C3F0] text-[#33C3F0] hover:bg-[#33C3F0]/10 text-lg px-12 py-6 h-auto rounded-xl transform transition-all duration-300 hover:scale-105"
          >
            Join Toad Army
          </Button>
        </div>

        {/* Floating toad indicators */}
        <div className="absolute top-20 right-20 animate-float-1">
          <div className="w-16 h-16 bg-[#33C3F0]/20 rounded-full backdrop-blur-sm border border-[#33C3F0]/30" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float-2">
          <div className="w-12 h-12 bg-[#D946EF]/20 rounded-full backdrop-blur-sm border border-[#D946EF]/30" />
        </div>
      </div>
    </div>
  );
};