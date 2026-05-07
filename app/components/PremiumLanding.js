'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Heart, Sparkles } from 'lucide-react';

const PremiumLanding = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  // Create floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
    particlesRef.current = newParticles;

    // Trigger animations after component mounts
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Canvas background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationTime = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      animationTime += 0.003;

      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      gradient.addColorStop(0.5, 'rgba(88, 28, 93, 0.85)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated glowing lights
      for (let i = 0; i < 3; i++) {
        const x = (Math.sin(animationTime + i) * 0.3 + 0.5) * canvas.width;
        const y = (Math.cos(animationTime * 0.7 + i) * 0.3 + 0.4) * canvas.height;

        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 300);
        glowGradient.addColorStop(0, `rgba(236, 72, 153, 0.15)`);
        glowGradient.addColorStop(1, `rgba(236, 72, 153, 0)`);
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw floating stars/particles
      for (let particle of particlesRef.current) {
        const yOffset = (animationTime / (particle.duration / 100)) % 100;
        const opacity = Math.sin(animationTime + particle.id) * 0.3 + particle.opacity;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, opacity)})`;
        ctx.beginPath();
        ctx.arc(
          (particle.x + Math.sin(animationTime * 0.5 + particle.id) * 10) / 100 * canvas.width,
          (yOffset) / 100 * canvas.height,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex flex-col items-center justify-center">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 w-full h-full"
        style={{ maxWidth: '100vw', maxHeight: '100vh' }}
      />

      {/* Animated Gradient Overlay */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/5 to-black/20"></div>
      </div>

      {/* Floating Particles with CSS */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size * 2}px`,
            height: `${particle.size * 2}px`,
            background: `radial-gradient(circle, rgba(255,255,255,0.8), rgba(236,72,153,0.2))`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            opacity: isLoaded ? particle.opacity : 0,
            transition: 'opacity 1s ease-out',
            boxShadow: `0 0 ${particle.size * 3}px rgba(236, 72, 153, 0.5)`,
          }}
        ></div>
      ))}

      {/* Main Content */}
      <div className="fixed inset-0 flex flex-col items-center justify-center px-4 sm:px-6 z-10 w-full h-full overflow-y-auto" style={{ paddingBottom: 'var(--safe-area-bottom)', paddingTop: 'var(--safe-area-top)' }}>
        {/* Premium Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-3xl"></div>
        </div>

        {/* Main Container */}
        <div className="relative z-20 text-center max-w-2xl mx-auto w-full">
          {/* Decorative Top Element */}
          <div
            className="mb-6 sm:mb-8 inline-block"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: '0.2s',
            }}
          >
            <div className="relative">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400 fill-pink-400 mx-auto animate-pulse" />
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 absolute top-0 right-0 animate-spin" />
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 absolute bottom-0 left-0 animate-spin" style={{ animationDirection: 'reverse' }} />
            </div>
          </div>

          {/* Main Heading */}
          <h1
            className="font-dancing text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-pink-300"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: '0.4s',
              textShadow: '0 0 40px rgba(236, 72, 153, 0.3)',
              lineHeight: '1.2',
            }}
          >
            Something Special Awaits ❤️
          </h1>

          {/* Subtitle */}
          <p
            className="font-nunito text-base sm:text-lg md:text-xl text-pink-100/80 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: '0.6s',
            }}
          >
            This is not just a birthday wish…
            <br />
            <span className="text-lg sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
              It's a memory made with love.
            </span>
          </p>

          {/* Divider */}
          <div
            className="w-16 sm:w-20 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mb-8 sm:mb-12"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: '0.8s',
            }}
          ></div>

          {/* CTA Button */}
          <button
            onClick={onEnter}
            className="relative group mb-8 sm:mb-12 mx-auto"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: '1s',
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:blur-2xl"></div>

            {/* Main button */}
            <div className="relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 backdrop-blur-md border border-white/30 shadow-2xl group-hover:shadow-pink-500/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl overflow-hidden min-h-12 sm:min-h-14 flex items-center justify-center">
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  style={{
                    animation: 'shimmer 2s infinite',
                    transform: 'skewX(-20deg)',
                  }}
                ></div>
              </div>

              <span className="relative text-white font-nunito font-bold text-base sm:text-lg tracking-wide flex items-center gap-2 sm:gap-3 justify-center whitespace-nowrap">
                Enter The Experience
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
              </span>
            </div>

            {/* Animated border */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
              borderImage: 'linear-gradient(45deg, #ec4899, #a855f7, #ec4899) 1',
              animation: 'borderAnim 3s linear infinite',
            }}></div>
          </button>

          {/* Scroll Indicator */}
          <div
            className="flex flex-col items-center gap-1 sm:gap-2 text-xs sm:text-sm mt-6 sm:mt-8"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: '1.2s',
            }}
          >
            <p className="text-pink-200/60 text-xs sm:text-sm font-nunito tracking-widest uppercase">Scroll to explore</p>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-pink-300 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Footer Credits */}
      <div
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-center text-pink-200/40 text-xs sm:text-sm font-nunito z-5 px-4"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 2s ease-out',
          transitionDelay: '1.5s',
          paddingBottom: 'var(--safe-area-bottom)',
        }}
      >
        Made with 💕 for someone special
      </div>

      {/* CSS Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap');

        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes borderAnim {
          0% {
            border-image-source: linear-gradient(45deg, #ec4899, #a855f7, #ec4899);
          }
          50% {
            border-image-source: linear-gradient(225deg, #ec4899, #a855f7, #ec4899);
          }
          100% {
            border-image-source: linear-gradient(45deg, #ec4899, #a855f7, #ec4899);
          }
        }

        .font-dancing {
          font-family: 'Dancing Script', cursive;
          font-weight: 700;
          letter-spacing: -2px;
        }

        .font-nunito {
          font-family: 'Nunito', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default PremiumLanding;
