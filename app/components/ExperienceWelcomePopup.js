'use client';

import { ArrowRight, Crown, Heart, Sparkles, Stars } from 'lucide-react';

const celebrationParticles = Array.from({ length: 92 }, (_, index) => ({
  id: index,
  left: 3 + ((index * 37) % 94),
  delay: ((index * 11) % 30) / 10,
  duration: 3.5 + (index % 8) * 0.34,
  size: 13 + (index % 6) * 2,
  type: ['heart', 'petal', 'star', 'sparkle'][index % 4],
  color: ['#f43f5e', '#ec4899', '#fbcfe8', '#fda4af', '#fbbf24', '#67e8f9'][index % 6],
}));

const particleGlyphs = {
  heart: '♥',
  petal: '✿',
  star: '✦',
  sparkle: '✧',
};

const journeyNotes = ['Story', 'Cake', 'Gifts', 'Special', 'Party'];

const ExperienceWelcomePopup = ({ isOpen, onContinue }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-x-hidden overflow-y-auto px-4 py-6 sm:px-6">
      <div className="absolute inset-0 bg-rose-950/44 backdrop-blur-md" />

      {celebrationParticles.map((particle) => (
        <span
          key={particle.id}
          className="pointer-events-none fixed top-[-48px] font-dancing font-bold"
          style={{
            left: `${particle.left}%`,
            animation: `experienceFall ${particle.duration}s linear forwards`,
            animationDelay: `${particle.delay}s`,
            color: particle.color,
            fontSize: `${particle.size}px`,
            textShadow: `0 0 ${particle.size}px ${particle.color}`,
            opacity: 0.86,
          }}
        >
          {particleGlyphs[particle.type]}
        </span>
      ))}

      <div className="experience-scene relative my-auto w-full max-w-[34rem]">
        <div className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-rose-300/34 via-amber-200/24 to-cyan-200/24 blur-2xl" />
        <div className="experience-modal relative overflow-hidden rounded-[2rem] border-2 border-pink-100 bg-gradient-to-br from-white via-pink-50 to-rose-50 text-center shadow-[0_34px_110px_rgba(88,28,45,0.40)]">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(251,191,36,0.18),transparent_28%),radial-gradient(circle_at_86%_20%,rgba(244,114,182,0.20),transparent_30%),radial-gradient(circle_at_20%_84%,rgba(103,232,249,0.14),transparent_30%)]" />
          <div className="absolute -right-14 top-16 h-40 w-40 rounded-full border border-rose-200/70 experience-orbit" />
          <div className="absolute -right-5 top-24 h-24 w-24 rounded-full border border-amber-200/80 experience-orbit-reverse" />

          <div className="relative px-6 py-8 sm:px-9 sm:py-10">
            <div className="experience-heart mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 text-white shadow-[0_18px_40px_rgba(225,29,72,0.35)]">
              <Heart className="h-10 w-10 animate-heartbeat" fill="currentColor" />
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/78 px-3 py-1.5 font-nunito text-[10px] font-extrabold uppercase tracking-[0.24em] text-rose-500 shadow-sm">
              <Crown className="h-4 w-4 text-amber-500" />
              <span>Access Unlocked</span>
            </div>

            <h2 className="font-dancing text-4xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 drop-shadow-sm sm:text-5xl">
              Welcome, My Love!
            </h2>

            <p className="mx-auto mt-4 max-w-sm font-nunito text-sm font-bold leading-7 text-pink-700/82 sm:text-base">
              The seal is broken. The journey is ready with story pages, sweet
              moments, gifts, and a premium celebration waiting inside.
            </p>

            <div className="my-6 flex items-center justify-center gap-3 text-rose-300">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-200" />
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-200" />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {journeyNotes.map((note, index) => (
                <div
                  key={note}
                  className="rounded-2xl border border-rose-100 bg-white/74 px-3 py-3 shadow-sm backdrop-blur"
                >
                  <Stars className="mx-auto mb-1 h-4 w-4 text-amber-400" />
                  <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose-500">
                    {note}
                  </p>
                  <p className="font-nunito text-[10px] font-bold text-pink-600/60">
                    0{index + 1}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 font-dancing text-2xl font-bold text-rose-500 sm:text-3xl">
              Let&apos;s celebrate you.
            </p>

            <button
              type="button"
              onClick={onContinue}
              className="group mt-7 inline-flex min-h-14 w-full max-w-xs items-center justify-center gap-3 rounded-full border-2 border-rose-300 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 px-7 py-4 font-nunito text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_18px_44px_rgba(225,29,72,0.36)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_55px_rgba(225,29,72,0.46)] active:translate-y-0 active:scale-95"
            >
              <span>Begin The Journey</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900&display=swap');

        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-nunito { font-family: 'Nunito', sans-serif; }

        .experience-scene { perspective: 1000px; }
        .experience-modal {
          transform: rotateX(5deg) rotateY(-4deg);
          transform-style: preserve-3d;
          animation: experienceModal 5.8s ease-in-out infinite;
        }

        .experience-heart {
          transform: translateZ(42px);
          animation: experienceHeart 2.8s ease-in-out infinite;
        }

        .experience-orbit { animation: experienceOrbit 13s linear infinite; }
        .experience-orbit-reverse { animation: experienceOrbit 10s linear infinite reverse; }

        @keyframes experienceFall {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
          8% { opacity: 0.88; }
          100% { transform: translate3d(34px, calc(100vh + 92px), 0) rotate(220deg); opacity: 0; }
        }

        @keyframes experienceModal {
          0%, 100% { transform: rotateX(5deg) rotateY(-4deg) translateY(0); }
          50% { transform: rotateX(2deg) rotateY(4deg) translateY(-8px); }
        }

        @keyframes experienceHeart {
          0%, 100% { transform: translateZ(42px) scale(1); }
          50% { transform: translateZ(62px) scale(1.06); }
        }

        @keyframes experienceOrbit {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .experience-modal {
            transform: none;
            animation: experienceMobile 5.8s ease-in-out infinite;
          }
        }

        @keyframes experienceMobile {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export default ExperienceWelcomePopup;
