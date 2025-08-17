import { useEffect, useState } from 'react';

const Index = () => {
  const [flicker, setFlicker] = useState(false);

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
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-800/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-red-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/10 rounded-full blur-3xl" />
        </div>
      </div>
      
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