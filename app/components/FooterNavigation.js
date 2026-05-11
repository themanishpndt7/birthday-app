'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

const FooterNavigation = ({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  isPrevDisabled = false,
  isNextDisabled = false,
  isAnimating = false,
  tabName = 'Chapter',
  showProgressDots = true,
  customLabels = { prev: 'Previous', next: 'Next' },
}) => {
  const goToIndex = (targetIndex) => {
    if (targetIndex === currentIndex || isAnimating) return;

    if (targetIndex < currentIndex) {
      for (let i = 0; i < currentIndex - targetIndex; i += 1) onPrevious();
      return;
    }

    for (let i = 0; i < targetIndex - currentIndex; i += 1) onNext();
  };

  return (
    <div className="w-full rounded-[1.5rem] border border-pink-100 bg-white/78 p-3 shadow-sm backdrop-blur sm:p-4">
      <div className="mb-3 text-center font-nunito text-[10px] font-extrabold uppercase tracking-[0.2em] text-pink-500 sm:text-xs">
        <span className="text-rose-600">{currentIndex + 1}</span>
        <span className="px-1 text-pink-300">/</span>
        <span className="text-rose-600">{totalItems}</span>
        <span className="px-2 text-pink-300">-</span>
        <span>{tabName}</span>
      </div>

      {showProgressDots && (
        <div className="mb-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalItems }).map((_, idx) => {
            const isActive = idx === currentIndex;
            const isDone = idx < currentIndex;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToIndex(idx)}
                disabled={isAnimating}
                aria-label={`Go to ${tabName.toLowerCase()} ${idx + 1}`}
                aria-current={isActive ? 'step' : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-8 bg-gradient-to-r from-rose-500 to-pink-500 shadow-[0_0_10px_rgba(244,63,94,0.35)]'
                    : isDone
                    ? 'w-3 bg-amber-300 hover:bg-amber-400'
                    : 'w-3 bg-pink-100 hover:bg-pink-200'
                } disabled:cursor-not-allowed disabled:opacity-60`}
              />
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isPrevDisabled || isAnimating}
          aria-label={customLabels.prev}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-pink-200 bg-white px-3 font-nunito text-xs font-extrabold uppercase tracking-[0.14em] text-rose-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-35 sm:px-5 sm:text-sm"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.6} />
          <span className="hidden sm:inline">{customLabels.prev}</span>
        </button>

        <div className="min-w-[4.25rem] rounded-2xl bg-rose-50 px-3 py-2 text-center">
          <p className="font-nunito text-[10px] font-black uppercase tracking-[0.16em] text-rose-400">
            {tabName}
          </p>
          <p className="font-nunito text-xs font-black text-pink-600">
            {currentIndex + 1}/{totalItems}
          </p>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled || isAnimating}
          aria-label={customLabels.next}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-pink-200 bg-white px-3 font-nunito text-xs font-extrabold uppercase tracking-[0.14em] text-rose-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-35 sm:px-5 sm:text-sm"
        >
          <span className="hidden sm:inline">{customLabels.next}</span>
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.6} />
        </button>
      </div>
    </div>
  );
};

export default FooterNavigation;
