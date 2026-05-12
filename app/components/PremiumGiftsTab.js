'use client';

import {
  ChevronLeft,
  ChevronRight,
  Crown,
  Flower2,
  Gift as GiftIcon,
  Heart,
  Infinity,
  Map,
  Sparkles,
  Star,
  Ticket,
} from 'lucide-react';

const burstPattern = [
  { x: -128, y: -46, delay: 0.02 },
  { x: -96, y: -86, delay: 0.08 },
  { x: -54, y: -116, delay: 0.14 },
  { x: -14, y: -92, delay: 0.2 },
  { x: 34, y: -126, delay: 0.1 },
  { x: 78, y: -86, delay: 0.18 },
  { x: 122, y: -48, delay: 0.05 },
  { x: -112, y: 4, delay: 0.16 },
  { x: 112, y: 2, delay: 0.22 },
  { x: -62, y: 32, delay: 0.28 },
  { x: 62, y: 30, delay: 0.24 },
  { x: 0, y: -142, delay: 0.3 },
];

const giftCards = [
  {
    kind: 'promise',
    title: 'Promise: Our Forever',
    prompt: 'Tap the ribbon to unwrap your promise',
    revealTitle: 'My Greatest Gift',
    message: 'The privilege of waking up knowing you are mine.',
    note: 'You are my whole world.',
    colors: 'from-rose-400 to-rose-600',
    ribbon: 'bg-amber-200 border-amber-300',
    accent: 'text-rose-500',
    revealBorder: 'border-pink-100',
    revealBg: 'from-white via-pink-50 to-white',
    BurstIcon: Heart,
  },
  {
    kind: 'flowers',
    title: 'Unfading Love & Memories',
    prompt: 'Tap to bloom your beautiful flowers',
    revealTitle: 'Eternal Flowers',
    message: 'Real flowers fade, but my love for you will bloom eternally and forever.',
    note: 'You are my eternal garden of love.',
    colors: 'from-pink-200 to-rose-200',
    accent: 'text-rose-500',
    revealBorder: 'border-pink-100',
    revealBg: 'from-white via-rose-50 to-white',
    BurstIcon: Flower2,
  },
  {
    kind: 'coupon',
    title: 'Infinite Coupon Booklet',
    prompt: 'Tap to reveal your infinite coupons',
    revealTitle: 'Love Coupon Valid For Life',
    message: 'Endless cuddles, late night talks, unconditional love, forever and always.',
    note: 'No expiry date ever.',
    colors: 'from-rose-300 to-pink-500',
    accent: 'text-rose-500',
    revealBorder: 'border-pink-100',
    revealBg: 'from-white via-rose-50 to-white',
    BurstIcon: Ticket,
  },
  {
    kind: 'mirror',
    title: 'The Honest Truth About You',
    prompt: 'Tap the glass to see the truth',
    revealTitle: 'My Crown Jewel',
    message: 'The greatest gift I have ever received in this lifetime is you.',
    note: 'My forever queen.',
    colors: 'from-pink-100 to-rose-50',
    accent: 'text-rose-500',
    revealBorder: 'border-rose-100',
    revealBg: 'from-white via-pink-50 to-white',
    BurstIcon: Crown,
  },
  {
    kind: 'kisses',
    title: 'Jar of Sweet Kisses',
    prompt: 'Tap to pop the cork and taste sweetness',
    revealTitle: 'A Jar of Kisses',
    message: "For the days when I cannot be right next to you, open this jar and feel how much I love you.",
    note: 'Every kiss is filled with endless affection.',
    colors: 'from-white/45 to-white/70',
    accent: 'text-rose-500',
    revealBorder: 'border-pink-100',
    revealBg: 'from-white via-pink-50 to-white',
    BurstIcon: Heart,
  },
  {
    kind: 'adventure',
    title: 'Adventure Awaits Us',
    prompt: 'Tap to open your adventure map',
    revealTitle: 'Forever Adventure',
    message: 'Every road ahead will be walked with you, hand in hand.',
    note: "Let's explore the world together.",
    colors: 'from-blue-400 to-cyan-500',
    ribbon: 'bg-white/70 border-white/90',
    accent: 'text-blue-500',
    revealBorder: 'border-blue-100',
    revealBg: 'from-white via-blue-50 to-white',
    BurstIcon: Map,
  },
  {
    kind: 'future',
    title: 'My Endless Future with You',
    prompt: 'Tap to reveal our eternal future',
    revealTitle: 'My Endless Future',
    message: 'This gift holds all the tomorrows I want to spend making you smile and building our forever story.',
    note: 'Forever with you starts now.',
    colors: 'from-fuchsia-400 to-purple-500',
    ribbon: 'bg-white/70 border-white/90',
    accent: 'text-fuchsia-500',
    revealBorder: 'border-fuchsia-100',
    revealBg: 'from-white via-fuchsia-50 to-white',
    BurstIcon: Infinity,
  },
];

