import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dtoad-background via-dtoad-background/90 to-dtoad-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dtoad-primary/5 via-transparent to-transparent" />
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dtoad-primary/10 rounded-full filter blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dtoad-accent/5 rounded-full filter blur-[128px]" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-dtoad-text via-dtoad-text/90 to-dtoad-text/80 drop-shadow-lg">
          From{" "}
          <span className="bg-gradient-to-r from-dtoad-primary to-dtoad-accent bg-clip-text text-transparent">
            Memes
          </span>{" "}
          to{" "}
          <span className="bg-gradient-to-r from-dtoad-accent to-dtoad-primary bg-clip-text text-transparent">
            Dreams
          </span>
        </h1>
        <h2 className="text-3xl sm:text-4xl font-medium text-dtoad-text/90 mb-16 tracking-wide">
          Join the DToad Revolution!
        </h2>
        <p className="text-xl sm:text-2xl text-dtoad-text-secondary mb-12 leading-relaxed font-light max-w-3xl mx-auto">
          Earn Crypto, Build Community, Have Fun
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="bg-dtoad-primary hover:bg-dtoad-primary/90 text-lg px-12 py-6 h-auto backdrop-blur-sm shadow-lg hover:shadow-dtoad-primary/20 transition-all duration-300 rounded-xl"
          >
            Create Task
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-dtoad-primary/20 text-dtoad-primary hover:bg-dtoad-primary/10 text-lg px-12 py-6 h-auto backdrop-blur-sm shadow-lg hover:shadow-dtoad-primary/20 transition-all duration-300 rounded-xl bg-dtoad-background/10"
          >
            Explore Tasks
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-dtoad-background to-transparent" />
    </div>
  );
};