'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

const BalloonBlast = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState('initial');
  const [balloons, setBalloons] = useState([]);
  const [poppedBalloons, setPoppedBalloons] = useState(new Set());
  const [confetti, setConfetti] = useState([]);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const animationFrameRef = useRef(null);

  // 13 Different emoji balloons
  const balloonEmojis = ['🎈', '🎈', '🎈', '🎊', '🎉', '✨', '💖', '💝', '🌟', '💫', '🎁', '🎂', '👑'];
  const balloonColors = [
    '#FF1493', '#FF6347', '#FFD700', '#00CED1', '#32CD32',
    '#FF69B4', '#FF4500', '#FF00FF', '#00FF00', '#FFA500',
    '#87CEEB', '#FF8C00', '#E6E6FA'
  ];

  // Initialize balloons
  useEffect(() => {
    if (!isOpen) return;

    const newBalloons = balloonEmojis.map((emoji, i) => ({
      id: i,
      emoji: emoji,
      color: balloonColors[i],
      x: (i / balloonEmojis.length) * (window.innerWidth - 60) + 30,
      y: window.innerHeight + 20,
      vx: (Math.random() - 0.5) * 3,
      vy: -2 - Math.random() * 3,
      scale: 1,
      rotation: Math.random() * 360,
      wobble: Math.random() * 2 * Math.PI,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      popped: false,
    }));

    setBalloons(newBalloons);
    setPoppedBalloons(new Set());
    setConfetti([]);
    setStage('floating');
  }, [isOpen]);

  // Audio synthesis functions
  const initAudioContext = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;
    return audioContext;
  }, []);

  const playBalloonSound = useCallback(() => {
    try {
      const ctx = initAudioContext();
      const now = ctx.currentTime;
      
      // Pop sound - quick high frequency drop
      for (let i = 0; i < 2; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(800 + i * 200, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      console.log('Audio not supported');
    }
  }, [initAudioContext]);

  const playVictorySound = useCallback(() => {
    try {
      const ctx = initAudioContext();
      const now = ctx.currentTime;

      // Victory melody
      const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(freq, now + index * 0.2);

        gain.gain.setValueAtTime(0.15, now + index * 0.2);
        gain.gain.exponentialRampToValueAtTime(0, now + index * 0.2 + 0.3);

        osc.start(now + index * 0.2);
        osc.stop(now + index * 0.2 + 0.3);
      });
    } catch (e) {
      console.log('Audio not supported');
    }
  }, [initAudioContext]);

  // Handle balloon pop
  const popBalloon = useCallback((id) => {
    if (poppedBalloons.has(id)) return;

    setPoppedBalloons((prev) => new Set(prev).add(id));
    playBalloonSound();

    // Create confetti
    const balloon = balloons.find((b) => b.id === id);
    if (balloon) {
      const newConfetti = Array.from({ length: 20 }).map((_, i) => ({
        id: `${id}-${i}`,
        x: balloon.x,
        y: balloon.y,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 5,
        emoji: ['🎉', '✨', '💖', '🌟', '💫'][Math.floor(Math.random() * 5)],
        life: 1,
        rotation: Math.random() * 360,
      }));

      setConfetti((prev) => [...prev, ...newConfetti]);
    }

    // Check if all balloons are popped
    if (poppedBalloons.size === balloonEmojis.length - 1) {
      setTimeout(() => {
        setStage('victory');
        playVictorySound();
      }, 500);
    }
  }, [balloons, poppedBalloons, playBalloonSound, playVictorySound, balloonEmojis.length]);

  // Animation loop
  useEffect(() => {
    if (!isOpen || stage !== 'floating') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationTime = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime += 0.016; // ~60fps

      // Draw and update balloons
      setBalloons((prevBalloons) =>
        prevBalloons.map((balloon) => {
          if (poppedBalloons.has(balloon.id)) return balloon;

          let updatedBalloon = { ...balloon };
          updatedBalloon.y += balloon.vy;
          updatedBalloon.x += balloon.vx + Math.sin(animationTime + balloon.wobble) * 0.5;
          updatedBalloon.rotation += 2;
          updatedBalloon.wobble += balloon.wobbleSpeed;

          return updatedBalloon;
        })
      );

      // Draw and update confetti
      setConfetti((prevConfetti) =>
        prevConfetti
          .map((c) => ({
            ...c,
            y: c.y + c.vy,
            x: c.x + c.vx,
            vy: c.vy + 0.1, // gravity
            life: c.life - 0.01,
            rotation: c.rotation + 5,
          }))
          .filter((c) => c.life > 0)
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, stage, poppedBalloons]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 z-50 flex items-center justify-center overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-white rounded-full p-3 hover:bg-gray-100 transition-all shadow-lg"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>

          {/* Canvas for particle effects */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
          />

          {/* Balloons */}
          <div className="absolute inset-0 pointer-events-auto">
            {balloons.map((balloon) => (
              <div
                key={balloon.id}
                className={`absolute cursor-pointer transition-all duration-200 ${
                  poppedBalloons.has(balloon.id) ? 'opacity-0 scale-0' : 'opacity-100'
                }`}
                style={{
                  left: `${balloon.x}px`,
                  top: `${balloon.y}px`,
                  transform: `scale(${balloon.scale}) rotate(${balloon.rotation}deg) translateX(-50%) translateY(-50%)`,
                }}
                onClick={() => popBalloon(balloon.id)}
              >
                <div
                  className="text-6xl md:text-7xl animate-bounce select-none hover:scale-110 transition-transform"
                  style={{
                    animationDelay: `${balloon.id * 0.1}s`,
                    filter: `drop-shadow(0 4px 8px ${balloon.color}99)`,
                  }}
                >
                  {balloon.emoji}
                </div>
              </div>
            ))}
          </div>

          {/* Confetti (rendered on canvas) */}
          {confetti.map((conf) => (
            <div
              key={conf.id}
              className="absolute pointer-events-none text-2xl"
              style={{
                left: `${conf.x}px`,
                top: `${conf.y}px`,
                opacity: conf.life,
                transform: `rotate(${conf.rotation}deg)`,
              }}
            >
              {conf.emoji}
            </div>
          ))}

          {/* Victory Message */}
          {stage === 'victory' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-center animate-bounce">
                <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg mb-4 font-dancing">
                  🎉 Hooray! 🎉
                </h1>
                <p className="text-2xl md:text-3xl text-white drop-shadow-md font-nunito">
                  You popped all the balloons!
                </p>
                <p className="text-lg text-white drop-shadow-md font-nunito mt-4">
                  Have a blast celebrating! 🎊✨
                </p>
              </div>
            </div>
          )}

          {/* Instructions */}
          {stage === 'floating' && poppedBalloons.size < balloonEmojis.length && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-xl md:text-2xl font-bold text-white drop-shadow-lg animate-pulse">
                🎈 Tap to pop the balloons! 🎈
              </p>
              <p className="text-sm md:text-base text-white drop-shadow-md mt-2">
                {balloonEmojis.length - poppedBalloons.size} balloons left
              </p>
            </div>
          )}

          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            .animate-bounce { animation: bounce 1s infinite; }
          `}</style>
        </div>
      )}
    </>
  );
};

export default BalloonBlast;
