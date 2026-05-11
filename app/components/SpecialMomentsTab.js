'use client';

import { useState } from 'react';
import { BookHeart, Clock, Crown, Gift as GiftIcon, Heart, Music, Sparkles, Ticket } from 'lucide-react';

const vaultCards = [
  {
    title: 'Secret Letter',
    eyebrow: 'The final note',
    body: 'A quiet page for the words that deserve their own spotlight.',
    icon: BookHeart,
    colors: 'from-rose-500 via-pink-500 to-amber-400',
  },
  {
    title: 'Tiny Playlist',
    eyebrow: 'Songs for us',
    body: 'A little music corner for the feelings that are easier to play than say.',
    icon: Music,
    colors: 'from-cyan-500 via-sky-500 to-emerald-400',
  },
  {
    title: 'Wish Capsule',
    eyebrow: 'Saved for later',
    body: 'A birthday wish kept safe, like a promise waiting to bloom.',
    icon: Ticket,
    colors: 'from-amber-400 via-orange-400 to-rose-500',
  },
  {
    title: 'Forever Room',
    eyebrow: 'Our next chapter',
    body: 'A soft little preview of the beautiful days still coming.',
    icon: Crown,
    colors: 'from-violet-500 via-fuchsia-500 to-rose-500',
  },
];

const SpecialMomentsTab = ({ daysAlive, onOpenGifts, onOpenCelebration }) => {
  const [activeCard, setActiveCard] = useState(0);
  const selected = vaultCards[activeCard];
  const SelectedIcon = selected.icon;

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] px-3 py-4 sm:px-5 sm:py-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.88),rgba(255,241,242,0.68),rgba(236,254,255,0.58))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] special-vault-grid" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/80 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-5">
        <header className="text-center">
          <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-rose-400">
            Fifth Surprise
          </p>
          <h2 className="mt-1 font-dancing text-4xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-amber-500 to-cyan-500 sm:text-5xl">
            Memory Vault
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-nunito text-sm font-bold leading-7 text-pink-800/72">
            A premium scrapbook room with letter, music, wish, and forever
            moments in one polished place.
          </p>
        </header>

        <section className="special-vault-stage grid w-full gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[25rem] rounded-[2rem] border border-white/80 bg-white/72 p-4 shadow-[0_28px_80px_rgba(244,63,94,0.16)] backdrop-blur-xl sm:p-5">
            <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(244,63,94,0.10),transparent_34%,rgba(34,211,238,0.11)_68%,rgba(251,191,36,0.11))]" />
            <div className="absolute left-6 right-6 top-8 h-px bg-gradient-to-r from-transparent via-rose-300/70 to-transparent special-sweep" />
            <div className="absolute bottom-8 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent special-sweep-delay" />

            <div className="relative flex h-full min-h-[23rem] flex-col items-center justify-center text-center">
              <div className={`special-core relative flex h-32 w-32 items-center justify-center rounded-[2rem] bg-gradient-to-br ${selected.colors} text-white shadow-[0_24px_60px_rgba(225,29,72,0.25)]`}>
                <div className="absolute inset-3 rounded-[1.35rem] border border-white/55" />
                <SelectedIcon className="relative h-14 w-14" strokeWidth={1.8} />
              </div>

              <div className="mt-7 max-w-md">
                <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-rose-400">
                  {selected.eyebrow}
                </p>
                <h3 className="mt-2 font-dancing text-4xl font-bold text-rose-700">
                  {selected.title}
                </h3>
                <p className="mt-4 font-nunito text-sm font-bold leading-7 text-pink-800/76">
                  {selected.body}
                </p>
              </div>

              <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onOpenGifts}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 font-nunito text-xs font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_14px_34px_rgba(225,29,72,0.26)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <GiftIcon className="h-4 w-4" />
                  Gifts
                </button>
                <button
                  type="button"
                  onClick={onOpenCelebration}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-cyan-200 bg-white px-4 font-nunito text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Sparkles className="h-4 w-4" />
                  Party
                </button>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-3">
            <div className="rounded-[1.75rem] border border-rose-100 bg-white/82 p-4 shadow-sm backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.22em] text-rose-400">
                    Choose a capsule
                  </p>
                  <h3 className="font-dancing text-3xl font-bold text-rose-700">
                    Special keepsakes
                  </h3>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <Heart className="h-6 w-6" fill="currentColor" />
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
                      className={`group grid min-h-[4.75rem] grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${
                        isActive
                          ? 'border-rose-200 bg-rose-50 shadow-[0_14px_30px_rgba(244,63,94,0.12)]'
                          : 'border-pink-100 bg-white/72 hover:border-rose-200 hover:bg-white'
                      }`}
                    >
                      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${card.colors} text-white shadow-sm`}>
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
                      <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-rose-500' : 'bg-pink-100 group-hover:bg-pink-300'}`} />
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
                <Crown className="mx-auto mb-2 h-6 w-6 text-cyan-600" />
                <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.18em] text-cyan-600">
                  Premium mood
                </p>
                <p className="mt-1 font-dancing text-3xl font-bold text-rose-700">
                  Glow
                </p>
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

        .special-vault-stage { perspective: 1200px; }
        .special-core {
          transform-style: preserve-3d;
          animation: specialCoreFloat 6s ease-in-out infinite;
        }

        .special-sweep { animation: specialSweep 4.8s ease-in-out infinite; }
        .special-sweep-delay { animation: specialSweep 5.4s ease-in-out infinite 0.8s; }

        @keyframes specialCoreFloat {
          0%, 100% { transform: rotateX(8deg) rotateY(-9deg) translateY(0); }
          50% { transform: rotateX(2deg) rotateY(8deg) translateY(-10px); }
        }

        @keyframes specialSweep {
          0%, 100% { opacity: 0.28; transform: translateY(0) scaleX(0.72); }
          50% { opacity: 0.9; transform: translateY(14px) scaleX(1); }
        }

        @media (max-width: 640px) {
          .special-core {
            animation: specialCoreMobile 5.8s ease-in-out infinite;
          }
        }

        @keyframes specialCoreMobile {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default SpecialMomentsTab;
