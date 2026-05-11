'use client';

import React from 'react';
import { BookHeart, Cake as CakeIcon, Gift as GiftIcon, Sparkles } from 'lucide-react';

const TabNavigation = ({
  activeTab,
  onTabChange,
  tabs = [
    { id: 'chapters', label: 'Chapters', icon: BookHeart },
    { id: 'cake', label: 'Cake', icon: CakeIcon },
    { id: 'gift', label: 'Gifts', icon: GiftIcon }
  ]
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-white via-pink-50/50 to-white border-b border-pink-100/60 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-center gap-1 sm:gap-2 px-2 py-2 sm:py-3 max-w-full overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5
                rounded-full font-nunito font-bold text-xs sm:text-sm
                uppercase tracking-widest
                transition-all duration-300 ease-in-out
                touch-press-effect whitespace-nowrap
                ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200/50 scale-100'
                    : 'bg-white border border-pink-200 text-rose-500 hover:border-pink-300 hover:shadow-md active:scale-95'
                }
              `}
              style={{ minHeight: '44px' }}
              aria-pressed={isActive}
              aria-label={`Switch to ${tab.label}`}
            >
              <Icon size={16} strokeWidth={2.5} className="hidden sm:block flex-shrink-0" />
              <Icon size={14} strokeWidth={2.5} className="sm:hidden flex-shrink-0" />
              <span className="hidden xs:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Decorative animated line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-40"></div>
    </div>
  );
};

export default TabNavigation;