const ParticleIcon = ({ type }) => {
  if (type === 'heart') return <Heart className="h-4 w-4" fill="currentColor" />;
  if (type === 'star') return <Star className="h-4 w-4" fill="currentColor" />;
  return <Sparkles className="h-4 w-4" fill="currentColor" />;
};

const CelebrationBurst = ({ gift, isOpened }) => {
  if (!isOpened) return null;

  const celebrationItems = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    angle: (i / 24) * Math.PI * 2,
    delay: (i % 8) * 0.05,
    duration: 1.2 + (i % 4) * 0.2,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
      {celebrationItems.map((item) => {
        const distance = 120 + (item.id % 3) * 30;
        const x = Math.cos(item.angle) * distance;
        const y = Math.sin(item.angle) * distance;
        const emoji = ['✨', '💝', '💖', '🎉', '⭐', '💫', '🌟', '💕'][item.id % 8];
        
        return (
          <div
            key={`celebration-${item.id}`}
            className="absolute text-2xl"
            style={{
              '--tx': `${x}px`,
              '--ty': `${y}px`,
              animation: `celebrationPop ${item.duration}s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {emoji}
          </div>
        );
      })}
    </div>
  );
};

const UnwrapBurst = ({ gift, isOpened }) => {
  if (!isOpened) return null;

  const BurstIcon = gift.BurstIcon;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      {burstPattern.map((point, index) => (
        <BurstIcon
          key={`${gift.kind}-${index}`}
          className={`old-burst absolute h-5 w-5 ${gift.accent}`}
          fill={gift.kind === 'flowers' || gift.kind === 'adventure' ? 'none' : 'currentColor'}
          style={{
            '--tx': `${point.x}px`,
            '--ty': `${point.y}px`,
            animationDelay: `${point.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const RevealCard = ({ gift, isOpened }) => (
  isOpened ? (
  <div className="fixed left-1/2 top-1/2 z-50 w-[min(20rem,90vw)] -translate-x-1/2 -translate-y-1/2 animate-gift-reveal pointer-events-auto">
    <div className={`relative rounded-3xl border-2 ${gift.revealBorder} bg-gradient-to-br ${gift.revealBg} px-6 pb-7 pt-9 text-center shadow-[0_25px_60px_rgba(225,29,72,0.24)]`}>
      <div className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-white to-pink-50 shadow-lg">
        <Heart className={`h-7 w-7 ${gift.accent}`} fill="currentColor" />
      </div>
      
      <div className="mb-2 flex justify-center gap-1">
        <Sparkles className={`h-4 w-4 ${gift.accent}`} />
        <Sparkles className={`h-4 w-4 ${gift.accent}`} />
        <Sparkles className={`h-4 w-4 ${gift.accent}`} />
      </div>
      
      <h3 className={`text-center font-dancing text-3xl font-bold ${gift.accent} leading-tight`}>
        {gift.revealTitle}
      </h3>
      
      <p className="mt-4 text-center font-nunito text-sm font-bold leading-7 text-pink-800/85">
        {gift.message}
      </p>
      
      <div className="mt-5 h-px w-12 mx-auto bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
      
      <p className="mt-4 text-center font-nunito text-xs font-bold italic text-rose-500/90">
        &ldquo;{gift.note}&rdquo;
      </p>
      
      <div className="mt-5 flex justify-center gap-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-rose-300 animate-pulse" style={{animationDelay: '0s'}} />
        <div className="h-1.5 w-1.5 rounded-full bg-pink-300 animate-pulse" style={{animationDelay: '0.2s'}} />
        <div className="h-1.5 w-1.5 rounded-full bg-rose-300 animate-pulse" style={{animationDelay: '0.4s'}} />
      </div>
    </div>
  </div>
  ) : null
);

const PresentBox = ({ gift, isOpened, Icon = GiftIcon }) => (
  <div className={`relative z-10 transition-all duration-700 ${isOpened ? 'translate-y-28 scale-75 opacity-65' : 'translate-y-0 group-hover:scale-110'}`}>
    <div className={`old-lid relative z-20 mx-auto h-10 w-36 rounded-sm border-2 bg-gradient-to-b ${gift.colors} shadow-lg transition-all duration-700 origin-bottom-right ${isOpened ? '-translate-y-24 translate-x-12 rotate-12 opacity-0' : ''}`}>
      <div className={`absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 border-x ${gift.ribbon}`} />
      <div className="absolute -top-6 left-1/2 flex -translate-x-1/2 items-end">
        <div className={`h-8 w-8 translate-x-1 rotate-45 rounded-[50%_50%_0_50%] border-[3px] ${gift.ribbon}`} />
        <div className={`h-8 w-8 -translate-x-1 -rotate-45 rounded-[50%_50%_50%_0] border-[3px] ${gift.ribbon}`} />
      </div>
    </div>

    <div className={`relative mx-auto h-24 w-32 overflow-hidden rounded-b-md border-x-2 border-b-2 bg-gradient-to-br ${gift.colors} shadow-xl transition-all duration-500 group-hover:shadow-2xl`}>
      <div className={`absolute left-1/2 h-full w-8 -translate-x-1/2 border-x shadow-inner ${gift.ribbon}`} />
      <Icon className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-white/86 drop-shadow" />
      {isOpened && <div className="absolute top-0 h-4 w-full rounded-t-full bg-black/10 blur-sm" />}
    </div>
  </div>
);

const FlowerJar = ({ isOpened }) => (
  <div className={`relative z-10 transition-all duration-700 ${isOpened ? 'translate-y-28 scale-75 opacity-80' : 'translate-y-0 group-hover:scale-110'}`}>
    <div className="relative h-44 w-36">
      <div className="absolute bottom-0 left-1/2 h-40 w-32 -translate-x-1/2 overflow-hidden rounded-b-2xl border-2 border-pink-300 bg-gradient-to-b from-pink-50/80 to-rose-100/80 shadow-xl backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent to-pink-200/45" />
        <div className="absolute bottom-0 left-1/2 flex h-3/4 -translate-x-1/2 gap-2">
          <div className="h-full w-1.5 -rotate-6 rounded-full bg-green-400 shadow-md" />
          <div className="h-full w-1.5 rounded-full bg-green-500 shadow-md" />
          <div className="h-full w-1.5 rotate-6 rounded-full bg-green-400 shadow-md" />
        </div>
      </div>
      <div className={`absolute left-1/2 top-4 z-20 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-white p-2 text-rose-500 shadow-md transition-all duration-500 ${isOpened ? 'scale-125' : 'group-hover:scale-125'}`}>
        <Flower2 className="h-9 w-9 animate-pulse" />
      </div>
    </div>
  </div>
);

const CouponBook = ({ isOpened }) => (
  <div className={`relative z-10 transition-all duration-700 ${isOpened ? 'translate-y-32 scale-75 opacity-70' : 'translate-y-0 group-hover:scale-105'}`}>
    <div className="relative flex h-28 w-44 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white bg-gradient-to-r from-rose-300 to-pink-500 text-white shadow-xl transition-all duration-500 group-hover:shadow-2xl">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      <div className="absolute left-4 top-0 h-full w-px bg-white/40" />
      <div className="absolute right-4 top-0 h-full w-px bg-white/40" />
      <Ticket className="relative z-10 h-12 w-12 drop-shadow" />
    </div>
  </div>
);

const TruthMirror = ({ isOpened }) => (
  <div className={`relative z-10 flex h-64 w-56 items-center justify-center overflow-hidden rounded-b-xl rounded-t-full border-4 border-rose-300 shadow-xl transition-all duration-700 ${isOpened ? 'bg-gradient-to-br from-pink-100 to-rose-50' : 'bg-white/45 backdrop-blur-md group-hover:scale-110 group-hover:shadow-2xl'}`}>
    <Crown className="absolute left-1/2 top-4 h-7 w-7 -translate-x-1/2 animate-bounce text-rose-500" />
    <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${isOpened ? 'opacity-0' : 'opacity-100'}`}>
      <Sparkles className="h-10 w-10 text-rose-400" />
    </div>
    <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isOpened ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'}`}>
      <Heart className="mb-4 h-12 w-12 animate-heartbeat text-rose-500" fill="currentColor" />
      <p className="font-dancing text-2xl font-bold text-rose-700">
        ...is you.
      </p>
    </div>
  </div>
);

const KissesJar = ({ isOpened }) => (
  <div className={`relative z-10 flex flex-col items-center transition-all duration-700 ${isOpened ? 'translate-y-28 scale-75 opacity-80' : 'translate-y-0 group-hover:scale-110'}`}>
    <div className={`mx-auto h-6 w-12 rounded-t-md border-b-2 border-amber-900 bg-amber-700/80 shadow-lg transition-all duration-700 origin-bottom ${isOpened ? '-translate-x-8 -translate-y-16 -rotate-45 opacity-0' : ''}`} />
    <div className="relative flex h-36 w-28 flex-col justify-end overflow-hidden rounded-3xl border-2 border-white/70 bg-gradient-to-b from-white/40 to-white/70 p-3 shadow-[inset_0_0_20px_rgba(255,255,255,0.8),0_10px_20px_rgba(251,113,133,0.2)] backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl">
      <div className="absolute left-2 top-2 h-20 w-5 rounded-full bg-white/50 blur-[2px]" />
      <div className={`flex flex-wrap-reverse justify-center gap-2 transition-opacity duration-700 ${isOpened ? 'opacity-20' : 'opacity-100'}`}>
        {Array.from({ length: 15 }).map((_, index) => (
          <Heart
            key={index}
            className="h-5 w-5 animate-pulse text-rose-500"
            fill="currentColor"
            style={{ animationDelay: `${index * 0.08}s` }}
          />
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-pink-200 bg-white/95 shadow-md">
        <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
      </div>
    </div>
  </div>
);

const GiftVisual = ({ gift, isOpened }) => {
  if (gift.kind === 'flowers') return <FlowerJar isOpened={isOpened} />;
  if (gift.kind === 'coupon') return <CouponBook isOpened={isOpened} />;
  if (gift.kind === 'mirror') return <TruthMirror isOpened={isOpened} />;
  if (gift.kind === 'kisses') return <KissesJar isOpened={isOpened} />;
  if (gift.kind === 'adventure') return <PresentBox gift={gift} isOpened={isOpened} Icon={Map} />;
  if (gift.kind === 'future') return <PresentBox gift={gift} isOpened={isOpened} Icon={Infinity} />;
  return <PresentBox gift={gift} isOpened={isOpened} Icon={GiftIcon} />;
};

const PremiumGiftsTab = ({
  currentGiftPage,
  giftsOpened,
  giftParticles = [],
  isAnimating,
  onGiftOpen,
  onNext,
  onPrevious,
  onShowAllGifts = () => {},
}) => {
  const gift = giftCards[currentGiftPage] || giftCards[0];
  const isOpened = Boolean(giftsOpened[currentGiftPage]);

  const goToIndex = (index) => {
    if (index === currentGiftPage || isAnimating) return;

    if (index < currentGiftPage) {
      Array.from({ length: currentGiftPage - index }).forEach(() => onPrevious());
      return;
    }

    Array.from({ length: index - currentGiftPage }).forEach(() => onNext());
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] px-3 py-4 sm:px-5 sm:py-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,247,237,0.72),rgba(255,228,230,0.52)_42%,rgba(219,234,254,0.46))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] old-gift-grid" />

      {giftParticles.map((particle) => (
        <div
          key={particle.id}
          className="gift-pop-particle pointer-events-none absolute left-1/2 top-[43%] z-40 text-rose-400"
          style={{
            '--tx': `${particle.tx}px`,
            '--ty': `${particle.ty}px`,
            color: particle.color,
            animationDelay: `${particle.delay}s`,
          }}
        >
          <ParticleIcon type={particle.type} />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-5">
        <div className="text-center">
          <p className="font-nunito text-[10px] font-extrabold uppercase tracking-[0.28em] text-rose-400">
            Gift {currentGiftPage + 1} of {giftCards.length}
          </p>
          <h2 className="mt-1 font-dancing text-3xl font-bold leading-tight text-rose-600 sm:text-5xl">
            {gift.title}
          </h2>
          {!isOpened && (
            <p className="mx-auto mt-3 max-w-md font-nunito text-sm font-bold leading-6 text-pink-600 animate-pulse">
              {gift.prompt}
            </p>
          )}
        </div>

        <section className="old-gift-stage relative flex min-h-[28rem] w-full items-center justify-center sm:min-h-[32rem]">
          <button
            type="button"
            onClick={() => !isOpened && onGiftOpen(currentGiftPage)}
            className="group relative flex min-h-[26rem] w-full items-center justify-center rounded-[1.75rem] border border-white/80 bg-white/34 px-3 pt-24 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_22px_55px_rgba(244,63,94,0.13)] backdrop-blur transition-all duration-500 hover:bg-white/45 sm:min-h-[30rem] sm:pt-28"
            aria-label={isOpened ? `${gift.title} opened` : `Open ${gift.title}`}
          >
            <RevealCard gift={gift} isOpened={isOpened} />
            <CelebrationBurst gift={gift} isOpened={isOpened} />
            <UnwrapBurst gift={gift} isOpened={isOpened} />
            <GiftVisual gift={gift} isOpened={isOpened} />
          </button>
        </section>

        <div className="w-full rounded-[1.5rem] border border-rose-100 bg-white/78 p-3 shadow-sm backdrop-blur">
          <div className="mb-3 flex items-center justify-center gap-2">
            {giftCards.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => goToIndex(index)}
                disabled={isAnimating}
                className={`h-2 rounded-full transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
                  index === currentGiftPage
                    ? 'w-8 bg-rose-500'
                    : giftsOpened[index]
                    ? 'w-3 bg-amber-400'
                    : 'w-3 bg-rose-100 hover:bg-rose-200'
                }`}
                aria-label={`Go to gift ${index + 1}`}
                aria-current={index === currentGiftPage ? 'step' : undefined}
              />
            ))}
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={currentGiftPage === 0 || isAnimating}
              aria-label="Previous gift"
            className="birthday-icon-button min-h-12 rounded-2xl px-3 transition-all duration-300"
          >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.7} />
            </button>

            <div className="min-w-[4.25rem] rounded-2xl bg-rose-50 px-3 py-2 text-center">
              <p className="font-dancing text-2xl font-bold leading-none text-rose-600">
                {currentGiftPage + 1}/{giftCards.length}
              </p>
            </div>

            <button
              type="button"
              onClick={onNext}
              disabled={currentGiftPage === giftCards.length - 1 || isAnimating}
              aria-label="Next gift"
            className="birthday-icon-button min-h-12 rounded-2xl px-3 transition-all duration-300"
          >
              <ChevronRight className="h-5 w-5" strokeWidth={2.7} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900&display=swap');

        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-nunito { font-family: 'Nunito', sans-serif; }

        .old-gift-grid {
          background-image:
            linear-gradient(rgba(225, 29, 72, 0.42) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225, 29, 72, 0.24) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .old-gift-stage {
          perspective: 1000px;
        }

        .old-lid {
          transform-style: preserve-3d;
        }

        .old-burst {
          animation: oldGiftBurst 1.15s ease-out forwards;
          opacity: 0;
          filter: drop-shadow(0 0 10px currentColor);
        }

        .animate-gift-reveal {
          animation: giftReveal 0.7s cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        .gift-pop-particle {
          animation: giftParticlePop 1.15s ease-out forwards;
          opacity: 0;
          filter: drop-shadow(0 0 12px currentColor);
        }

        @keyframes oldGiftBurst {
          0% { transform: translate3d(0, 0, 0) scale(0.4) rotate(0deg); opacity: 0; }
          18% { opacity: 1; }
          100% { transform: translate3d(var(--tx), var(--ty), 0) scale(0) rotate(180deg); opacity: 0; }
        }

        @keyframes giftReveal {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.88); filter: blur(6px); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0); }
        }

        @keyframes giftParticlePop {
          0% { transform: translate3d(0, 0, 0) scale(0.4); opacity: 0; }
          18% { opacity: 1; }
          100% { transform: translate3d(var(--tx), var(--ty), 0) scale(0); opacity: 0; }
        }

        @keyframes celebrationPop {
          0% {
            transform: translate(0, 0) scale(0.3);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0.8);
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .old-gift-stage button {
            min-height: 23rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PremiumGiftsTab;
