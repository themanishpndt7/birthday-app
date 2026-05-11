'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Crown, Heart, Sparkles, Star, Ticket } from 'lucide-react';
import ExperienceWelcomePopup from './ExperienceWelcomePopup';

const premiumHighlights = [
  { icon: Heart, label: 'Love', text: 'Every detail is personal' },
  { icon: Star, label: 'Wish', text: 'A bright birthday moment' },
  { icon: Ticket, label: 'Gift', text: 'Surprises inside' },
];

const timelineSteps = ['Seal opened', 'Premium landing', 'Journey unlocked'];

const PremiumLanding = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showExperiencePopup, setShowExperiencePopup] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const particles = useMemo(() => (
    Array.from({ length: 62 }, (_, index) => ({
      id: index,
      x: (index * 37) % 100,
      y: (index * 23) % 100,
      size: 1.3 + (index % 6) * 0.55,
      speed: 0.15 + (index % 7) * 0.024,
      opacity: 0.2 + (index % 6) * 0.052,
      color: ['255, 228, 230', '251, 207, 232', '254, 240, 138', '191, 219, 254', '221, 214, 254'][index % 5],
    }))
  ), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let animationTime = 0;

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      animationTime += 0.008;

      const backdrop = ctx.createLinearGradient(0, 0, width, height);
      backdrop.addColorStop(0, '#fff7f7');
      backdrop.addColorStop(0.42, '#fff1f7');
      backdrop.addColorStop(0.72, '#fff7ed');
      backdrop.addColorStop(1, '#eff6ff');
      ctx.fillStyle = backdrop;
      ctx.fillRect(0, 0, width, height);

      const roseGlow = ctx.createRadialGradient(width * 0.68, height * 0.26, 0, width * 0.68, height * 0.26, Math.max(width, height) * 0.56);
      roseGlow.addColorStop(0, 'rgba(251, 113, 133, 0.20)');
      roseGlow.addColorStop(0.48, 'rgba(244, 114, 182, 0.08)');
      roseGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = roseGlow;
      ctx.fillRect(0, 0, width, height);

      const blueGlow = ctx.createRadialGradient(width * 0.2, height * 0.82, 0, width * 0.2, height * 0.82, Math.max(width, height) * 0.42);
      blueGlow.addColorStop(0, 'rgba(103, 232, 249, 0.14)');
      blueGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = blueGlow;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        const drift = (animationTime * particle.speed * 118) % 150;
        const x = ((particle.x / 100) * width + Math.sin(animationTime + particle.id) * 20) % width;
        const y = ((particle.y / 100) * height - drift + height + 90) % (height + 110);

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.shadowColor = `rgba(${particle.color}, 0.76)`;
        ctx.shadowBlur = particle.size * 7;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationRef.current = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles]);

  const handleEnterClick = () => {
    setShowExperiencePopup(true);
  };

  const handlePopupContinue = () => {
    setShowExperiencePopup(false);
    onEnter?.();
  };

  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-rose-50 text-rose-950">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,228,230,0.24)),radial-gradient(circle_at_24%_76%,rgba(251,191,36,0.13),transparent_28%)]" />

      <section className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-6xl items-center gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div
          className="text-center transition-all duration-700 lg:text-left"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-amber-200 bg-white/85 px-4 py-2 font-nunito text-[11px] font-extrabold uppercase tracking-[0.28em] text-rose-500 shadow-sm backdrop-blur">
            <Crown className="h-4 w-4 text-amber-500" />
            <span>Premium Moment</span>
          </div>

          <h1 className="mx-auto max-w-3xl font-dancing text-5xl font-bold leading-[0.96] text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 drop-shadow-sm sm:text-6xl md:text-7xl lg:mx-0">
            Something Special Awaits
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-nunito text-base font-semibold leading-8 text-pink-800/80 sm:text-lg lg:mx-0">
            The seal is open now. This premium landing sets the mood with
            motion, depth, and a soft cinematic pause before the full birthday
            journey begins.
          </p>

          <div className="mx-auto mt-7 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3 lg:mx-0">
            {premiumHighlights.map(({ icon: Icon, label, text }) => (
              <div
                key={label}
                className="premium-chip min-h-24 rounded-2xl border border-pink-100 bg-white/78 px-4 py-4 text-center shadow-sm backdrop-blur"
              >
                <Icon className="mx-auto mb-2 h-5 w-5 text-rose-500" fill={label === 'Love' ? 'currentColor' : 'none'} />
                <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.23em] text-rose-500">
                  {label}
                </p>
                <p className="mt-1 font-nunito text-[11px] font-semibold leading-4 text-pink-800/65">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleEnterClick}
            className="group mt-8 inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-3 rounded-full border-2 border-rose-300 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 px-7 py-4 font-nunito text-sm font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_18px_44px_rgba(225,29,72,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_55px_rgba(225,29,72,0.45)] active:translate-y-0 active:scale-95 sm:max-w-xs"
          >
            <span>Enter The Experience</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <div
          className="premium-scene relative mx-auto flex w-full max-w-md justify-center transition-all duration-700 lg:max-w-lg"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.98)',
            transitionDelay: '120ms',
          }}
        >
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-rose-200/44 via-amber-100/44 to-cyan-100/34 blur-2xl" />
          <div className="absolute inset-x-8 top-8 h-[82%] rotate-[-7deg] rounded-[2rem] border border-rose-200 bg-rose-100/55 shadow-xl" />
          <div className="absolute inset-x-8 top-10 h-[82%] rotate-[6deg] rounded-[2rem] border border-amber-200 bg-amber-100/45 shadow-xl" />

          <div className="premium-pass relative w-full overflow-hidden rounded-[2rem] border-2 border-pink-100 bg-white shadow-[0_34px_100px_rgba(225,29,72,0.24)]">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300" />
            <div className="absolute -right-12 top-12 h-40 w-40 rounded-full border border-rose-200/70 premium-orbit" />
            <div className="absolute -right-4 top-20 h-24 w-24 rounded-full border border-amber-200/80 premium-orbit-reverse" />

            <div className="relative p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.34em] text-rose-400">
                    Access Granted
                  </p>
                  <p className="mt-2 font-dancing text-3xl font-bold leading-none text-rose-700 sm:text-4xl">
                    Birthday Story
                  </p>
                </div>

                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 text-white shadow-[0_16px_36px_rgba(225,29,72,0.36)]">
                  <Heart className="h-8 w-8" fill="currentColor" />
                  <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-amber-100" />
                </div>
              </div>

              <div className="premium-stage relative mx-auto flex aspect-square w-48 items-center justify-center rounded-full border-2 border-dashed border-rose-200 bg-gradient-to-br from-pink-50 via-white to-amber-50 shadow-inner sm:w-56">
                <div className="absolute h-[82%] w-[82%] rounded-full border border-rose-100" />
                <div className="absolute h-[58%] w-[58%] rounded-full border border-amber-100" />
                <div className="premium-crown flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 text-white shadow-[0_18px_38px_rgba(225,29,72,0.38)] sm:h-32 sm:w-32">
                  <Crown className="h-14 w-14" />
                </div>
              </div>

              <div className="mt-7 space-y-3">
                {timelineSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 font-nunito text-[10px] font-black text-rose-600">
                      {index + 1}
                    </span>
                    <span className="h-2 flex-1 rounded-full bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100" />
                    <span className="w-28 text-right font-nunito text-[11px] font-extrabold uppercase tracking-[0.14em] text-rose-500">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExperienceWelcomePopup
        isOpen={showExperiencePopup}
        onContinue={handlePopupContinue}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900&display=swap');

        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-nunito { font-family: 'Nunito', sans-serif; }

        .premium-scene { perspective: 1200px; }
        .premium-pass {
          transform: rotateX(7deg) rotateY(-7deg);
          transform-style: preserve-3d;
          animation: premiumPassFloat 7s ease-in-out infinite;
        }

        .premium-chip { transition: transform 260ms ease, box-shadow 260ms ease; }
        .premium-chip:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 36px rgba(225, 29, 72, 0.14);
        }

        .premium-crown {
          transform: translateZ(48px);
          animation: premiumCrown 3.4s ease-in-out infinite;
        }

        .premium-orbit { animation: premiumOrbit 14s linear infinite; }
        .premium-orbit-reverse { animation: premiumOrbit 11s linear infinite reverse; }

        @keyframes premiumPassFloat {
          0%, 100% { transform: rotateX(7deg) rotateY(-7deg) translateY(0); }
          50% { transform: rotateX(4deg) rotateY(6deg) translateY(-8px); }
        }

        @keyframes premiumCrown {
          0%, 100% { transform: translateZ(48px) scale(1); }
          50% { transform: translateZ(70px) scale(1.05); }
        }

        @keyframes premiumOrbit {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .premium-pass {
            transform: none;
            animation: premiumMobileFloat 6s ease-in-out infinite;
          }
        }

        @keyframes premiumMobileFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </main>
  );
};

export default PremiumLanding;
