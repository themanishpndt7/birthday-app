'use client';

import { Crown, Flame, Gift as GiftIcon, Heart, Sparkles, Star, Stars, Ticket } from 'lucide-react';

const qualityTiles = [
  { icon: Heart, label: 'Amazing', tone: 'rose', text: 'You make ordinary days feel warm.' },
  { icon: Sparkles, label: 'Radiant', tone: 'pink', text: 'Your presence changes the whole room.' },
  { icon: Crown, label: 'Precious', tone: 'amber', text: 'You deserve the softest kind of joy.' },
  { icon: Stars, label: 'Stellar', tone: 'violet', text: 'Your light keeps showing up everywhere.' },
  { icon: Star, label: 'Beautiful', tone: 'cyan', text: 'A heart this lovely deserves celebrating.' },
  { icon: Flame, label: 'Unreal', tone: 'orange', text: 'Every year with you feels brighter.' },
];

const blessingCards = [
  { title: 'Endless Joy', text: 'May your days feel lighter, kinder, and full of reasons to smile.', icon: Sparkles },
  { title: 'Deeply Loved', text: 'May you always feel how cherished and irreplaceable you are.', icon: Heart },
  { title: 'A Bright Year', text: 'May this year open like a beautiful chapter written for you.', icon: Star },
  { title: 'Sweet Surprises', text: 'May the tiny unexpected moments become your favorite memories.', icon: GiftIcon },
];

