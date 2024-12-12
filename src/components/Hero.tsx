import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dtoad-background">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dtoad-secondary/20 to-dtoad-background animate-gradient-y" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-dtoad-text mb-6">
          From{" "}
          <span className="bg-gradient-to-r from-dtoad-primary to-dtoad-accent bg-clip-text text-transparent">
            Memes
          </span>{" "}
          to{" "}
          <span className="bg-gradient-to-r from-dtoad-accent to-dtoad-primary bg-clip-text text-transparent">
            Dreams
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-dtoad-text-secondary mb-8 max-w-2xl mx-auto">
          Join the DToad Revolution! Earn Crypto, Build Community, Have Fun
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-dtoad-primary hover:bg-dtoad-primary/90 text-lg px-8"
          >
            Create Task
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-dtoad-primary text-dtoad-primary hover:bg-dtoad-primary/10 text-lg px-8"
          >
            Explore Tasks
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dtoad-primary/10 to-transparent pointer-events-none" />
    </div>
  );
};