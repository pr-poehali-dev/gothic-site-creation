import { useEffect, useState } from 'react';

const Index = () => {
  const [flicker, setFlicker] = useState(false);
  const [ghostFigures, setGhostFigures] = useState<Array<{
    id: number;
    visible: boolean;
    position: { x: number; y: number };
    tilt: number;
  }>>([]);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      const shouldFlicker = Math.random() < 0.15; // 15% chance to flicker
      if (shouldFlicker) {
        setFlicker(true);
        const flickerDuration = 50 + Math.random() * 150; // Random flicker duration 50-200ms
        setTimeout(() => setFlicker(false), flickerDuration);
      }
    }, 100 + Math.random() * 200); // Check every 100-300ms

    return () => clearInterval(flickerInterval);
  }, []);

  useEffect(() => {
    const ghostInterval = setInterval(() => {
      const shouldAppear = Math.random() < 0.08; // 8% chance for ghost to appear
      if (shouldAppear) {
        const newGhost = {
          id: Date.now(),
          visible: true,
          position: {
            x: Math.random() * 80 + 10, // 10-90% from left
            y: Math.random() * 60 + 20, // 20-80% from top
          },
          tilt: (Math.random() - 0.5) * 30, // -15 to +15 degrees
        };
        
        setGhostFigures(prev => [...prev, newGhost]);
        
        // Remove ghost after random duration
        setTimeout(() => {
          setGhostFigures(prev => prev.filter(ghost => ghost.id !== newGhost.id));
        }, 800 + Math.random() * 1200); // 800-2000ms duration
      }
    }, 1000 + Math.random() * 3000); // Check every 1-4 seconds

    return () => clearInterval(ghostInterval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gothic architectural background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('/img/b29b38c1-39a4-4676-bfb1-7c351aa86e3b.jpg')`
        }}
      />
      
      {/* Ominous background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-900/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/20 rounded-full blur-3xl" />
          
          {/* Additional disturbing elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-red-800/30 rotate-45 blur-2xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-800/20 rotate-12 blur-2xl" />
            <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gray-800/40 rounded-full blur-xl" />
          </div>
        </div>
        
        {/* Subtle noise overlay for anxiety */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* Ghost figures */}
      {ghostFigures.map((ghost) => (
        <div
          key={ghost.id}
          className="absolute z-5 transition-opacity duration-200 pointer-events-none"
          style={{
            left: `${ghost.position.x}%`,
            top: `${ghost.position.y}%`,
            transform: `translate(-50%, -50%) rotate(${ghost.tilt}deg)`,
            opacity: ghost.visible ? (flicker ? 0.8 : 0.4) : 0,
          }}
        >
          <div 
            className="w-16 h-24 md:w-20 md:h-28 bg-black/80 relative transition-all duration-300 animate-creepy-breath"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 80% 100%, 20% 100%)',
              animation: `creepy-breath 3s ease-in-out infinite ${Math.random() * 2}s`,
            }}
          >
            {/* Empty face area - hollow and disturbing */}
            <div 
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-7 md:h-7 bg-transparent border-2 border-gray-800/70 rounded-full"
              style={{
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.5)',
                background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 70%)',
              }}
            />
            
            {/* Additional creepy details */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-black/60" />
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-black/40 rounded-full" />
          </div>
        </div>
      ))}

      {/* Subtle animated particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main text */}
      <div className="relative z-10 text-center">
        <h1 
          className={`text-6xl md:text-8xl font-serif transition-colors duration-75 ${
            flicker ? 'text-[#171219]' : 'text-[#4A3D47]'
          }`}
          style={{
            fontFamily: 'Cormorant, serif',
            textShadow: flicker 
              ? '0 0 20px rgba(23, 18, 25, 0.8), 0 0 40px rgba(23, 18, 25, 0.6)'
              : '0 0 30px rgba(74, 61, 71, 0.7), 0 0 60px rgba(74, 61, 71, 0.4)'
          }}
        >
          expectation
        </h1>
        
        {/* Subtle ambient glow */}
        <div 
          className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-75 ${
            flicker ? 'opacity-60' : 'opacity-30'
          }`}
          style={{
            background: flicker 
              ? 'radial-gradient(circle, rgba(23, 18, 25, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(74, 61, 71, 0.3) 0%, transparent 70%)'
          }}
        />
      </div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
    </div>
  );
};

export default Index;