const PremiumCelebrationTab = ({ daysAlive = 0, onNightCelebration, onSpecialSurprise }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] px-3 py-4 sm:px-4 sm:py-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(251,113,133,0.17),transparent_30%),radial-gradient(circle_at_85%_22%,rgba(251,191,36,0.16),transparent_28%),radial-gradient(circle_at_30%_90%,rgba(103,232,249,0.14),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.065] celebration-grid" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${5 + ((index * 31) % 90)}%`,
              top: `${4 + ((index * 19) % 88)}%`,
              width: `${5 + (index % 5) * 2}px`,
              height: `${5 + (index % 5) * 2}px`,
              background: ['#fb7185', '#f9a8d4', '#fbbf24', '#67e8f9', '#a78bfa'][index % 5],
              animation: `celebrationFloat ${5.2 + (index % 6) * 0.4}s ease-in-out infinite`,
              animationDelay: `${(index % 7) * 0.22}s`,
              boxShadow: '0 0 18px currentColor',
              opacity: 0.45,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <section className="celebration-hero relative w-full overflow-hidden rounded-[2rem] border border-rose-100 bg-white/76 px-4 py-7 text-center shadow-[0_24px_70px_rgba(225,29,72,0.18)] backdrop-blur sm:px-6">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300" />
          <div className="absolute -right-16 top-12 h-44 w-44 rounded-full border border-rose-200/70 celebration-orbit" />
          <div className="absolute -right-7 top-20 h-28 w-28 rounded-full border border-amber-200/80 celebration-orbit-reverse" />

          <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 text-white shadow-[0_18px_42px_rgba(225,29,72,0.36)]">
            <Crown className="h-10 w-10" />
            <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-amber-100" />
          </div>

          <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-rose-400">
            Celebration Mode
          </p>
          <h2 className="mx-auto mt-2 max-w-md font-dancing text-4xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 sm:text-5xl">
            You are the whole celebration.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-nunito text-sm font-bold leading-7 text-pink-800/76 sm:text-base">
            A premium finale with movement, wishes, fireworks, and one more
            little surprise waiting for the perfect tap.
          </p>
        </section>

        <section className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="celebration-metric rounded-2xl border border-rose-100 bg-white/78 px-4 py-5 text-center shadow-sm backdrop-blur">
            <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.24em] text-rose-400">
              Blessed world
            </p>
            <p className="mt-2 font-dancing text-5xl font-bold leading-none text-rose-600">
              {daysAlive}
            </p>
            <p className="mt-2 font-nunito text-[11px] font-extrabold uppercase tracking-[0.18em] text-pink-500">
              beautiful days
            </p>
          </div>

          <button
            type="button"
            onClick={onNightCelebration}
            className="celebration-action group rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-600 px-4 py-5 text-white shadow-[0_18px_42px_rgba(124,58,237,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(124,58,237,0.38)]"
          >
            <Sparkles className="mx-auto mb-3 h-7 w-7 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="block font-dancing text-2xl font-bold leading-none">Night Fireworks</span>
            <span className="mt-2 block font-nunito text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/78">
              Launch celebration
            </span>
          </button>

          <button
            type="button"
            onClick={onSpecialSurprise}
            className="celebration-action group rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-700 px-4 py-5 text-white shadow-[0_18px_42px_rgba(37,99,235,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(37,99,235,0.35)]"
          >
            <Ticket className="mx-auto mb-3 h-7 w-7 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            <span className="block font-dancing text-2xl font-bold leading-none">Special Video</span>
            <span className="mt-2 block font-nunito text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/78">
              Open surprise
            </span>
          </button>
        </section>

        <section className="w-full">
          <div className="mb-4 text-center">
            <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-rose-400">
              Premium qualities
            </p>
            <h3 className="mt-1 font-dancing text-3xl font-bold text-rose-700">
              Everything worth celebrating
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {qualityTiles.map(({ icon: Icon, label, text, tone }, index) => (
              <article
                key={label}
                className={`quality-tile quality-${tone} min-h-32 rounded-2xl border bg-white/78 p-4 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <Icon className="mx-auto mb-3 h-6 w-6" fill={label === 'Amazing' ? 'currentColor' : 'none'} />
                <p className="font-nunito text-xs font-black uppercase tracking-[0.16em]">
                  {label}
                </p>
                <p className="mt-2 font-nunito text-[11px] font-semibold leading-5 opacity-75">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {blessingCards.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="blessing-card rounded-2xl border border-rose-100 bg-white/78 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(225,29,72,0.14)]"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-[0_10px_24px_rgba(225,29,72,0.28)]">
                  <Icon className="h-5 w-5" fill={title === 'Deeply Loved' ? 'currentColor' : 'none'} />
                </span>
                <p className="font-dancing text-2xl font-bold leading-none text-rose-700">
                  {title}
                </p>
              </div>
              <p className="font-nunito text-sm font-semibold leading-6 text-pink-800/76">
                {text}
              </p>
            </article>
          ))}
        </section>

        <section className="relative w-full overflow-hidden rounded-[2rem] border border-rose-200 bg-gradient-to-br from-rose-100/70 via-white/80 to-amber-50/70 px-5 py-6 text-center shadow-[0_20px_54px_rgba(225,29,72,0.16)]">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          <Heart className="mx-auto mb-3 h-8 w-8 text-rose-500 animate-heartbeat" fill="currentColor" />
          <h3 className="font-dancing text-3xl font-bold text-rose-700">
            Happy Birthday
          </h3>
          <p className="mx-auto mt-3 max-w-md font-nunito text-sm font-bold leading-7 text-pink-800/78">
            You are loved more than words can hold. Today is yours, and every
            part of this little world was built to remind you of that.
          </p>
        </section>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900&display=swap');

        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-nunito { font-family: 'Nunito', sans-serif; }

        .celebration-grid {
          background-image:
            linear-gradient(rgba(225, 29, 72, 0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225, 29, 72, 0.30) 1px, transparent 1px);
          background-size: 34px 34px;
        }

        .celebration-hero,
        .celebration-metric,
        .celebration-action,
        .quality-tile,
        .blessing-card {
          transform-style: preserve-3d;
        }

        .celebration-hero {
          animation: celebrationHero 6.5s ease-in-out infinite;
        }

        .celebration-orbit { animation: celebrationOrbit 13s linear infinite; }
        .celebration-orbit-reverse { animation: celebrationOrbit 10s linear infinite reverse; }

        .quality-tile {
          animation: qualityRise 0.7s ease both;
        }

        .quality-rose { border-color: #fecdd3; color: #be123c; }
        .quality-pink { border-color: #fbcfe8; color: #be185d; }
        .quality-amber { border-color: #fde68a; color: #b45309; }
        .quality-violet { border-color: #ddd6fe; color: #6d28d9; }
        .quality-cyan { border-color: #a5f3fc; color: #0e7490; }
        .quality-orange { border-color: #fed7aa; color: #c2410c; }

        @keyframes celebrationFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(12px, -18px, 0) scale(1.18); }
        }

        @keyframes celebrationHero {
          0%, 100% { transform: rotateX(0deg) translateY(0); }
          50% { transform: rotateX(2deg) translateY(-6px); }
        }

        @keyframes celebrationOrbit {
          to { transform: rotate(360deg); }
        }

        @keyframes qualityRise {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 420px) {
          .quality-tile { min-height: 9rem; padding: 0.875rem; }
        }
      `}</style>
    </div>
  );
};

export default PremiumCelebrationTab;
