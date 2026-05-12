'use client';

import { Crown, Flame, Gift as GiftIcon, Heart, Music, Sparkles, Star, Stars, Ticket, Video } from 'lucide-react';

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

const equalizerBars = [44, 68, 36, 82, 52, 74, 46, 88, 58, 72, 40, 64];

const PremiumCelebrationTab = ({ daysAlive = 0, onNightCelebration, onSpecialSurprise }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] px-3 py-4 sm:px-4 sm:py-5">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,247,237,0.74),rgba(255,228,230,0.56)_36%,rgba(224,242,254,0.54)_72%,rgba(245,243,255,0.7))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.065] celebration-grid" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 26 }, (_, index) => (
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
              opacity: 0.48,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <section className="party-console relative grid w-full overflow-hidden rounded-[2rem] border border-white/80 bg-white/72 shadow-[0_28px_84px_rgba(124,58,237,0.16)] backdrop-blur-xl lg:grid-cols-[1fr_0.86fr]">
          <div className="relative overflow-hidden px-4 py-7 text-center sm:px-6 lg:text-left">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-400 via-violet-500 to-cyan-400" />
            <div className="absolute -left-14 top-10 h-44 w-44 rounded-full border border-rose-200/70 celebration-orbit" />
            <div className="absolute -left-5 top-20 h-28 w-28 rounded-full border border-cyan-200/80 celebration-orbit-reverse" />

            <div className="relative mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[1.7rem] border-4 border-white bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 text-white shadow-[0_18px_42px_rgba(225,29,72,0.36)]">
              <Crown className="h-10 w-10" />
              <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-amber-100" />
            </div>

            <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-rose-400">
              Party Control Deck
            </p>
            <h2 className="mx-auto mt-2 max-w-lg font-dancing text-4xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-violet-600 to-cyan-600 sm:text-5xl lg:mx-0">
              You are the whole celebration.
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-nunito text-sm font-bold leading-7 text-pink-800/76 sm:text-base lg:mx-0">
              A brighter finale with a party deck, cinematic video frame, fireworks,
              blessings, and a little sound-wave stage built just for this moment.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onNightCelebration}
                className="birthday-action-dark group inline-flex min-h-16 items-center justify-center gap-3 rounded-2xl px-5 font-nunito text-xs font-extrabold uppercase tracking-[0.16em] transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                Night Fireworks
              </button>

              <button
                type="button"
                onClick={onSpecialSurprise}
                className="birthday-action-primary group inline-flex min-h-16 items-center justify-center gap-3 rounded-2xl px-5 font-nunito text-xs font-extrabold uppercase tracking-[0.16em] transition-all duration-300"
              >
                <Video className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                Special Video
              </button>
            </div>
          </div>

          <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden border-t border-pink-100/80 bg-gradient-to-br from-slate-950 via-violet-950 to-rose-950 p-5 text-white lg:border-l lg:border-t-0">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_35%,rgba(236,72,153,0.48),transparent_28%),radial-gradient(circle_at_25%_78%,rgba(34,211,238,0.32),transparent_26%)]" />
            <div className="party-disc relative flex h-44 w-44 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_80px_rgba(236,72,153,0.32)] backdrop-blur">
              <div className="absolute h-[78%] w-[78%] rounded-full border border-white/15" />
              <div className="absolute h-[50%] w-[50%] rounded-full border border-white/15" />
              <Music className="relative h-16 w-16 text-white" />
            </div>
            <div className="absolute bottom-7 left-1/2 flex h-24 w-[82%] -translate-x-1/2 items-end justify-center gap-2">
              {equalizerBars.map((height, index) => (
                <span
                  key={index}
                  className="party-bar w-2 rounded-full bg-gradient-to-t from-cyan-300 via-pink-300 to-amber-200"
                  style={{ height: `${height}%`, animationDelay: `${index * 0.08}s` }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="grid w-full max-w-5xl mx-auto grid-cols-1 gap-3 sm:grid-cols-3">
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
          <div className="celebration-metric rounded-2xl border border-cyan-100 bg-white/78 px-4 py-5 text-center shadow-sm backdrop-blur">
            <Ticket className="mx-auto mb-3 h-7 w-7 text-cyan-600" />
            <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.24em] text-cyan-600">
              Secret pass
            </p>
            <p className="mt-2 font-dancing text-4xl font-bold leading-none text-rose-600">
              VIP
            </p>
          </div>
          <div className="celebration-metric rounded-2xl border border-amber-100 bg-white/78 px-4 py-5 text-center shadow-sm backdrop-blur">
            <Heart className="mx-auto mb-3 h-7 w-7 text-amber-500" fill="currentColor" />
            <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.24em] text-amber-500">
              Love level
            </p>
            <p className="mt-2 font-dancing text-4xl font-bold leading-none text-rose-600">
              Max
            </p>
          </div>
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

          <div className="grid w-full max-w-5xl mx-auto grid-cols-2 gap-3 sm:grid-cols-3">
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

        <section className="grid w-full max-w-5xl mx-auto grid-cols-1 gap-3 sm:grid-cols-2">
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
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900&display=swap');

        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-nunito { font-family: 'Nunito', sans-serif; }

        .celebration-grid {
          background-image:
            linear-gradient(rgba(225, 29, 72, 0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8, 145, 178, 0.30) 1px, transparent 1px);
          background-size: 34px 34px;
        }

        .party-console,
        .celebration-metric,
        .quality-tile,
        .blessing-card {
          transform-style: preserve-3d;
        }

        .party-console {
          animation: partyConsole 6.5s ease-in-out infinite;
        }

        .party-disc {
          animation: partyDisc 8s linear infinite;
        }

        .party-bar {
          animation: partyBar 1.3s ease-in-out infinite;
          transform-origin: bottom;
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

        @keyframes partyConsole {
          0%, 100% { transform: rotateX(0deg) translateY(0); }
          50% { transform: rotateX(1.6deg) translateY(-6px); }
        }

        @keyframes partyDisc {
          to { transform: rotate(360deg); }
        }

        @keyframes partyBar {
          0%, 100% { transform: scaleY(0.54); opacity: 0.62; }
          50% { transform: scaleY(1); opacity: 1; }
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
