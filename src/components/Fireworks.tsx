import React from 'react';

const PARTICLE_COUNT = 150;

const Fireworks: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const animationDuration = `${Math.random() * 1 + 0.5}s`;
        const animationDelay = `${Math.random() * 1.5}s`;
        const hue = Math.random() * 360;

        return (
          <div
            key={i}
            className="firework-particle"
            style={{
              top,
              left,
              '--hue': hue,
              animationDuration,
              animationDelay,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};

export default Fireworks;