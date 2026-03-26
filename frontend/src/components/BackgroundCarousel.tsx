import { useEffect, useState } from 'react';

const slides = [
  'radial-gradient(1200px 500px at 10% 10%, rgba(16,185,129,0.18), rgba(255,255,255,0))',
  'radial-gradient(1200px 500px at 90% 20%, rgba(59,130,246,0.18), rgba(255,255,255,0))',
  'radial-gradient(1200px 500px at 40% 90%, rgba(245,158,11,0.14), rgba(255,255,255,0))'
];

export default function BackgroundCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {slides.map((bg, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: bg }}
        />
      ))}
    </div>
  );
}
