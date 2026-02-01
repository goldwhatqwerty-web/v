
import React, { useState, useEffect } from 'react';

const FairyEffect: React.FC = () => {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const move = () => {
      setPos({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      });
    };
    const interval = setInterval(move, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-50 transition-all duration-[4000ms] ease-in-out"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <div className="relative">
        <div className="text-4xl animate-bounce">🧚‍♀️</div>
        <div className="absolute top-0 left-0 w-full h-full">
           <div className="sparkle bg-yellow-200 w-1 h-1 rounded-full" style={{ left: '10%', top: '10%' }}></div>
           <div className="sparkle bg-white w-2 h-2 rounded-full" style={{ left: '80%', top: '30%' }}></div>
           <div className="sparkle bg-pink-300 w-1 h-1 rounded-full" style={{ left: '40%', top: '70%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default FairyEffect;
