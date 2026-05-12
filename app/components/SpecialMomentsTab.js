'use client';

import { useState } from 'react';
import {
  BookHeart,
  Camera,
  Clock,
  Crown,
  Gift as GiftIcon,
  Heart,
  Music,
  Play,
  Sparkles,
  Star,
  Ticket,
} from 'lucide-react';

const vaultCards = [
  {
    title: 'Hologram Letter',
    eyebrow: 'Words in orbit',
    body: 'A private letter suspended like a glowing keepsake, made for the words that deserve silence around them.',
    icon: BookHeart,
    colors: 'from-rose-500 via-pink-500 to-amber-400',
    aura: 'rgba(244,63,94,0.34)',
  },
  {
    title: 'Orbit Playlist',
    eyebrow: 'Songs for us',
    body: 'A rotating music chamber for the feelings that are easier to play than explain.',
    icon: Music,
    colors: 'from-cyan-500 via-sky-500 to-emerald-400',
    aura: 'rgba(6,182,212,0.32)',
  },
  {
    title: 'Wish Capsule',
    eyebrow: 'Saved for later',
    body: 'A sealed birthday wish, glowing softly until the right future day arrives.',
    icon: Ticket,
    colors: 'from-amber-400 via-orange-400 to-rose-500',
    aura: 'rgba(251,146,60,0.34)',
  },
  {
    title: 'Secret Cinema',
    eyebrow: 'A tiny theater',
    body: 'A cinematic corner for memories, surprises, and one beautiful replay button.',
    icon: Camera,
    colors: 'from-violet-500 via-fuchsia-500 to-rose-500',
    aura: 'rgba(168,85,247,0.34)',
  },
];

const orbitDots = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  angle: (360 / 18) * index,
  size: 4 + (index % 3) * 2,
  delay: index * 0.08,
}));

const timeline = [
  { label: 'First look', value: 'A quiet glow' },
  { label: 'Memory lock', value: 'Kept private' },
  { label: 'Forever key', value: 'Always yours' },
];

