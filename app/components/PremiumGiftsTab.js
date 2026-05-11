'use client';

import { ChevronLeft, ChevronRight, Gift as GiftIcon, Heart, Infinity, Map, Sparkles, Star, Ticket } from 'lucide-react';

const giftCards = [
  {
    title: 'Forever Promise',
    subtitle: 'A promise wrapped in rose-gold light',
    message: 'You are my favorite reason to believe in forever.',
    icon: Heart,
    colors: 'from-rose-500 via-pink-500 to-amber-400',
  },
  {
    title: 'Memory Flowers',
    subtitle: 'A little garden of everything we keep',
    message: 'Real flowers fade, but these moments keep blooming.',
    icon: Sparkles,
    colors: 'from-pink-500 via-fuchsia-500 to-violet-500',
  },
  {
    title: 'Love Coupons',
    subtitle: 'Valid for endless smiles and soft days',
    message: 'Redeem whenever you need attention, care, or a tiny adventure.',
    icon: Ticket,
    colors: 'from-amber-400 via-rose-500 to-pink-500',
  },
  {
    title: 'Truth Mirror',
    subtitle: 'A clear little reminder',
    message: 'You are not just special. You are my once-in-a-lifetime.',
    icon: Star,
    colors: 'from-cyan-500 via-blue-500 to-violet-600',
  },
  {
    title: 'Sweet Kisses',
    subtitle: 'A jar full of tiny happy things',
    message: 'Every sweet moment with you becomes something I want to keep.',
    icon: Heart,
    colors: 'from-orange-400 via-rose-500 to-pink-600',
  },
  {
    title: 'Adventure Map',
    subtitle: 'Places, plans, and someday stories',
    message: 'There are so many little worlds I still want to see with you.',
    icon: Map,
    colors: 'from-sky-500 via-cyan-500 to-emerald-400',
  },
  {
    title: 'Endless Future',
    subtitle: 'A tiny preview of all our tomorrows',
    message: 'Forever with you is not a dream. It is the direction.',
    icon: Infinity,
    colors: 'from-violet-500 via-fuchsia-500 to-rose-500',
  },
];

