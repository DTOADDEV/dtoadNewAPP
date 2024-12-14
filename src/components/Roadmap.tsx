export const Roadmap = () => {
  const roadmapItems = [
    { phase: "Phase 1", title: "Launch" },
    { phase: "Phase 2", title: "Listings" },
    { phase: "Phase 3", title: "Community Growth" },
    { phase: "Phase 4", title: "To the Moon!" },
  ];

  return (
    <section className="py-24 bg-[#121212] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#00ff00]/5 to-transparent" />
      
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#00ff00] mb-4 drop-shadow-[0_0_10px_#00ff00]">
          The Toadmap
        </h2>
        <p className="text-xl text-white/80 mb-16">
          Follow the lily pads to the future.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#00ff00] text-[#0d0d0d] p-6 rounded-xl shadow-[0_0_10px_#00ff00] transform hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="font-bold text-lg mb-2">{item.phase}</div>
              <div className="text-xl font-extrabold">{item.title}</div>
              <div className="absolute inset-0 bg-[#00ff00]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};