<<<<<<< HEAD
import { useState, useEffect } from 'react';

interface BackgroundImage {
  id: number;
  url: string;
  opacity: number;
}

export default function BackgroundCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Beautiful finance/business background images from Unsplash
  // These showcase professional environments and financial concepts
  const backgroundImages: BackgroundImage[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=1920&h=1080&fit=crop&q=80',
      opacity: 0.3,
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=80',
      opacity: 0.3,
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&q=80',
      opacity: 0.3,
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1460925895917-aae19106c53f?w=1920&h=1080&fit=crop&q=80',
      opacity: 0.3,
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f9?w=1920&h=1080&fit=crop&q=80',
      opacity: 0.3,
    },
  ];

  // Rotate images every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  // Handle image loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Background color base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f9fbfd] via-[#f2f4f7] to-[#e8eaef]"></div>

      {/* Image carousel container */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image.url}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay for opacity control */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: `rgba(255, 255, 255, ${1 - image.opacity})`,
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Gradient overlay for consistent text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-white/30 pointer-events-none"></div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      ></div>
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-emerald-400/3 rounded-full blur-3xl animate-pulse opacity-40"></div>

      {/* Image indicators (dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary/60 w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/20 animate-pulse z-10"></div>
      )}
=======
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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
    </div>
  );
}
