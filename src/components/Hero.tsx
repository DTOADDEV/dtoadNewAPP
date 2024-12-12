import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background with Glass Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-dtoad-secondary/20 via-dtoad-background/50 to-dtoad-background animate-gradient-y backdrop-blur-sm" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dtoad-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-dtoad-primary/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-dtoad-accent/10 rounded-full filter blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-dtoad-text tracking-tight mb-6 font-sans">
          From{" "}
          <span className="bg-gradient-to-r from-dtoad-primary to-dtoad-accent bg-clip-text text-transparent">
            Memes
          </span>{" "}
          to{" "}
          <span className="bg-gradient-to-r from-dtoad-accent to-dtoad-primary bg-clip-text text-transparent">
            Dreams
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-dtoad-text-secondary mb-8 leading-relaxed font-light">
          Join the DToad Revolution! Earn Crypto, Build Community, Have Fun
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-dtoad-primary hover:bg-dtoad-primary/90 text-lg px-8 backdrop-blur-sm shadow-lg hover:shadow-dtoad-primary/20 transition-all duration-300"
          >
            Create Task
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-dtoad-primary text-dtoad-primary hover:bg-dtoad-primary/10 text-lg px-8 backdrop-blur-sm shadow-lg hover:shadow-dtoad-primary/20 transition-all duration-300"
          >
            Explore Tasks
          </Button>
        </div>
      </div>

      {/* Glass Panel Effect */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dtoad-background to-transparent" />
    </div>
  );
};