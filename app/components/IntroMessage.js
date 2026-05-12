'use client';

import { ArrowRight, Crown, Heart, Mail, Sparkles, Stars } from 'lucide-react';

const introParticles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: 4 + ((index * 29) % 92),
  top: 5 + ((index * 17) % 86),
  size: 4 + (index % 5) * 2,
  delay: (index % 10) * 0.22,
  duration: 5.5 + (index % 8) * 0.42,
  color: ['#fb7185', '#f9a8d4', '#fbbf24', '#a78bfa', '#67e8f9'][index % 5],
}));

const introMoments = [
  { icon: Mail, label: 'Note', text: 'A quiet first page' },
  { icon: Heart, label: 'Love', text: 'A soft promise' },
  { icon: Sparkles, label: 'Magic', text: 'A little surprise' },
];

const IntroMessage = ({ onComplete }) => {
  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[#fff7f7] text-rose-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(251,113,133,0.20),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(251,191,36,0.18),transparent_28%),radial-gradient(circle_at_78%_82%,rgba(103,232,249,0.15),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,228,230,0.52))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.075] intro-paper" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/80 to-transparent" />

      {introParticles.map((particle) => (
        <span
          key={particle.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animation: `introDrift ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
            opacity: 0.44,
          }}
        />
      ))}

      <section className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-6xl items-center gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[0.98fr_1.02fr] lg:px-8">
        <div className="order-2 flex justify-center lg:order-1">
          <div className="intro-perspective relative w-full max-w-md sm:max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-rose-200/48 via-amber-100/40 to-cyan-100/34 blur-2xl" />
            <div className="absolute left-4 top-8 h-[82%] w-[88%] rotate-[-7deg] rounded-[1.75rem] border border-rose-200 bg-rose-100/48 shadow-xl" />
            <div className="absolute right-2 top-12 h-[80%] w-[86%] rotate-[6deg] rounded-[1.75rem] border border-amber-200 bg-amber-100/45 shadow-xl" />

            <div className="intro-tilt relative overflow-hidden rounded-[2rem] border-2 border-pink-100 bg-white shadow-[0_32px_90px_rgba(225,29,72,0.22)]">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300" />
              <div className="absolute -right-12 top-12 h-36 w-36 rounded-full border border-rose-200/60" />
              <div className="absolute -right-7 top-17 h-24 w-24 rounded-full border border-amber-200/70" />

              <div className="relative p-5 sm:p-7">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.32em] text-rose-400">
                      Before the seal
                    </p>
                    <p className="mt-2 font-dancing text-3xl font-bold leading-none text-rose-700 sm:text-4xl">
                      A little hello
                    </p>
                  </div>

                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 text-white shadow-[0_16px_34px_rgba(225,29,72,0.36)]">
                    <Heart className="h-8 w-8" fill="currentColor" />
                    <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-amber-100" />
                  </div>
                </div>

                <div className="relative mx-auto mb-7 flex aspect-[4/3] w-full max-w-sm items-center justify-center">
                  <div className="absolute inset-4 rounded-[1.5rem] border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-amber-50 shadow-inner" />
                  <div className="absolute h-44 w-44 rounded-full border border-dashed border-rose-200 intro-orbit sm:h-52 sm:w-52" />
                  <div className="absolute h-28 w-28 rounded-full border border-amber-200 intro-orbit-reverse sm:h-32 sm:w-32" />

                  <div className="intro-letter relative flex h-36 w-56 items-center justify-center rounded-2xl border-2 border-pink-100 bg-white shadow-[0_24px_60px_rgba(225,29,72,0.22)] sm:h-40 sm:w-64">
                    <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300" />
                    <div className="absolute left-0 top-0 h-1/2 w-full origin-top rounded-t-2xl border-b border-pink-100 bg-gradient-to-b from-white via-rose-50 to-pink-100" />
                    <div className="absolute bottom-0 left-0 h-1/2 w-full rounded-b-2xl border-t border-pink-100 bg-gradient-to-t from-white via-rose-50 to-pink-100" />
                    <div className="absolute right-4 top-4 flex h-10 w-9 rotate-6 items-center justify-center rounded-sm border border-rose-300 bg-rose-100 text-rose-500">
                      <Heart className="h-5 w-5" fill="currentColor" />
                    </div>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-[0_12px_28px_rgba(225,29,72,0.38)]">
                      <Mail className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {introMoments.map(({ icon: Icon, label, text }) => (
                    <div
                      key={label}
                      className="min-h-24 rounded-2xl border border-pink-100 bg-white/78 p-3 text-center shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                    >
                      <Icon className="mx-auto mb-2 h-5 w-5 text-rose-500" />
                      <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose-500">
                        {label}
                      </p>
                      <p className="mt-1 font-nunito text-[11px] font-semibold leading-4 text-pink-700/70">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 text-center lg:order-2 lg:text-left">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-rose-200 bg-white/82 px-4 py-2 font-nunito text-[11px] font-extrabold uppercase tracking-[0.26em] text-rose-500 shadow-sm backdrop-blur">
            <Crown className="h-4 w-4 text-amber-500" />
            <span>Birthday Prelude</span>
          </div>

          <h1 className="mx-auto max-w-3xl font-dancing text-5xl font-bold leading-[0.96] text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 drop-shadow-sm sm:text-6xl md:text-7xl lg:mx-0">
            Happy Birthday, beautiful.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-nunito text-base font-semibold leading-8 text-pink-800/80 sm:text-lg lg:mx-0">
            Before the sealed letter opens, this moment gives the whole
            surprise a softer beginning: polished, warm, and made to feel
            personal from the first tap.
          </p>

          <div className="mx-auto mt-7 flex max-w-xl items-center justify-center gap-3 lg:mx-0 lg:justify-start">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-rose-300 lg:max-w-28" />
            <Stars className="h-5 w-5 text-amber-400" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-rose-300 to-rose-300 lg:max-w-28" />
          </div>

          <div className="mx-auto mt-7 grid max-w-lg grid-cols-3 gap-2.5 lg:mx-0">
            {['Warm', 'Private', 'Premium'].map((label, index) => (
              <div
                key={label}
                className="rounded-2xl border border-rose-100 bg-white/72 px-3 py-3 text-center shadow-sm backdrop-blur"
              >
                <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.22em] text-rose-400">
                  0{index + 1}
                </p>
                <p className="mt-1 font-nunito text-xs font-black uppercase tracking-[0.15em] text-rose-700">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onComplete}
            className="birthday-action-primary group mt-8 inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-3 rounded-full px-7 py-4 font-nunito text-sm font-extrabold uppercase tracking-[0.19em] transition-all duration-300 active:translate-y-0 active:scale-95 sm:max-w-xs"
          >
            <span>Continue to the seal</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900&display=swap');

        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-nunito { font-family: 'Nunito', sans-serif; }

        .intro-paper {
          background-image:
            linear-gradient(rgba(225, 29, 72, 0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225, 29, 72, 0.34) 1px, transparent 1px);
          background-size: 38px 38px;
        }

        .intro-perspective { perspective: 1100px; }
        .intro-tilt {
          transform: rotateX(7deg) rotateY(-8deg);
          transform-style: preserve-3d;
          animation: introTilt 7s ease-in-out infinite;
        }

        .intro-letter {
          transform-style: preserve-3d;
          animation: introLetterFloat 5.5s ease-in-out infinite;
        }

        .intro-orbit { animation: introOrbit 12s linear infinite; }
        .intro-orbit-reverse { animation: introOrbit 10s linear infinite reverse; }

        @keyframes introDrift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(12px, -18px, 0) scale(1.18); }
        }

        @keyframes introTilt {
          0%, 100% { transform: rotateX(7deg) rotateY(-8deg) translateY(0); }
          50% { transform: rotateX(4deg) rotateY(6deg) translateY(-8px); }
        }

        @keyframes introLetterFloat {
          0%, 100% { transform: translateZ(36px) rotateX(0deg) translateY(0); }
          50% { transform: translateZ(54px) rotateX(5deg) translateY(-10px); }
        }

        @keyframes introOrbit {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .intro-tilt {
            transform: none;
            animation: introMobileFloat 6s ease-in-out infinite;
          }
        }

        @keyframes introMobileFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </main>
  );
};

export default IntroMessage;
