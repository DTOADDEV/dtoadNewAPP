import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with softer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#B4BD8D] via-[#B4BD8D]/90 to-[#B4BD8D]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dtoad-primary/15 via-transparent to-transparent" />
      </div>
      
      {/* Softer glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dtoad-primary/8 rounded-full filter blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dtoad-accent/8 rounded-full filter blur-[128px]" />
      
      {/* Content with adjusted colors for better contrast */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-[#1A1F2C] drop-shadow-sm">
          From{" "}
          <span className="bg-gradient-to-r from-dtoad-primary/95 to-dtoad-accent/95 bg-clip-text text-transparent">
            Memes
          </span>{" "}
          to{" "}
          <span className="bg-gradient-to-r from-dtoad-accent/95 to-dtoad-primary/95 bg-clip-text text-transparent">
            Dreams
          </span>
        </h1>
        <h2 className="text-3xl sm:text-4xl font-medium text-[#222222]/90 mb-16 tracking-wide">
          Join the DToad Revolution!
        </h2>
        <p className="text-xl sm:text-2xl text-[#333333]/90 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
          Earn Crypto, Build Community, Have Fun
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="bg-dtoad-primary/95 hover:bg-dtoad-primary text-white text-lg px-12 py-6 h-auto backdrop-blur-sm shadow-lg hover:shadow-dtoad-primary/30 transition-all duration-300 rounded-xl"
          >
            Create Task
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-dtoad-primary/30 text-[#222222] hover:bg-dtoad-primary/10 text-lg px-12 py-6 h-auto backdrop-blur-sm shadow-lg hover:shadow-dtoad-primary/30 transition-all duration-300 rounded-xl bg-white/40"
          >
            Explore Tasks
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#B4BD8D] to-transparent" />
    </div>
  );
};