const PremiumGiftsTab = ({
  currentGiftPage,
  giftsOpened,
  giftParticles = [],
  isAnimating,
  onGiftOpen,
  onNext,
  onPrevious,
}) => {
  const gift = giftCards[currentGiftPage] || giftCards[0];
  const Icon = gift.icon;
  const isOpened = giftsOpened[currentGiftPage];

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] px-3 py-4 sm:px-5 sm:py-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(251,113,133,0.16),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(251,191,36,0.16),transparent_28%),radial-gradient(circle_at_26%_88%,rgba(103,232,249,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] gift-grid" />
      {giftParticles.map((particle) => (
        <span
          key={particle.id}
          className="gift-pop-particle pointer-events-none absolute left-1/2 top-[43%] z-20 h-2 w-2 rounded-full"
          style={{
            '--tx': `${particle.tx}px`,
            '--ty': `${particle.ty}px`,
            backgroundColor: particle.color,
            color: particle.color,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-5">
        <div className="text-center">
          <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-rose-400">
            Premium Gift Room
          </p>
          <h2 className="mt-1 font-dancing text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 sm:text-5xl">
            Seven little surprises
          </h2>
          <p className="mx-auto mt-3 max-w-md font-nunito text-sm font-bold leading-7 text-pink-800/72">
            Swipe through each gift, open it, and let the message reveal with a
            soft 3D motion.
          </p>
        </div>

        <section className="gift-stage relative flex min-h-[26rem] w-full items-center justify-center sm:min-h-[28rem]">
          <div className="absolute left-3 top-8 h-28 w-28 rounded-full bg-rose-200/35 blur-2xl gift-float" />
          <div className="absolute bottom-8 right-2 h-32 w-32 rounded-full bg-amber-200/35 blur-2xl gift-float-delay" />

          <button
            type="button"
            onClick={() => !isOpened && onGiftOpen(currentGiftPage)}
            className="gift-box group relative w-full max-w-md rounded-[2rem] border border-rose-100 bg-white/82 p-5 text-center shadow-[0_26px_72px_rgba(225,29,72,0.18)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_34px_92px_rgba(225,29,72,0.25)]"
            aria-label={isOpened ? `${gift.title} opened` : `Open ${gift.title}`}
          >
            <div className={`absolute inset-x-0 top-0 h-2 rounded-t-[2rem] bg-gradient-to-r ${gift.colors}`} />
            <div className="absolute -right-10 top-12 h-32 w-32 rounded-full border border-rose-200/70 gift-orbit" />
            <div className="absolute -right-3 top-20 h-20 w-20 rounded-full border border-amber-200/80 gift-orbit-reverse" />

            <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 text-white shadow-[0_18px_42px_rgba(225,29,72,0.34)]">
              <GiftIcon className={`absolute h-12 w-12 transition-all duration-500 ${isOpened ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} />
              <Icon className={`absolute h-12 w-12 transition-all duration-500 ${isOpened ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} fill={gift.title.includes('Promise') || gift.title.includes('Kisses') ? 'currentColor' : 'none'} />
            </div>

            <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-rose-400">
              Gift {currentGiftPage + 1} of {giftCards.length}
            </p>
            <h3 className="mt-2 font-dancing text-4xl font-bold leading-none text-rose-700">
              {gift.title}
            </h3>
            <p className="mx-auto mt-3 max-w-xs font-nunito text-sm font-bold leading-6 text-pink-700/74">
              {gift.subtitle}
            </p>

            <div className={`mt-5 overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-amber-50 transition-all duration-500 ${isOpened ? 'max-h-52 p-5 opacity-100' : 'max-h-0 p-0 opacity-0'}`}>
              <Heart className="mx-auto mb-3 h-7 w-7 text-rose-500" fill="currentColor" />
              <p className="font-nunito text-sm font-bold leading-7 text-rose-800">
                {gift.message}
              </p>
            </div>

            {!isOpened && (
              <p className="mt-5 font-nunito text-xs font-extrabold uppercase tracking-[0.22em] text-rose-400">
                Tap to unwrap
              </p>
            )}
          </button>
        </section>

        <div className="w-full rounded-[1.5rem] border border-rose-100 bg-white/78 p-3 shadow-sm backdrop-blur">
          <div className="mb-3 flex items-center justify-center gap-2">
            {giftCards.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  if (index < currentGiftPage) {
                    Array.from({ length: currentGiftPage - index }).forEach(() => onPrevious());
                  }
                  if (index > currentGiftPage) {
                    Array.from({ length: index - currentGiftPage }).forEach(() => onNext());
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentGiftPage ? 'w-8 bg-rose-500' : giftsOpened[index] ? 'w-3 bg-amber-400' : 'w-3 bg-rose-100'}`}
                aria-label={`Go to gift ${index + 1}`}
              />
            ))}
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={currentGiftPage === 0 || isAnimating}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white px-3 font-nunito text-xs font-extrabold uppercase tracking-[0.16em] text-rose-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="rounded-2xl bg-rose-50 px-3 py-2 text-center">
              <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose-500">
                Gift
              </p>
              <p className="font-nunito text-xs font-black text-pink-600">
                {currentGiftPage + 1}/{giftCards.length}
              </p>
            </div>

            <button
              type="button"
              onClick={onNext}
              disabled={currentGiftPage === giftCards.length - 1 || isAnimating}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white px-3 font-nunito text-xs font-extrabold uppercase tracking-[0.16em] text-rose-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900&display=swap');

        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-nunito { font-family: 'Nunito', sans-serif; }

        .gift-grid {
          background-image:
            linear-gradient(rgba(225, 29, 72, 0.46) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225, 29, 72, 0.28) 1px, transparent 1px);
          background-size: 34px 34px;
        }

        .gift-stage { perspective: 1100px; }
        .gift-box {
          transform: rotateX(4deg) rotateY(-5deg);
          transform-style: preserve-3d;
          animation: giftBoxFloat 6.5s ease-in-out infinite;
        }

        .gift-orbit { animation: giftOrbit 13s linear infinite; }
        .gift-orbit-reverse { animation: giftOrbit 10s linear infinite reverse; }
        .gift-float { animation: giftGlow 5.5s ease-in-out infinite; }
        .gift-float-delay { animation: giftGlow 6s ease-in-out infinite 0.8s; }

        @keyframes giftBoxFloat {
          0%, 100% { transform: rotateX(4deg) rotateY(-5deg) translateY(0); }
          50% { transform: rotateX(2deg) rotateY(5deg) translateY(-8px); }
        }

        @keyframes giftOrbit {
          to { transform: rotate(360deg); }
        }

        @keyframes giftGlow {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.55; }
          50% { transform: translateY(-12px) scale(1.08); opacity: 0.9; }
        }

        .gift-pop-particle {
          animation: giftParticlePop 1.15s ease-out forwards;
          box-shadow: 0 0 18px currentColor;
        }

        @keyframes giftParticlePop {
          0% { transform: translate3d(0, 0, 0) scale(0.4); opacity: 0; }
          18% { opacity: 1; }
          100% { transform: translate3d(var(--tx), var(--ty), 0) scale(0); opacity: 0; }
        }

        @media (max-width: 640px) {
          .gift-box {
            transform: none;
            animation: giftMobileFloat 6s ease-in-out infinite;
          }
        }

        @keyframes giftMobileFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export default PremiumGiftsTab;
