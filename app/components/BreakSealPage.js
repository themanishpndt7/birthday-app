'use client';

import { ArrowRight, Crown, Heart, Mail, Sparkles, Stars } from 'lucide-react';

const sealSteps = [
  { label: 'Prelude', value: 'Soft start' },
  { label: 'Seal', value: 'Open the letter' },
  { label: 'Story', value: 'Premium moment' },
];

const sealDetails = [
  { icon: Mail, label: 'Private note' },
  { icon: Heart, label: 'Made with love' },
  { icon: Sparkles, label: 'Animated magic' },
];

const BreakSealPage = ({
  floatingHearts = [],
  floatingSparkles = [],
  isLandscape = false,
  isMobile = false,
  isTouch = false,
  mousePos = { x: 50, y: 50 },
  onMouseMove,
  onOpen,
}) => {
  return (
    <main
      className="relative flex min-h-[100dvh] w-full items-center overflow-x-hidden bg-[#fff7f7] text-rose-950"
      onMouseMove={onMouseMove}
      style={{
        paddingTop: 'max(16px, var(--safe-area-top))',
        paddingRight: 'max(16px, var(--safe-area-right))',
        paddingBottom: 'max(16px, var(--safe-area-bottom))',
        paddingLeft: 'max(16px, var(--safe-area-left))',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(251,113,133,0.22),transparent_31%),radial-gradient(circle_at_84%_22%,rgba(251,191,36,0.18),transparent_30%),radial-gradient(circle_at_80%_84%,rgba(103,232,249,0.14),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.76),rgba(255,228,230,0.44))]" />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 560px at ${mousePos.x}% ${mousePos.y}%, rgba(255,228,230,0.78), transparent 42%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.075] seal-paper" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingHearts.map((heart) => (
          <Heart
            key={heart.id}
            className="absolute text-rose-300/45"
            fill="currentColor"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              width: `${Math.max(14, heart.fontSize * 0.72)}px`,
              height: `${Math.max(14, heart.fontSize * 0.72)}px`,
              animation: `sealParticle ${heart.duration}s ease-in-out infinite`,
              animationDelay: `${heart.delay}s`,
            }}
          />
        ))}

        {floatingSparkles.map((sparkle) => (
          <Sparkles
            key={sparkle.id}
            className="absolute text-amber-300/55"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: `${Math.max(12, sparkle.fontSize * 0.72)}px`,
              height: `${Math.max(12, sparkle.fontSize * 0.72)}px`,
              animation: `sealParticle ${sparkle.duration}s ease-in-out infinite`,
              animationDelay: `${sparkle.delay}s`,
            }}
          />
        ))}
      </div>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 py-4 sm:py-6 lg:grid-cols-[0.94fr_1.06fr] lg:gap-12">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-rose-200 bg-white/82 px-4 py-2 font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-rose-500 shadow-sm backdrop-blur">
            <Crown className="h-4 w-4 text-amber-500" />
            <span>Private Birthday Seal</span>
          </div>

          <h1 className="mx-auto max-w-3xl font-dancing text-5xl font-bold leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 drop-shadow-sm sm:text-6xl md:text-7xl lg:mx-0">
            A letter waiting only for you.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-nunito text-base font-semibold leading-8 text-pink-800/78 sm:text-lg lg:mx-0">
            The seal is the first little ceremony. Hover, tap, and let the
            letter lift open with a premium 3D moment before the experience
            begins.
          </p>

          <div className="mx-auto mt-7 grid max-w-xl grid-cols-3 gap-2.5 sm:gap-3 lg:mx-0">
            {sealSteps.map((step, index) => (
              <div
                key={step.label}
                className="seal-step min-h-20 rounded-2xl border border-rose-100 bg-white/76 px-3 py-4 text-center shadow-sm backdrop-blur"
              >
                <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.24em] text-rose-400">
                  0{index + 1}
                </p>
                <p className="mt-2 font-nunito text-xs font-black uppercase tracking-[0.16em] text-rose-700">
                  {step.label}
                </p>
                <p className="mt-1 font-nunito text-[11px] font-semibold leading-4 text-pink-700/65">
                  {step.value}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpen}
            className="birthday-action-primary group mt-8 inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-3 rounded-full px-7 py-4 font-nunito text-sm font-extrabold uppercase tracking-[0.19em] transition-all duration-300 active:translate-y-0 active:scale-95 sm:max-w-xs"
          >
            <Heart className="h-5 w-5" fill="currentColor" />
            <span>Break Seal</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <p className="mx-auto mt-5 max-w-md font-nunito text-xs font-bold uppercase tracking-[0.22em] text-rose-400/80 lg:mx-0">
            {isTouch || isMobile ? 'Tap the wax seal to continue' : 'Hover the letter, then break the seal'}
          </p>

          {isLandscape && (
            <p className="mx-auto mt-2 max-w-md font-nunito text-[11px] font-semibold text-pink-500/70 lg:mx-0">
              Landscape mode keeps the seal compact so the button stays easy to reach.
            </p>
          )}
        </div>

        <div className="order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-lg">
          <div className="seal-scene relative aspect-[4/3] w-full">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-rose-200/42 via-amber-100/45 to-cyan-100/30 blur-2xl" />
            <div className="absolute inset-x-8 top-8 h-[82%] rotate-[-7deg] rounded-[2rem] border border-rose-200 bg-rose-100/55 shadow-xl" />
            <div className="absolute inset-x-8 top-10 h-[82%] rotate-[6deg] rounded-[2rem] border border-amber-200 bg-amber-100/45 shadow-xl" />

            <button
              type="button"
              onClick={onOpen}
              className="seal-envelope group absolute inset-0 flex cursor-pointer items-center justify-center rounded-[2rem] border-2 border-pink-100 bg-white shadow-[0_34px_100px_rgba(225,29,72,0.24)] transition-all duration-500 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_40px_112px_rgba(225,29,72,0.33)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
              aria-label="Open the birthday letter"
            >
              <div className="absolute inset-x-0 top-0 h-2 rounded-t-[2rem] bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300" />
              <div className="absolute left-6 top-6 text-left">
                <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.32em] text-rose-400">To</p>
                <p className="mt-1 font-dancing text-2xl font-bold leading-none text-rose-600">My Love</p>
              </div>

              <div className="absolute right-7 top-6 flex h-14 w-12 rotate-6 items-center justify-center rounded-sm border border-rose-300 bg-gradient-to-br from-rose-200 to-pink-200 text-rose-600 shadow-sm transition-transform duration-500 group-hover:rotate-12">
                <Heart className="h-6 w-6" fill="currentColor" />
              </div>

              <div className="absolute inset-x-0 top-[29%] h-[39%] bg-gradient-to-b from-rose-50 via-white to-pink-50 transition-transform duration-700 group-hover:-translate-y-6">
                <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
                <p className="absolute inset-x-8 top-8 text-center font-nunito text-[10px] font-extrabold uppercase tracking-[0.34em] text-rose-300">
                  Birthday letter
                </p>
              </div>

              <div className="seal-flap absolute left-0 top-0 h-[44%] w-full origin-top rounded-t-[2rem] border-b-2 border-pink-100 bg-gradient-to-b from-white via-rose-50 to-pink-100 transition-transform duration-700 group-hover:-rotate-6 group-hover:shadow-xl" />
              <div className="absolute bottom-0 left-0 h-[44%] w-full rounded-b-[2rem] border-t-2 border-pink-100 bg-gradient-to-t from-white via-rose-50 to-pink-100" />

              <div className="absolute bottom-7 right-7 text-right">
                <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-pink-400">From</p>
                <p className="mt-1 font-dancing text-xl font-bold leading-none text-rose-500">Your Heart</p>
              </div>

              <div className="seal-orbit absolute left-1/2 top-1/2 z-20 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-rose-200/80" />
              <div className="seal-orbit-reverse absolute left-1/2 top-1/2 z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/80" />

              <div className="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <div className="absolute h-32 w-32 rounded-full bg-rose-500/20 blur-2xl" />
                <div className="seal-wax relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-rose-300 bg-gradient-to-br from-rose-500 via-rose-600 to-pink-700 text-white shadow-[0_18px_42px_rgba(225,29,72,0.52)] sm:h-28 sm:w-28">
                  <div className="absolute inset-3 rounded-full border border-white/20" />
                  <span className="seal-crack seal-crack-one" />
                  <span className="seal-crack seal-crack-two" />
                  <span className="seal-crack seal-crack-three" />
                  <Heart className="relative z-10 h-11 w-11 animate-heartbeat sm:h-12 sm:w-12" fill="currentColor" />
                  <span className="absolute -bottom-4 left-1/2 h-6 w-4 -translate-x-1/2 rounded-b-full bg-rose-700 shadow-md" />
                  <span className="absolute -bottom-2 left-7 h-4 w-2 rounded-b-full bg-rose-700/80" />
                  <span className="absolute -bottom-2 right-7 h-4 w-2 rounded-b-full bg-rose-700/80" />
                </div>
              </div>

              <div className="absolute bottom-7 left-6 flex gap-2">
                {sealDetails.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 bg-white/74 text-rose-500 shadow-sm backdrop-blur"
                    title={label}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                ))}
              </div>

              <Stars className="absolute left-9 top-1/2 h-5 w-5 text-amber-400 seal-star" />
              <Sparkles className="absolute right-11 bottom-24 h-5 w-5 text-pink-400 seal-star delay-200" />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900&display=swap');

        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-nunito { font-family: 'Nunito', sans-serif; }

        .seal-paper {
          background-image:
            linear-gradient(rgba(225, 29, 72, 0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225, 29, 72, 0.34) 1px, transparent 1px);
          background-size: 38px 38px;
        }

        .seal-scene { perspective: 1200px; }
        .seal-envelope {
          transform: rotateX(8deg) rotateY(8deg);
          transform-style: preserve-3d;
          animation: sealEnvelopeFloat 7s ease-in-out infinite;
        }

        .seal-flap { transform-style: preserve-3d; }
        .seal-wax { animation: sealWaxPulse 2.6s ease-in-out infinite; }
        .seal-crack {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 2px;
          height: 30px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.38);
          transform-origin: top;
          opacity: 0;
          transition: opacity 300ms ease, transform 500ms ease;
        }
        .group:hover .seal-crack { opacity: 1; }
        .seal-crack-one { transform: translate(-50%, -50%) rotate(24deg) translateY(14px); }
        .seal-crack-two { transform: translate(-50%, -50%) rotate(-42deg) translateY(11px); height: 24px; }
        .seal-crack-three { transform: translate(-50%, -50%) rotate(92deg) translateY(10px); height: 20px; }
        .seal-orbit { animation: sealOrbit 12s linear infinite; }
        .seal-orbit-reverse { animation: sealOrbit 10s linear infinite reverse; }
        .seal-star { animation: sealStar 2.8s ease-in-out infinite; }
        .seal-step { transition: transform 260ms ease, box-shadow 260ms ease; }
        .seal-step:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 34px rgba(225, 29, 72, 0.14);
        }

        @keyframes sealParticle {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(12px, -18px, 0) rotate(8deg); }
        }

        @keyframes sealEnvelopeFloat {
          0%, 100% { transform: rotateX(8deg) rotateY(8deg) translateY(0); }
          50% { transform: rotateX(5deg) rotateY(-7deg) translateY(-8px); }
        }

        @keyframes sealWaxPulse {
          0%, 100% { transform: translateZ(52px) scale(1); }
          50% { transform: translateZ(70px) scale(1.06); }
        }

        @keyframes sealOrbit {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes sealStar {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { transform: translateY(-8px) scale(1.15); opacity: 1; }
        }

        @media (max-width: 640px) {
          .seal-envelope {
            transform: none;
            animation: sealMobileFloat 6s ease-in-out infinite;
          }
        }

        @keyframes sealMobileFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </main>
  );
};

export default BreakSealPage;
