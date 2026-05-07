'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

const NightCelebrationFireworks = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [stage, setStage] = useState('initial');
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  
  // Use refs for animation state to avoid re-render loops
  const animationStateRef = useRef({
    rockets: [],
    explosions: [],
    stars: [],
    clouds: [],
  });
  
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);

  const wishes = [
    // "Shweta ❤️",
    "Mere Bhot Pyre Babu <3 ❤️",
    "Mere Bhot Pyre Wifey <3💍",
    "Mere Bhot Pyre Bacche <3❤️",
    "Mere Bhot Pyre Betu <3🧿",
    "Mere Jigar <3🫀",
    "Mere Sbkuch <3🌎",
    "Mine Love <3❤️",
    "Mine Cutie <3🥰",
    "Princess <3👸",
    "Sweetheart <3😍",
    "Meri Jaan <3🫀",
    "My Everything <3🌎",
    "Forever Mine <3♾️"
  ];

  // Initialize stars, clouds, and other background elements
  useEffect(() => {
    if (!isOpen) return;

    // Create stars
    const newStars = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.7,
      radius: Math.random() * 1.5,
      opacity: Math.random() * 0.6 + 0.4,
      twinkleDuration: Math.random() * 3 + 2,
      twinkling: Math.random() > 0.5,
    }));

    // Create clouds
    const newClouds = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      x: (i / 4) * window.innerWidth,
      y: window.innerHeight * 0.2 + Math.random() * 50,
      width: 100 + Math.random() * 80,
      speed: 0.3 + Math.random() * 0.5,
      opacity: 0.4 + Math.random() * 0.2,
    }));

    animationStateRef.current.stars = newStars;
    animationStateRef.current.clouds = newClouds;
    animationStateRef.current.rockets = [];
    animationStateRef.current.explosions = [];

    setStage('initial');
    setCurrentWishIndex(0);
    setHasClicked(false);
  }, [isOpen]);

  // Audio synthesis functions
  const initAudioContext = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;
    return audioContext;
  }, []);

  const playRocketSound = useCallback(() => {
    try {
      const ctx = initAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.5);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.5);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      console.log('Audio not supported');
    }
  }, [initAudioContext]);

  const playExplosionSound = useCallback(() => {
    try {
      const ctx = initAudioContext();
      const now = ctx.currentTime;

      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(200 + i * 150, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.log('Audio not supported');
    }
  }, [initAudioContext]);

  // Launch rocket
  const launchRocket = useCallback(() => {
    const newRocket = {
      id: Date.now(),
      x: window.innerWidth / 2,
      y: window.innerHeight - 100,
      targetY: window.innerHeight * 0.2 + Math.random() * 150,
      speed: 8 + Math.random() * 4,
      offsetX: (Math.random() - 0.5) * 100,
      exploded: false,
    };

    animationStateRef.current.rockets.push(newRocket);
    playRocketSound();
  }, [playRocketSound]);

  // Create explosion with particles
  const createExplosion = useCallback(
    (x, y, color) => {
      const newExplosion = {
        id: Date.now(),
        x,
        y,
        color,
        particles: Array.from({ length: 80 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 80 + (Math.random() - 0.5) * 0.5;
          const velocity = 5 + Math.random() * 10;
          return {
            id: i,
            x: x,
            y: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            life: 1,
            size: Math.random() * 4 + 2,
            decay: 0.98 + Math.random() * 0.02,
          };
        }),
        smoke: Array.from({ length: 15 }).map((_, i) => ({
          id: i,
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 2 - 1,
          life: 1,
          size: Math.random() * 30 + 20,
          decay: 0.95,
        })),
      };

      animationStateRef.current.explosions.push(newExplosion);
      playExplosionSound();

      // Show wish text after explosion
      setTimeout(() => {
        setCurrentWishIndex((prev) => {
          const next = prev + 1;
          if (next >= wishes.length) {
            setStage('ending');
          }
          return next;
        });
      }, 600);
    },
    [playExplosionSound, wishes.length]
  );

  // Handle canvas click to start celebration
  const handleCanvasClick = useCallback(() => {
    if (!hasClicked) {
      setHasClicked(true);
      setStage('launching');

      // Launch rockets sequentially
      let rocketDelay = 0;
      wishes.forEach(() => {
        setTimeout(() => {
          launchRocket();
        }, rocketDelay);
        rocketDelay += 800;
      });
    }
  }, [hasClicked, wishes, launchRocket]);

  // Main animation loop
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      // Clear canvas with semi-transparent dark overlay
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw moon
      ctx.fillStyle = 'rgba(255, 255, 240, 0.9)';
      ctx.beginPath();
      ctx.arc(canvas.width * 0.85, canvas.height * 0.15, 80, 0, Math.PI * 2);
      ctx.fill();

      // Moon glow
      const moonGlow = ctx.createRadialGradient(
        canvas.width * 0.85,
        canvas.height * 0.15,
        80,
        canvas.width * 0.85,
        canvas.height * 0.15,
        150
      );
      moonGlow.addColorStop(0, 'rgba(255, 255, 240, 0.1)');
      moonGlow.addColorStop(1, 'rgba(255, 255, 240, 0)');
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(
        canvas.width * 0.85,
        canvas.height * 0.15,
        150,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw and animate clouds
      const state = animationStateRef.current;
      const time = Date.now() * 0.0001;
      
      state.clouds.forEach((cloud) => {
        const cloudX = (cloud.x + time * 50) % (canvas.width + 200) - 100;

        ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
        ctx.beginPath();
        ctx.ellipse(cloudX, cloud.y, cloud.width / 2, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.ellipse(cloudX + 40, cloud.y - 10, 30, 20, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw and animate stars (twinkling)
      state.stars.forEach((star) => {
        let opacity = star.opacity;

        if (star.twinkling) {
          opacity = star.opacity * (Math.sin(time / star.twinkleDuration) * 0.5 + 0.5);
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw rockets
      const rockets = state.rockets;
      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];
        
        if (rocket.y > rocket.targetY) {
          rocket.y -= rocket.speed;

          // Draw rocket
          ctx.fillStyle = '#ff6b00';
          ctx.fillRect(rocket.x + rocket.offsetX, rocket.y, 3, 15);

          // Rocket glow
          const glow = ctx.createRadialGradient(
            rocket.x + rocket.offsetX + 1.5,
            rocket.y + 7.5,
            2,
            rocket.x + rocket.offsetX + 1.5,
            rocket.y + 7.5,
            12
          );
          glow.addColorStop(0, 'rgba(255, 107, 0, 0.6)');
          glow.addColorStop(1, 'rgba(255, 107, 0, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(
            rocket.x + rocket.offsetX + 1.5,
            rocket.y + 7.5,
            12,
            0,
            Math.PI * 2
          );
          ctx.fill();

          // Rocket trail particles
          for (let j = 0; j < 2; j++) {
            ctx.fillStyle = `rgba(255, 200, 0, ${0.6 - j * 0.2})`;
            ctx.beginPath();
            const trailY = rocket.y + 15 + Math.random() * 10;
            const trailX = rocket.x + rocket.offsetX + (Math.random() - 0.5) * 6;
            ctx.arc(trailX, trailY, 2 + Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (!rocket.exploded) {
          // Rocket reached target, create explosion
          rocket.exploded = true;

          const colors = [
            '#ff0000',
            '#00ff00',
            '#ffff00',
            '#ff00ff',
            '#00ffff',
            '#ffa500',
            '#ff1493',
            '#00ff7f',
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];

          createExplosion(rocket.x + rocket.offsetX, rocket.y, color);
          rockets.splice(i, 1);
        } else {
          rockets.splice(i, 1);
        }
      }

      // Update and draw explosions
      const explosions = state.explosions;
      for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i];
        let hasLiveParticles = false;

        // Update and draw particles
        for (let j = explosion.particles.length - 1; j >= 0; j--) {
          const particle = explosion.particles[j];
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.2; // gravity
          particle.life *= particle.decay;

          if (particle.life > 0.05) {
            hasLiveParticles = true;
            ctx.fillStyle = `${explosion.color}${Math.floor(
              particle.life * 255
            )
              .toString(16)
              .padStart(2, '0')}`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Update and draw smoke
        for (let j = explosion.smoke.length - 1; j >= 0; j--) {
          const smoke = explosion.smoke[j];
          smoke.x += smoke.vx;
          smoke.y += smoke.vy;
          smoke.life *= smoke.decay;

          if (smoke.life > 0.05) {
            hasLiveParticles = true;
            ctx.fillStyle = `rgba(200, 200, 200, ${smoke.life * 0.2})`;
            ctx.beginPath();
            ctx.arc(smoke.x, smoke.y, smoke.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Remove dead explosions
        if (!hasLiveParticles) {
          explosions.splice(i, 1);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        onClick={handleCanvasClick}
      />

      {/* Initial Prompt */}
      {!hasClicked && stage === 'initial' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center animate-pulse">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              MERE BHOT PYRE BABU, click on the fire to start the celebration ✨
            </p>
            <div className="animate-bounce">
              <p className="text-6xl">🔥</p>
            </div>
          </div>
        </div>
      )}

      {/* Wish Text Display */}
      {hasClicked && currentWishIndex < wishes.length && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: stage === 'launching' ? 0.8 : 0,
            transition: 'opacity 0.5s ease-out',
          }}
        >
          <div
            className="text-center animate-pulse"
            style={{
              animation: 'textReveal 1.5s ease-out forwards',
            }}
          >
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
              {wishes[currentWishIndex]}
            </p>
          </div>
        </div>
      )}

      {/* Ending Scene */}
      {stage === 'ending' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            opacity: 1,
            animation: 'fadeInScale 1s ease-out forwards',
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-6 text-center px-4">
            The OG Gangster 👑
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-300 drop-shadow-xl text-center px-4">
            One and only one Dangerous Mine Miss Shweta Tiwari JII 🔥
          </p>
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[10000] p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-md border border-white/30 text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <style jsx>{`
        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(20px);
            filter: blur(10px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NightCelebrationFireworks;
