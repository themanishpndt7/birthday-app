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
  X,
} from 'lucide-react';

const giftCards = [
  {
    kind: 'promise',
    title: 'Promise: Our Forever',
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

const SmallGiftBox = ({ gift, isOpened, isHovered, onOpen }) => (
  <div className="relative flex flex-col items-center gap-2">
    <button
      onClick={() => onOpen(gift.kind)}
      onMouseEnter={(e) => {
        // hover handled by parent
      }}
      className={`group relative overflow-hidden rounded-lg transition-all duration-500 ${
        isOpened ? 'scale-95 opacity-70' : 'hover:scale-110 active:scale-95'
      } ${isHovered ? 'ring-2 ring-pink-400' : ''}`}
    >
      {/* Gift Box */}
      <div className={`relative flex h-20 w-20 items-center justify-center rounded-lg border-2 bg-gradient-to-br ${gift.colors} shadow-lg transition-all duration-500 ${isHovered ? 'shadow-2xl' : ''}`}>
        {/* Ribbon */}
        <div className={`absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 ${gift.ribbon}`} />
        <div className={`absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 ${gift.ribbon}`} />

        {/* Gift Icon */}
        <GiftIcon className="h-8 w-8 text-white drop-shadow" />

        {/* Checkmark if opened */}
        {isOpened && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30">
            <Heart className="h-6 w-6 text-white" fill="white" />
          </div>
        )}
      </div>

      {/* Opening animation burst */}
      {isOpened && (
        <div className="pointer-events-none absolute inset-0 z-20">
          {burstPattern.slice(0, 6).map((point, index) => (
            <Sparkles
              key={`burst-${index}`}
              className="gift-small-burst absolute h-3 w-3 text-pink-400"
              style={{
                left: '50%',
                top: '50%',
                '--tx': `${point.x * 0.6}px`,
                '--ty': `${point.y * 0.6}px`,
                animationDelay: `${point.delay}s`,
              }}
            />
          ))}
        </div>
      )}
    </button>

    {/* Gift Name */}
    <div className="text-center">
      <p className="text-xs font-bold text-gray-600 line-clamp-2 max-w-20">{gift.title}</p>
      {isOpened && (
        <p className="text-[10px] font-semibold text-rose-500 mt-1">✓ Opened</p>
      )}
    </div>
  </div>
);

const GiftRevealCard = ({ gift, isOpened }) => {
  if (!isOpened) return null;

  const BurstIcon = gift.BurstIcon;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      <div className="animate-reveal-bounce bg-white rounded-2xl border-2 border-white/80 shadow-2xl max-w-sm w-full">
        {/* Burst Animation */}
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          {burstPattern.map((point, index) => (
            <BurstIcon
              key={`burst-${index}`}
              className="gift-reveal-burst absolute h-4 w-4 text-pink-400"
              fill={gift.kind === 'flowers' || gift.kind === 'adventure' ? 'none' : 'currentColor'}
              style={{
                '--tx': `${point.x * 0.4}px`,
                '--ty': `${point.y * 0.4}px`,
                animationDelay: `${point.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className={`relative z-10 rounded-2xl border ${gift.revealBorder} bg-gradient-to-br ${gift.revealBg} px-6 py-8 text-center`}>
          <div className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-white to-pink-50 shadow-lg">
            <Heart className={`h-6 w-6 ${gift.accent}`} fill="currentColor" />
          </div>

          <h3 className={`font-dancing text-2xl font-bold ${gift.accent} mt-4`}>
            {gift.revealTitle}
          </h3>

          <p className="mt-4 font-nunito text-sm font-bold leading-6 text-pink-800/82">
            {gift.message}
          </p>

          <p className="mt-4 font-nunito text-xs font-bold italic text-rose-500">
            &ldquo;{gift.note}&rdquo;
          </p>

          {/* Decorative elements */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Sparkles
                key={`deco-${i}`}
                className="h-3 w-3 text-rose-300 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GiftShowcasePopup = ({
  isOpen,
  onClose,
  giftsOpened,
  onGiftOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      {/* Popup Container */}
      <div className="relative z-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="rounded-3xl border-2 border-white/80 bg-gradient-to-br from-white/95 to-pink-50/95 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="sticky top-0 z-50 border-b border-white/40 bg-gradient-to-r from-white/80 to-pink-50/80 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="font-dancing text-3xl font-bold text-rose-600">All Your Gifts</h2>
              <p className="font-nunito text-xs text-pink-600 font-semibold mt-1">
                Tap any gift to unwrap it
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-rose-100 transition-all duration-200 group"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-rose-500 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {giftCards.map((gift, index) => {
                const isOpened = giftsOpened[index];
                return (
                  <div key={gift.kind} className="flex justify-center">
                    <div className="relative">
                      <SmallGiftBox
                        gift={gift}
                        isOpened={isOpened}
                        onOpen={(kind) => {
                          onGiftOpen(index);
                        }}
                      />

                      {/* Reveal Modal */}
                      {isOpened && (
                        <GiftRevealCard gift={gift} isOpened={isOpened} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="h-1.5 w-full max-w-xs bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-500"
                  style={{
                    width: `${(giftsOpened.filter(Boolean).length / giftCards.length) * 100}%`,
                  }}
                />
              </div>
              <p className="font-nunito text-sm font-bold text-pink-700">
                {giftsOpened.filter(Boolean).length} of {giftCards.length} unwrapped
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/40 bg-gradient-to-r from-white/50 to-pink-50/50 px-6 py-4 text-center">
            <p className="font-nunito text-xs text-gray-600">
              Each gift holds a special message just for you 💕
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900&display=swap');

        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-nunito { font-family: 'Nunito', sans-serif; }

        .gift-small-burst {
          animation: smallGiftBurst 0.8s ease-out forwards;
          opacity: 0;
          filter: drop-shadow(0 0 6px currentColor);
        }

        .gift-reveal-burst {
          animation: giftRevealBurst 1s ease-out forwards;
          opacity: 0;
          filter: drop-shadow(0 0 8px currentColor);
        }

        .animate-reveal-bounce {
          animation: revealBounce 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        @keyframes smallGiftBurst {
          0% { transform: translate3d(0, 0, 0) scale(0.3) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate3d(var(--tx), var(--ty), 0) scale(0) rotate(180deg); opacity: 0; }
        }

        @keyframes giftRevealBurst {
          0% { transform: translate3d(0, 0, 0) scale(0.4) rotate(0deg); opacity: 0; }
          18% { opacity: 1; }
          100% { transform: translate3d(var(--tx), var(--ty), 0) scale(0) rotate(180deg); opacity: 0; }
        }

        @keyframes revealBounce {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); filter: blur(4px); }
          60% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
      `}</style>
    </div>
  );
};

export default GiftShowcasePopup;
