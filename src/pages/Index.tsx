import { Hero } from "@/components/Hero";
import { Roadmap } from "@/components/Roadmap";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans antialiased">
      <Hero />
      <Roadmap />
    </div>
  );
};

export default Index;