const SpecialMomentsTab = ({ daysAlive, onOpenGifts, onOpenCelebration }) => {
  const [activeCard, setActiveCard] = useState(0);
  const selected = vaultCards[activeCard];
  const SelectedIcon = selected.icon;

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] px-3 py-4 sm:px-5 sm:py-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.9),rgba(255,241,242,0.64)_38%,rgba(224,242,254,0.56)_72%,rgba(250,245,255,0.66))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] special-vault-grid" />
      <div className="pointer-events-none absolute -left-16 top-10 h-52 w-52 rounded-full bg-rose-300/28 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-16 h-56 w-56 rounded-full bg-cyan-300/24 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-5">
        <header className="grid gap-5 text-center lg:grid-cols-[0.9fr_1.1fr] lg:text-left">
          <div>
            <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-rose-400">
              Signature Surprise
            </p>
            <h2 className="mt-1 font-dancing text-4xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-violet-600 to-cyan-600 sm:text-5xl">
              Memory Observatory
            </h2>
          </div>
          <p className="mx-auto max-w-xl font-nunito text-sm font-bold leading-7 text-pink-800/72 lg:mx-0 lg:pt-4">
            A different kind of special room: part memory vault, part tiny planetarium,
            with keepsakes floating in a 3D orbit around the moment.
          </p>
        </header>

        <section className="special-observatory grid w-full gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[31rem] overflow-hidden rounded-[2rem] border border-white/80 bg-white/62 p-4 shadow-[0_30px_90px_rgba(79,70,229,0.13)] backdrop-blur-xl sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.92),transparent_28%),radial-gradient(circle_at_50%_52%,rgba(244,63,94,0.15),transparent_45%),radial-gradient(circle_at_52%_52%,rgba(34,211,238,0.12),transparent_56%)]" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-rose-200/80 special-orbit" />
            <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-200/80 special-orbit-reverse" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2">
              {orbitDots.map((dot) => (
                <span
                  key={dot.id}
                  className="special-dot absolute rounded-full"
                  style={{
                    width: `${dot.size}px`,
                    height: `${dot.size}px`,
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${dot.angle}deg) translateX(150px)`,
                    animationDelay: `${dot.delay}s`,
                    backgroundColor: dot.id % 2 ? '#fb7185' : '#22d3ee',
                  }}
                />
              ))}
            </div>

            <div className="relative flex min-h-[29rem] flex-col items-center justify-center text-center">
              <div
                className="special-hologram relative flex h-44 w-44 items-center justify-center rounded-[2.25rem] text-white shadow-[0_28px_80px_rgba(79,70,229,0.22)] sm:h-52 sm:w-52"
                style={{ '--aura': selected.aura }}
              >
                <div className={`absolute inset-0 rounded-[2.25rem] bg-gradient-to-br ${selected.colors}`} />
                <div className="absolute inset-4 rounded-[1.55rem] border border-white/45" />
                <div className="absolute -inset-5 rounded-[2.6rem] bg-[var(--aura)] blur-2xl" />
                <SelectedIcon className="relative z-10 h-16 w-16 drop-shadow sm:h-20 sm:w-20" strokeWidth={1.8} />
                <Sparkles className="absolute right-5 top-5 z-10 h-5 w-5 text-white/85" />
                <Star className="absolute bottom-5 left-5 z-10 h-5 w-5 text-white/85" />
              </div>

              <div className="mt-8 max-w-lg">
                <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-rose-400">
                  {selected.eyebrow}
                </p>
                <h3 className="mt-2 font-dancing text-4xl font-bold leading-tight text-rose-700 sm:text-5xl">
                  {selected.title}
                </h3>
                <p className="mt-4 font-nunito text-sm font-bold leading-7 text-pink-800/76">
                  {selected.body}
                </p>
              </div>

              <div className="mt-7 grid w-full max-w-md grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onOpenGifts}
                  className="birthday-action-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-4 font-nunito text-xs font-extrabold uppercase tracking-[0.14em] transition-all duration-300"
                >
                  <GiftIcon className="h-4 w-4" />
                  Open Gifts
                </button>
                <button
                  type="button"
                  onClick={onOpenCelebration}
                  className="birthday-action-dark inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-4 font-nunito text-xs font-extrabold uppercase tracking-[0.14em] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Party Deck
                </button>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-3">
            <div className="rounded-[1.75rem] border border-rose-100 bg-white/82 p-4 shadow-sm backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.22em] text-rose-400">
                    Choose a signal
                  </p>
                  <h3 className="font-dancing text-3xl font-bold text-rose-700">
                    Floating keepsakes
                  </h3>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-inner">
                  <Crown className="h-6 w-6" />
                </div>
              </div>

              <div className="grid gap-2">
                {vaultCards.map((card, index) => {
                  const Icon = card.icon;
                  const isActive = activeCard === index;

                  return (
                    <button
                      key={card.title}
                      type="button"
                      onClick={() => setActiveCard(index)}
                      className={`group grid min-h-[4.9rem] grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${
                        isActive
                          ? 'border-rose-200 bg-white shadow-[0_18px_38px_rgba(244,63,94,0.15)]'
                          : 'border-pink-100 bg-white/64 hover:border-rose-200 hover:bg-white/92'
                      }`}
                    >
                      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${card.colors} text-white shadow-sm transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-nunito text-sm font-black text-rose-700">
                          {card.title}
                        </span>
                        <span className="mt-0.5 block truncate font-nunito text-xs font-bold text-pink-700/62">
                          {card.eyebrow}
                        </span>
                      </span>
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${isActive ? 'bg-rose-500 text-white' : 'bg-pink-50 text-pink-300 group-hover:bg-pink-100 group-hover:text-rose-500'}`}>
                        <Play className="h-3.5 w-3.5" fill="currentColor" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[1.5rem] border border-amber-100 bg-white/82 p-4 text-center shadow-sm backdrop-blur">
                <Clock className="mx-auto mb-2 h-6 w-6 text-amber-500" />
                <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-500">
                  Beautiful days
                </p>
                <p className="mt-1 font-dancing text-3xl font-bold text-rose-700">
                  {daysAlive || 0}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-cyan-100 bg-white/82 p-4 text-center shadow-sm backdrop-blur">
                <Heart className="mx-auto mb-2 h-6 w-6 text-cyan-600" fill="currentColor" />
                <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.18em] text-cyan-600">
                  Signal
                </p>
                <p className="mt-1 font-dancing text-3xl font-bold text-rose-700">
                  Alive
                </p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-violet-100 bg-white/82 p-4 shadow-sm backdrop-blur">
              <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.22em] text-violet-500">
                Memory sequence
              </p>
              <div className="mt-4 space-y-3">
                {timeline.map((item, index) => (
                  <div key={item.label} className="grid grid-cols-[auto_1fr] items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-violet-500 font-nunito text-[10px] font-black text-white shadow-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-nunito text-xs font-black uppercase tracking-[0.12em] text-rose-700">
                        {item.label}
                      </p>
                      <p className="font-nunito text-xs font-semibold text-pink-700/64">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900&display=swap');

        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-nunito { font-family: 'Nunito', sans-serif; }

        .special-vault-grid {
          background-image:
            linear-gradient(rgba(225, 29, 72, 0.34) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8, 145, 178, 0.26) 1px, transparent 1px);
          background-size: 38px 38px;
        }

        .special-observatory { perspective: 1300px; }
        .special-hologram {
          transform-style: preserve-3d;
          animation: specialHologram 6s ease-in-out infinite;
        }

        .special-orbit { animation: specialOrbit 18s linear infinite; }
        .special-orbit-reverse { animation: specialOrbit 13s linear infinite reverse; }

        .special-dot {
          transform-origin: 0 0;
          filter: drop-shadow(0 0 10px currentColor);
          animation: specialDot 2.8s ease-in-out infinite;
        }

        @keyframes specialHologram {
          0%, 100% { transform: rotateX(10deg) rotateY(-12deg) translateY(0); }
          50% { transform: rotateX(3deg) rotateY(12deg) translateY(-12px); }
        }

        @keyframes specialOrbit {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes specialDot {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }

        @media (max-width: 640px) {
          .special-hologram {
            animation: specialHologramMobile 5.8s ease-in-out infinite;
          }
        }

        @keyframes specialHologramMobile {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default SpecialMomentsTab;
