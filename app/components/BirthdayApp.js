'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Gift as GiftIcon, Stars, Music, VolumeX, Infinity, Flame, HeartHandshake, Sparkle, Clock, BookHeart, Cake as CakeIcon, Ticket, Flower2, Crown } from 'lucide-react';
import NightCelebrationFireworks from './NightCelebrationFireworks';
import IntroMessage from './IntroMessage';
import FooterNavigation from './FooterNavigation';
import BreakSealPage from './BreakSealPage';
import PremiumCelebrationTab from './PremiumCelebrationTab';
import PremiumGiftsTab from './PremiumGiftsTab';
import SpecialMomentsTab from './SpecialMomentsTab';
import GiftShowcasePopup from './GiftShowcasePopup';

// --- Advanced Animation Wrappers ---
const ElegantFade = ({ children, delay = 0 }) => (
  <div 
    className="opacity-0 w-full flex flex-col items-center" 
    style={{ 
      animationName: 'elegantReveal',
      animationDuration: '1s',
      animationTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      animationFillMode: 'forwards',
      animationDelay: `${delay}ms`
    }}
  >
    {children}
  </div>
);

// --- Main Application ---
const App = ({ startOpened = false, showIntroMessageOnOpen = true, onSealOpen } = {}) => {
  const [showIntroMessage, setShowIntroMessage] = useState(showIntroMessageOnOpen);
  const [isOpened, setIsOpened] = useState(startOpened);
  const [showIntroCelebration, setShowIntroCelebration] = useState(false);
  const [loveRain, setLoveRain] = useState([]);
  
  const [activeTab, setActiveTab] = useState('chapters'); // 'chapters', 'cake', 'gift', 'special', 'celebration'
  const [currentReasonCard, setCurrentReasonCard] = useState(0);
  const [heartsCollected, setHeartsCollected] = useState(0);
  const [loveMeterLevel, setLoveMeterLevel] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [celebrationFireworks, setCelebrationFireworks] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Cake State
  const [cakeStep, setCakeStep] = useState(0); // 0 = Lit, 1 = Blown, 2 = Cut
  const [cakePieceEaten, setCakePieceEaten] = useState(false);
  const [cakeBiteParticles, setCakeBiteParticles] = useState([]);
  const [showGiftButton, setShowGiftButton] = useState(false);
  
  // Multiple Gifts State (5 gifts)
  const [currentGiftPage, setCurrentGiftPage] = useState(0);
  const [giftsOpened, setGiftsOpened] = useState([false, false, false, false, false, false, false]); 
  const [showGiftShowcase, setShowGiftShowcase] = useState(false);
  
  const [fireworks, setFireworks] = useState([]);
  const [giftParticles, setGiftParticles] = useState([]);

  const [daysAlive, setDaysAlive] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isDancing, setIsDancing] = useState(false);
  const [showRomanticQuote, setShowRomanticQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [roseShowerActive, setRoseShowerActive] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [floatingSparkles, setFloatingSparkles] = useState([]);
  const [celebrationEmojis, setCelebrationEmojis] = useState([]);
  const [danceParticles, setDanceParticles] = useState([]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  
  // Premium Night Celebration Modal State
  const [showNightCelebrationModal, setShowNightCelebrationModal] = useState(false);
  
 // Night Celebration State
  const [showNightCelebration, setShowNightCelebration] = useState(false);
  const [nightFirecrackers, setNightFirecrackers] = useState([]);
  const [nightFireworks, setNightFireworks] = useState([]);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [showWishes, setShowWishes] = useState(false);
  const [allCrackersExploded, setAllCrackersExploded] = useState(false);

  // Special Surprise State
  const [showSpecialSurpriseModal, setShowSpecialSurpriseModal] = useState(false);
  const [surpriseParticles, setSurpriseParticles] = useState([]);

  const specialSurpriseVideoUrl = 'https://drive.google.com/file/d/1LtYkifoFurEamQaAmWYg2N2os0LKVGVY/preview';

  const totalGifts = 7;
  
  const audioRef = useRef(null);
  const crackleAudioRef = useRef(null);
  const burstAudioRef = useRef(null);

  useEffect(() => {
    const birthDate = new Date('2005-05-13T00:00:00');
    const today = new Date();
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDaysAlive(diffDays);

    // Generate floating particles only on client to avoid hydration mismatch
    const hearts = Array.from({ length: 8 }).map((_, i) => ({
      id: `heart-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: i * 0.3,
      fontSize: 20 + Math.random() * 20
    }));

    const sparkles = Array.from({ length: 6 }).map((_, i) => ({
      id: `sparkle-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 2,
      delay: i * 0.4,
      fontSize: 16 + Math.random() * 16
    }));

    // Generate celebration emoji particles
    const emojis = ['🥹','🫂','♥️','👫🏻','👩🏻‍❤️‍👨🏻',
      '♾️','💍','🌎','💎','🧿',
      '🌸','💓','💕','💫','💖',
      '💘','✨','💖','🎁','💝'].map((emoji, i) => ({
        id: `emoji-${i}`,
        emoji,
        duration: 2 + Math.random(),
        delay: i * 0.1
      }));

    // Generate dance particles
    const dancers = Array.from({ length: 8 }).map((_, i) => ({
      id: `dancer-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 1,
      delay: i * 0.15
    }));

    setFloatingHearts(hearts);
    setFloatingSparkles(sparkles);
    setCelebrationEmojis(emojis);
    setDanceParticles(dancers);

    // Detect device type and orientation
    const detectDevice = () => {
      const hasTouchSupport = () => {
        return (
          ('ontouchstart' in window) ||
          (navigator.maxTouchPoints > 0) ||
          (navigator.msMaxTouchPoints > 0)
        );
      };

      setIsTouch(hasTouchSupport());
      setIsMobile(window.innerWidth < 768);
      setIsLandscape(window.innerHeight < window.innerWidth);
    };

    detectDevice();

    // Handle resize and orientation change
    const handleResize = () => {
      detectDevice();
    };

    const handleOrientationChange = () => {
      detectDevice();
      // Prevent zoom on orientation change
      document.documentElement.style.zoom = 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Fix viewport height for mobile browsers with dynamic toolbars
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', setVH);
    };
  }, []);

  // Initialize night crackers when modal opens
  useEffect(() => {
    if (showNightCelebration && nightFirecrackers.length === 0) {
      const crackers = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        x: 15 + (i % 4) * 22,
        y: 30 + Math.floor(i / 4) * 35,
        exploded: false
      }));
      setNightFirecrackers(crackers);
    }
  }, [showNightCelebration]);

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePos({ x, y });
  }, []);

  // --- Highly Elegant Intro Celebration (Rain of Love & Delicate Popup) ---
  const triggerIntroCelebration = () => {
    // Main celebration rain - hearts, petals, stars
    const particles = Array.from({ length: 120 }).map((_, i) => {
      return {
        id: 'rain-' + i,
        left: Math.random() * 100, 
        delay: Math.random() * 2.5, 
        duration: 3.5 + Math.random() * 3.5, 
        type: ['heart', 'petal', 'star', 'sparkle'][Math.floor(Math.random() * 4)],
        size: 14 + Math.random() * 18,
        color: ['#f43f5e', '#ec4899', '#fbcfe8', '#fda4af'][Math.floor(Math.random() * 4)]
      };
    });
    setLoveRain(particles);
    setShowIntroCelebration(true);
    
    // Extended celebration duration for more dramatic effect
    setTimeout(() => {
      setShowIntroCelebration(false);
    }, 8000);
  };

  const triggerCakeFireworks = () => {
    const particles = Array.from({ length: 60 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 60 + (Math.random() * 0.5);
      const velocity = 80 + Math.random() * 150;
      return {
        id: i + Date.now(),
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity,
        type: ['circle', 'heart', 'star'][Math.floor(Math.random() * 3)],
        color: ['#f43f5e', '#ec4899', '#fbbf24', '#fbcfe8', '#fda4af'][Math.floor(Math.random() * 5)],
        delay: Math.random() * 0.3
      };
    });
    setFireworks(particles);
  };

  const triggerCakeCelebration = (stage = 'blow') => {
    const mainCount = stage === 'cut' ? 128 : 100;
    const accentCount = stage === 'cut' ? 48 : 24;
    const colors = stage === 'cut'
      ? ['#f43f5e', '#ec4899', '#fbbf24', '#fb7185', '#ffffff', '#fda4af', '#fcd34d']
      : ['#fb7185', '#fda4af', '#fecdd3', '#f9a8d4', '#f472b6', '#fbcfe8'];

    const mainBurst = Array.from({ length: mainCount }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / mainCount + (Math.random() * 0.6);
      const velocity = stage === 'cut' ? 140 + Math.random() * 280 : 100 + Math.random() * 200;
      return {
        id: `cake-main-${stage}-${Date.now()}-${i}`,
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity,
        type: ['heart', 'star', 'circle'][Math.floor(Math.random() * 3)],
        color: colors[i % colors.length],
        delay: Math.random() * (stage === 'cut' ? 0.15 : 0.3)
      };
    });

    const accentBurst = Array.from({ length: accentCount }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / accentCount + (Math.random() * 0.7);
      const velocity = stage === 'cut' ? 200 + Math.random() * 320 : 120 + Math.random() * 180;
      return {
        id: `cake-accent-${stage}-${Date.now()}-${i}`,
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity - (stage === 'cut' ? 30 : 60),
        type: stage === 'cut' ? 'sparkle' : 'heart',
        color: stage === 'cut' ? '#ffffff' : '#fecdd3',
        delay: Math.random() * 0.2
      };
    });

    setFireworks(mainBurst);
    setCelebrationFireworks(accentBurst);
  };

  const triggerGiftSparkles = (giftIndex) => {
    const newOpened = [...giftsOpened];
    newOpened[giftIndex] = true;
    setGiftsOpened(newOpened);

    const particles = Array.from({ length: 40 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 40 + (Math.random() * 0.5);
      const velocity = 60 + Math.random() * 100;
      return {
        id: i + Date.now(),
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity - 80,
        type: ['heart', 'star', 'sparkle'][Math.floor(Math.random() * 3)],
        color: ['#fbbf24', '#fcd34d', '#fda4af', '#fbcfe8'][Math.floor(Math.random() * 4)],
        delay: Math.random() * 0.2
      };
    });
    setGiftParticles(particles);
  };

  const handleCakeInteraction = () => {
    if (cakeStep === 0) {
      setCakeStep(1);
      triggerCakeCelebration('blow');
      // Play candle blow sound effect
      try {
        if (crackleAudioRef.current) {
          crackleAudioRef.current.currentTime = 0;
          crackleAudioRef.current.play().catch(() => {});
        }
      } catch (e) {
        console.log('Sound playback error:', e);
      }
    } else if (cakeStep === 1) {
      setCakeStep(2);
      triggerCakeCelebration('cut');
      // Play cake cut sound effect
      try {
        if (burstAudioRef.current) {
          burstAudioRef.current.currentTime = 0;
          burstAudioRef.current.play().catch(() => {});
        }
      } catch (e) {
        console.log('Sound playback error:', e);
      }
    }
  };

  const handleEatCakePiece = () => {
    if (cakePieceEaten) return; // Prevent duplicate pastries
    setCakePieceEaten(true);
    // Trigger yummy particles
    const particles = Array.from({ length: 35 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 35 + (Math.random() * 0.4);
      const velocity = 50 + Math.random() * 120;
      return {
        id: i + Date.now(),
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity - 60,
        type: 'crumb',
        emoji: ['🍽️', '😋', '✨', '💫', '🎉'][Math.floor(Math.random() * 5)],
        delay: Math.random() * 0.15
      };
    });
    setCakeBiteParticles(particles);
    // Show gift button after a short delay for eating animation
    setTimeout(() => {
      setShowGiftButton(true);
    }, 1200);
  };

  const handleCutAgain = () => {
    setCakeStep(0); // Reset to blow candles again
    setCakePieceEaten(false);
    setCakeBiteParticles([]);
    setFireworks([]); // Clear any remaining fireworks
    setCelebrationFireworks([]);
    setShowGiftButton(false);
  };

  const handleNavigateToGifts = () => {
    setFireworks([]);
    setCelebrationFireworks([]);
    setCakeBiteParticles([]);
    setCakePieceEaten(false);
    setCakeStep(0);
    setShowGiftButton(false);
    setCurrentGiftPage(0);
    setActiveTab('gift');
  };

  // --- Night Celebration Functions ---
  const wishes = [
    { name: "Shweta", emoji: "👑" },
    { name: "My Love", emoji: "💕" },
    { name: "My Heart", emoji: "❤️" },
    { name: "My Angel", emoji: "👼" },
    { name: "My Forever", emoji: "♾️" },
    { name: "My Blessing", emoji: "✨" },
    { name: "My Shona", emoji: "💎" },
    { name: "My Life", emoji: "🌟" }
  ];

  const giftTitles = [
    "🎁 Promise: Our Forever 💫",
    "🌸 Unfading Love & Memories 🌹",
    "🎟️ Infinite Coupon Booklet 💕",
    "🪞 The Honest Truth About You ✨",
    "🍯 Jar of Sweet Kisses 💋",
    "✈️ Adventure Awaits Us 🌍",
    "♾️ My Endless Future with YOU 💕"
  ];

  const giftPrompts = [
    "💫 Tap the ribbon to unwrap your promise 🎀",
    "🌸 Tap to bloom your beautiful flowers 🌷",
    "🎟️ Tap to reveal your infinite coupons 💕",
    "🪞 Tap the glass to see the truth ✨",
    "🍯 Tap to pop the cork & taste sweetness 🍾",
    "✈️ Tap to open your adventure map 🗺️",
    "♾️ Tap to reveal our eternal future 🌟"
  ];

  const launchNightCelebration = () => {
    setShowNightCelebration(true);
    setNightFirecrackers([]);
    setNightFireworks([]);
    setShowWishes(false);
    setAllCrackersExploded(false);
    setCurrentWishIndex(0);
  };

  const triggerFirecracker = (x, y) => {
    // Play rocket launch sound using synthesized audio
    try {
      if (window.playRocketSound) {
        window.playRocketSound();
      }
    } catch (e) {
      console.log('Sound synthesis not available');
    }

    // Create rocket trajectory particles (going up)
    const rocketTrajectory = Array.from({ length: 12 }).map((_, i) => {
      const delayOffset = i * 0.05;
      return {
        id: `rocket-${Date.now()}-${i}`,
        x: x,
        y: y + 20,
        startY: y + 20,
        targetY: y - 300 - Math.random() * 150,
        tx: (Math.random() - 0.5) * 40,
        ty: -(150 + Math.random() * 100),
        color: '#ff6b00',
        isRocket: true,
        delay: delayOffset,
        life: 1,
        trail: true
      };
    });

    // Add trajectory to fireworks
    setNightFireworks(prev => [...prev, ...rocketTrajectory]);

    // Burst explosion at peak height
    setTimeout(() => {
      const burstY = y - (250 + Math.random() * 150);
      const burst = Array.from({ length: 120 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 120 + (Math.random() * 0.5);
        const velocity = 150 + Math.random() * 280;
        return {
          id: i + Date.now(),
          x: x,
          y: burstY,
          tx: Math.cos(angle) * velocity,
          ty: Math.sin(angle) * velocity,
          color: ['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493', '#00ff7f'][Math.floor(Math.random() * 8)],
          delay: 0,
          life: 1,
          isBurst: true
        };
      });

      setNightFireworks(prev => [...prev, ...burst]);

      // Play burst sound using synthesized audio
      try {
        if (window.playBurstSound) {
          window.playBurstSound();
        }
      } catch (e) {
        console.log('Sound synthesis not available');
      }
    }, 600);
  };

  const closeNightCelebration = () => {
    setShowNightCelebration(false);
    setNightFireworks([]);
  };

  const handleCrackerClick = (index) => {
    const newCrackers = [...nightFirecrackers];
    if (!newCrackers[index].exploded) {
      newCrackers[index].exploded = true;
      setNightFirecrackers(newCrackers);
      triggerFirecracker(newCrackers[index].x, newCrackers[index].y);

      // Check if all exploded
      if (newCrackers.every(c => c.exploded)) {
        setAllCrackersExploded(true);
        setTimeout(() => {
          setShowWishes(true);
        }, 1000);
      }
    }
  };

  // --- 13 Chapters Content ---
  const pages = [
    {
      title: "May 13, 2005 🎂",
      content: (
        <div className="space-y-10 text-center w-full px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <div className="relative flex justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-400 blur-3xl opacity-40 rounded-full animate-pulse" style={{width: '140px', height: '140px', left: '50%', transform: 'translateX(-50%)'}}></div>
              <div className="p-6 rounded-full bg-gradient-to-br from-rose-500 to-pink-400 border-3 border-white shadow-2xl relative z-10 hover:scale-110 transition-transform">
                <CakeIcon className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
            </div>
          </ElegantFade>
          <ElegantFade delay={300}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 font-dancing drop-shadow-lg mb-2 leading-tight">
              A Star Was Born ⭐
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-rose-500 font-bold font-dancing drop-shadow-sm tracking-wide">May 13, 2005</p>
          </ElegantFade>
          <ElegantFade delay={600}>
            <div className="bg-gradient-to-br from-white/80 via-pink-50/60 to-rose-50/40 px-6 sm:px-8 md:px-10 py-6 sm:py-8 rounded-3xl border-2 border-pink-200 shadow-[0_12px_40px_rgba(253,164,175,0.2)] backdrop-blur-md">
              <p className="text-xs md:text-sm text-rose-700 font-nunito tracking-widest uppercase mb-4 flex items-center justify-center gap-2 font-extrabold">
                <Clock className="w-5 h-5 animate-pulse" /> You have blessed this world for
              </p>
              <p className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500 font-nunito tracking-wider mb-2">
                {daysAlive.toLocaleString()}
              </p>
              <p className="text-sm md:text-lg text-pink-700 font-nunito font-bold tracking-wide">✨ beautiful days ✨ of pure joy 💕</p>
            </div>
          </ElegantFade>
          <ElegantFade delay={900}>
            <div className="border-t-2 border-pink-200 pt-6 mt-4">
              <p className="text-base md:text-xl text-pink-900 font-nunito font-bold tracking-wider px-4 leading-relaxed">
                🎂 This is the beginning of <span className="text-rose-600 text-lg italic">our eternal journey</span> 🎂
              </p>
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      title: "To My Forever Love 💖",
      content: (
        <div className="space-y-10 text-center w-full px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <p className="text-base md:text-lg font-bold text-rose-600 font-nunito uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <span className="text-2xl">🎉</span> Happiest Happy Birthday <span className="text-2xl">🎉</span>
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-red-500 font-dancing drop-shadow-lg mb-4 leading-tight">
              Happy Birthday, Beautiful!
            </h1>
            <div className="flex justify-center gap-4 text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="text-rose-600">💕 YOU 💕</span>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-pink-700 font-nunito font-bold tracking-widest flex items-center justify-center gap-2">
              <span>🫂</span> <span>♾️</span> <span>🧿</span> <span>👫🏻</span>
            </p>
          </ElegantFade>
          <ElegantFade delay={500}>
            <div className="relative p-10 mt-6 bg-gradient-to-br from-white/85 via-pink-50/70 to-rose-50/50 rounded-3xl border-2 border-pink-200 shadow-xl backdrop-blur-sm">
              <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-semibold">
                Today is all about celebrating <span className="font-extrabold text-rose-600 text-lg bg-gradient-to-r from-pink-100 to-rose-100 px-2 py-1 rounded-lg inline-block">the most amazing person 👑</span> in my <span className="font-extrabold text-rose-500 text-lg">world 🌍</span><br className="hidden md:inline"/>
                You make every day feel like a <span className="font-black text-rose-700 text-xl underline decoration-pink-400 decoration-2">celebration 🎉</span> 💕
              </p>
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      title: "My Inspiration 🌟",
      content: (
        <div className="space-y-10 text-center w-full px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-semibold mb-2">
              <span className="font-black text-2xl sm:text-3xl md:text-4xl text-rose-600 drop-shadow-sm">YOU'RE</span> not just the
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl italic text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 font-black font-dancing drop-shadow-lg my-4 leading-tight">
              Love of My Life 💞
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-pink-900 font-nunito leading-relaxed font-bold space-y-2">
              <div>but also my <span className="text-rose-600 text-lg sm:text-xl md:text-2xl font-black">inspiration 🌟</span>,</div>
              <div>my <span className="text-pink-600 text-2xl font-black">happiness 😄</span>,</div>
              <div>and my <span className="text-rose-600 text-2xl font-black bg-gradient-to-r from-pink-100 to-rose-100 px-3 py-1 rounded-full inline-block">everything 🫶🏻</span></div>
            </p>
          </ElegantFade>
          <ElegantFade delay={500}>
            <div className="bg-gradient-to-r from-white/80 via-pink-50/70 to-rose-50/60 border-l-4 border-rose-500 p-8 rounded-2xl shadow-lg max-w-lg mx-auto">
              <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed italic font-semibold">
                ✨ I'm <span className="font-black text-rose-600">endlessly grateful 🥹</span> for YOUR <span className="font-black text-pink-600">presence 🌹</span><br/>and every <span className="font-black text-rose-500">precious moment ⏳</span> we share together 💕
              </p>
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      title: "So Lucky 🍀",
      content: (
        <div className="space-y-10 text-center w-full flex flex-col items-center px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
              <div className="bg-gradient-to-br from-rose-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl relative z-10 border-3 border-white hover:scale-110 transition-transform">
                <Heart className="text-white w-10 h-10 animate-heartbeat drop-shadow-lg" fill="currentColor" />
              </div>
            </div>
          </ElegantFade>
          <ElegantFade delay={400}>
            <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold mb-2">
              <span className="font-black text-3xl md:text-4xl text-rose-600 drop-shadow-sm">YOU'VE</span> taken a
            </p>
            <h1 className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-700 text-5xl md:text-6xl font-dancing drop-shadow-lg my-4">
              Special Place 🫀
            </h1>
            <p className="text-xl md:text-2xl text-pink-900 font-nunito font-bold">in my heart 💖</p>
          </ElegantFade>
          <ElegantFade delay={700}>
            <div className="bg-gradient-to-br from-white/85 via-pink-50/70 to-rose-50/60 px-10 py-6 rounded-full border-3 border-pink-300 shadow-xl max-w-sm">
              <p className="text-lg md:text-xl text-pink-900 font-nunito font-black">
                And I feel <span className="text-rose-700 text-2xl tracking-wider drop-shadow-sm">SO LUCKY 🍀</span><br/>to have <span className="text-rose-800 text-2xl font-black drop-shadow-sm">YOU</span> by my side 👩🏻‍❤️‍👨🏻
              </p>
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      title: "On Your Special Day 💞",
      content: (
        <div className="space-y-10 text-center w-full px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 font-dancing drop-shadow-lg mb-6 leading-tight">
              MY LOVE 💞
            </h1>
          </ElegantFade>
          <ElegantFade delay={400}>
            <div className="bg-gradient-to-br from-white/85 via-pink-50/70 to-rose-50/50 p-10 rounded-3xl border-2 border-pink-300 shadow-xl">
              <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-semibold space-y-3">
                <div>May <span className="font-black text-rose-600 text-xl bg-gradient-to-r from-pink-100 to-rose-100 px-2 py-1 rounded inline-block">God</span> bless <span className="font-black text-rose-700 text-xl">YOU</span></div>
                <div>with <span className="italic font-black text-rose-600 text-lg">endless ♾️</span> <span className="font-black text-pink-600 text-lg">happiness 😄</span>,</div>
                <div><span className="font-black text-rose-500 text-lg">love 💕</span>, and all</div>
                <div><span className="font-black text-rose-700 text-lg">YOUR favorite things ✨</span> <span className="text-lg">💫</span></div>
              </p>
            </div>
          </ElegantFade>
          <ElegantFade delay={700}>
            <div className="bg-gradient-to-br from-pink-100/70 via-white to-rose-50/60 p-8 rounded-3xl border-2 border-pink-300 shadow-lg max-w-md mx-auto">
              <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold space-y-2">
                <div>May this birthday bring <span className="font-black text-rose-700">YOU</span></div>
                <div><span className="font-black text-2xl text-pink-600">💎 JOY 💎</span>, <span className="font-black text-2xl text-pink-600">😂 LAUGHTER 😂</span></div>
                <div>and <span className="font-black text-rose-700 text-lg">unforgettable memories 📸</span></div>
              </p>
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      title: "The Highest Peaks 📈",
      content: (
        <div className="space-y-10 text-center w-full px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold mb-6">
              I hope <span className="font-black text-rose-600 text-xl">YOU</span> stay
            </p>
            <div className="flex justify-center gap-4 mb-6 text-lg md:text-2xl font-black">
              <div className="text-rose-600 drop-shadow-sm">💪 Strong 💪</div>
              <div className="text-pink-700 drop-shadow-sm">🏋 Healthy 🏋</div>
              <div className="text-rose-700 drop-shadow-sm">😎 Smart 😎</div>
            </div>
            <h1 className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 text-5xl md:text-6xl font-dancing drop-shadow-lg mb-4 leading-tight">
              Reaching the Highest Peaks 📈
            </h1>
            <p className="text-3xl md:text-4xl font-black text-yellow-500 font-dancing drop-shadow-lg">of SUCCESS 🏆</p>
          </ElegantFade>
          <ElegantFade delay={500}>
            <div className="bg-gradient-to-br from-white/85 via-pink-50/70 to-rose-50/60 p-10 rounded-3xl border-2 border-pink-300 shadow-xl max-w-md mx-auto">
              <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-semibold space-y-2">
                <div><span className="font-black text-rose-600 text-lg">YOU'RE</span> the reason for my <span className="text-3xl font-black text-pink-500 drop-shadow-sm">smile 😊</span></div>
                <div>the rhythm of my <span className="text-3xl font-black text-red-500 animate-pulse drop-shadow-sm">heartbeat 🫀</span></div>
                <div>and the <span className="italic font-black text-rose-600 text-lg">dream I never want to wake from 🌹</span></div>
              </p>
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      title: "You're My Everything 🫶🏻",
      content: (
        <div className="space-y-10 text-center w-full px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold mb-2">
              From the moment <span className="font-black text-rose-600 text-lg">we met 👀</span>,
            </p>
            <h1 className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-700 text-3xl sm:text-4xl md:text-5xl font-dancing drop-shadow-lg mb-2 leading-tight">
              YOU'VE held a piece of my soul ♥️
            </h1>
          </ElegantFade>
          <ElegantFade delay={400}>
            <div className="bg-gradient-to-br from-white/85 via-pink-50/70 to-rose-50/60 p-10 rounded-3xl border-2 border-pink-300 shadow-xl">
              <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold mb-3">
                <span className="font-black text-rose-600 text-lg">YOU'RE</span> not just an <span className="font-black text-pink-600 text-lg">amazing person 🌸</span>,<br/>but also the one who
              </p>
              <h2 className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 text-2xl sm:text-3xl md:text-4xl font-dancing drop-shadow-lg">
                Makes Life Worth Living 🌹
              </h2>
            </div>
          </ElegantFade>
          <ElegantFade delay={700}>
            <div className="bg-gradient-to-br from-pink-100/70 via-white to-rose-50/60 p-8 rounded-3xl border-2 border-pink-300 shadow-lg max-w-md mx-auto">
              <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-semibold space-y-1">
                <div>Day by day, <span className="font-black text-rose-600">YOU</span> claim an even</div>
                <div><span className="font-black text-rose-600 text-lg">deeper space 🫀</span> in my heart 💖</div>
                <div className="text-pink-800 text-sm font-bold pt-2">I'm endlessly grateful 🥹</div>
                <div className="text-pink-800 text-sm font-bold">for the incredible <span className="font-black text-rose-600 text-lg">YOU 🌟</span></div>
              </p>
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      title: "Unforgettable Memories 🎉",
      content: (
        <div className="space-y-10 text-center w-full px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-700 via-pink-600 to-rose-700 font-dancing drop-shadow-lg leading-tight">
              Let's Make This Day
            </h1>
            <p className="text-4xl md:text-5xl font-black text-yellow-500 font-dancing drop-shadow-lg mt-3 tracking-wider">
              UNFORGETTABLE 🎉
            </p>
          </ElegantFade>
          <ElegantFade delay={400}>
            <div className="bg-gradient-to-br from-white/85 via-pink-50/70 to-rose-50/60 p-10 rounded-3xl border-2 border-pink-300 shadow-xl max-w-md mx-auto">
              <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold mb-4">
                I can't wait to celebrate <span className="font-black text-rose-600 text-lg">YOU 🎉</span>,<br/>to see you <span className="font-black text-pink-600 text-lg">laugh 😄</span>, to create
              </p>
              <h2 className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 text-3xl md:text-4xl font-dancing drop-shadow-lg mt-4">
                Eternal Memories 📸
              </h2>
              <p className="text-pink-900 font-bold mt-4">that we'll cherish forever ♾️</p>
            </div>
          </ElegantFade>
          <ElegantFade delay={700}>
            <div className="flex justify-center gap-10 mt-8 text-2xl md:text-4xl">
              <Sparkles className="text-pink-400 w-10 h-10 animate-spin-slow" />
              <Heart className="text-rose-500 w-10 h-10 animate-bounce drop-shadow-lg" fill="currentColor" />
              <Sparkles className="text-pink-400 w-10 h-10 animate-spin-slow" />
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      title: "You Deserve The World 🌏",
      content: (
        <div className="space-y-10 text-center w-full px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold mb-4">
              <span className="font-black text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-pink-700">YOU</span> Deserve The World
            </p>
            <p className="text-6xl md:text-7xl font-black text-blue-400 font-dancing drop-shadow-lg mb-6">🌏</p>
            <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold">
              And I promise to
            </p>
          </ElegantFade>
          <ElegantFade delay={400}>
            <div className="bg-gradient-to-br from-white/85 via-pink-50/70 to-rose-50/60 p-10 rounded-3xl border-2 border-pink-300 shadow-xl max-w-sm mx-auto space-y-5">
              <p className="text-lg md:text-xl font-black text-rose-600 drop-shadow-sm">
                ✨ Always be by YOUR side 🫂
              </p>
              <p className="text-lg md:text-xl font-black text-pink-700 drop-shadow-sm">
                ✨ Hold YOUR hand forever 🤝
              </p>
              <p className="text-lg md:text-xl font-black text-rose-700 drop-shadow-sm">
                ✨ Love YOU endlessly 💓
              </p>
            </div>
          </ElegantFade>
          <ElegantFade delay={500}>
            <div className="border-t-4 border-pink-300 pt-8 mt-6">
              <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold space-y-1">
                <div>Our <span className="font-black text-rose-700 text-lg">forever love 💖</span> will never fade</div>
                <div>and I'll cherish every moment with <span className="font-black text-rose-800 text-lg">YOU</span> 💑</div>
              </p>
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      title: "Here's To Us! ♾️",
      content: (
        <div className="space-y-10 text-center w-full px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold mb-4">
              As we blow out the candles 🕯️ today,
            </p>
            <h1 className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-pink-700 text-6xl md:text-7xl font-dancing drop-shadow-lg my-4 leading-tight">
              YOU ARE SPECIAL 💘
            </h1>
            <p className="text-lg md:text-xl text-pink-900 font-nunito font-bold">to me forever</p>
          </ElegantFade>
          <ElegantFade delay={400}>
            <div className="bg-gradient-to-br from-white/85 via-pink-50/70 to-rose-50/60 p-10 rounded-3xl border-2 border-pink-300 shadow-xl max-w-md mx-auto">
              <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold mb-4 space-y-1">
                <div><span className="font-black text-rose-700 text-lg">YOU'RE</span> the most <span className="font-black text-rose-600 text-lg">beautiful 🌹</span> part</div>
                <div>of my entire past year</div>
              </p>
              <div className="border-y-2 border-pink-200 py-4 my-4">
                <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold space-y-1">
                  <div>And <span className="font-black text-rose-600 text-lg">YOU</span> will be the <span className="font-black text-yellow-500 text-lg">highlight 🌟</span></div>
                  <div>of this year too!</div>
                </p>
              </div>
              <h2 className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 text-3xl md:text-4xl font-dancing drop-shadow-lg mt-4">
                Let's Make It MAGICAL 🪄✨
              </h2>
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      title: "A Wish For Our Forever 🪄",
      content: (
        <div className="space-y-10 text-center w-full px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold mb-6">
              I dream of us building a life full of:
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8 text-lg md:text-xl font-black drop-shadow-sm">
              <div className="text-rose-600">🌟 Adventures</div>
              <div className="text-rose-700">💘 Love</div>
              <div className="text-pink-600">🥰 Joy</div>
            </div>
            <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold mb-4">
              I see us growing together 🌱,<br/>creating a future so
            </p>
            <h1 className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 text-5xl md:text-6xl font-dancing drop-shadow-lg my-4 leading-tight">
              Beautiful 🏞️
            </h1>
            <p className="text-lg md:text-xl text-pink-800 font-bold">that even the stars ✨ envy us 🌌</p>
          </ElegantFade>
          <ElegantFade delay={500}>
            <div className="p-10 bg-gradient-to-br from-pink-100/80 via-white/70 to-rose-50/70 rounded-3xl border-2 border-pink-300 shadow-xl relative overflow-hidden max-w-md mx-auto">
              <Heart className="absolute -right-8 -top-8 text-pink-200 opacity-50" size={100} fill="currentColor"/>
              <p className="text-base md:text-lg font-black text-rose-700 font-nunito leading-relaxed italic relative z-10 text-center space-y-2">
                <div>✨ My love for you is as</div>
                <div className="text-rose-800 text-2xl">BOUNDLESS</div>
                <div>as the sky 🌌,<br/>as</div>
                <div className="text-rose-800 text-2xl">DEEP</div>
                <div>as the ocean 🌊,<br/>and as</div>
                <div className="text-rose-800 text-2xl">TIMELESS</div>
                <div>as eternity ♾️💞</div>
              </p>
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      title: "My Soulmate 🫶🏻",
      content: (
        <div className="space-y-10 text-center w-full flex flex-col items-center px-4 max-w-2xl mx-auto">
          <ElegantFade delay={100}>
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-pink-600 font-dancing drop-shadow-lg mb-6 leading-tight">
              Thank You
            </h1>
            <div className="bg-gradient-to-br from-white/85 via-pink-50/70 to-rose-50/60 p-10 rounded-3xl border-2 border-pink-300 shadow-xl max-w-md">
              <p className="text-base md:text-lg text-pink-900 font-nunito leading-relaxed font-bold space-y-4">
                <div className="text-xl md:text-2xl font-black text-rose-600 drop-shadow-sm">☀️ For being my SUNSHINE ☀️</div>
                <div className="text-xl md:text-2xl font-black text-blue-500 drop-shadow-sm">☁️ My calm in the storm ☁️</div>
                <div className="text-xl md:text-2xl font-black text-rose-700 drop-shadow-sm">And the one ♥️</div>
              </p>
              <h2 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-pink-600 text-3xl md:text-4xl font-dancing mt-6 drop-shadow-lg leading-tight">
                I'll love TODAY, TOMORROW & ALWAYS 🌹
              </h2>
            </div>
          </ElegantFade>
          <ElegantFade delay={500}>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent my-8"></div>
            <div className="bg-gradient-to-br from-pink-100/80 via-white/70 to-rose-50/70 p-10 rounded-3xl border-2 border-pink-300 shadow-xl max-w-md">
              <p className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-pink-600 mb-6 drop-shadow-lg">
                YOU ARE:
              </p>
              <p className="text-2xl md:text-3xl font-black text-pink-900 mb-4 drop-shadow-sm">🫀 MY HEART 🫀</p>
              <p className="text-2xl md:text-3xl font-black text-pink-900 mb-4 drop-shadow-sm">🏡 MY HOME 🏡</p>
              <p className="text-2xl md:text-3xl font-black text-rose-700 mb-6 drop-shadow-sm">💖 MY FOREVER 💖</p>
              <div className="border-t-2 border-pink-300 pt-6">
                <p className="text-sm md:text-base text-pink-900 font-nunito font-bold leading-relaxed">
                  I'm grateful for every<br/><span className="text-rose-700 font-black text-lg">moment ⏳ • second 🕰️ • heartbeat 💓</span><br/>we share together
                </p>
              </div>
            </div>
          </ElegantFade>
        </div>
      )
    },
    {
      // --- THE ULTIMATE CHAPTER 13 MASTERPIECE ---
      title: "Happy Birthday! 🎁",
      content: (
        <div className="space-y-4 flex flex-col items-center text-center w-full px-1">
          <ElegantFade delay={100}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 font-dancing leading-tight drop-shadow-sm">
                The Happiest Birthday
              </h2>
              <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
            </div>
            <p className="text-pink-600 font-nunito italic text-sm font-medium">To my one and only love...</p>
          </ElegantFade>

          <ElegantFade delay={400}>
            <div className="relative group w-full max-w-[320px] mx-auto mt-4">
              
              {/* Animated Moving Gradient Aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 rounded-[2.5rem] blur-md opacity-70 group-hover:opacity-100 transition duration-1000 animate-gradient-xy"></div>

              {/* The Masterpiece Card */}
              <div className="relative bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white/80 shadow-2xl overflow-hidden flex flex-col items-center">
                
                {/* Subtle Background Watermarks */}
                <Heart className="absolute -right-8 -top-8 w-32 h-32 text-pink-50 opacity-60 transform rotate-12" fill="currentColor" />
                <Infinity className="absolute -left-8 -bottom-8 w-32 h-32 text-pink-50 opacity-60 transform -rotate-12" />

                {/* Layered Infinite Heartbeat Centerpiece */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-rose-200 blur-xl rounded-full animate-pulse-slow"></div>
                  <div className="bg-gradient-to-br from-rose-400 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(244,63,94,0.5)] relative z-10 border-2 border-white">
                    <Heart className="text-white w-8 h-8 animate-heartbeat-fast" fill="currentColor" />
                  </div>
                  <Infinity className="absolute -bottom-2 -right-2 text-rose-500 w-7 h-7 drop-shadow-md bg-white rounded-full p-1 border border-pink-100 z-20" />
                </div>

                <p className="text-base md:text-lg font-extrabold text-rose-700 font-nunito leading-relaxed z-10 uppercase tracking-widest">
                  I LOVE YOU SO MUCH,
                </p>

                {/* Glowing Ribbon Banner */}
                <div className="my-3 py-2 bg-gradient-to-r from-transparent via-rose-50 to-transparent w-[120%] relative z-10 border-y border-pink-100/50">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500 text-xl md:text-2xl font-black font-nunito tracking-wide block drop-shadow-sm animate-pulse">
                    MERE BHOT PYARE BACCHE!
                  </span>
                </div>

                {/* Perfectly Arranged Floating Emoji Grid */}
                <div className="mt-2 grid grid-cols-5 gap-y-3 gap-x-2 w-full place-items-center bg-white/60 p-3 rounded-2xl border border-pink-50 shadow-inner z-10">
                  {celebrationEmojis.map((item) => (
                    <span 
                      key={item.id} 
                      className="text-base md:text-xl transform hover:scale-125 transition-transform cursor-default drop-shadow-sm" 
                      style={{
                        animationName: 'floatSlow',
                        animationDuration: `${item.duration}s`,
                        animationTimingFunction: 'ease-in-out',
                        animationIterationCount: 'infinite',
                        animationDelay: `${item.delay}s`
                      }}
                    >
                      {item.emoji}
                    </span>
                  ))}
                </div>

                <div className="mt-5 font-dancing text-rose-400 text-xl z-10 font-bold">
                  Forever Yours.
                </div>
              </div>
            </div>
          </ElegantFade>
        </div>
      )
    }
  ];

  // --- Touch Swipe Handlers for Chapter Navigation ---
  const handleTouchStart = (e) => {
    if (activeTab === 'chapters' || activeTab === 'gift') {
      setTouchStartX(e.changedTouches[0].screenX);
      setTouchStartY(e.changedTouches[0].screenY);
    }
  };

  const handleTouchEnd = (e) => {
    if (activeTab === 'chapters' || activeTab === 'gift') {
      const touch = e.changedTouches[0];
      setTouchEndX(touch.screenX);
      setTouchEndY(touch.screenY);
      const swipeDistance = touchStartX - touch.screenX;
      const verticalDistance = touchStartY - touch.screenY;
      const minSwipeDistance = 70; // Minimum distance for a valid swipe
      
      // Only treat the gesture as navigation when it is clearly horizontal.
      if (
        Math.abs(swipeDistance) > minSwipeDistance &&
        Math.abs(swipeDistance) > Math.abs(verticalDistance) * 1.25
      ) {
        // Swipe left (moving to next chapter)
        if (swipeDistance > minSwipeDistance) {
          handleNext();
        }
        // Swipe right (moving to previous chapter)
        else if (swipeDistance < -minSwipeDistance) {
          handlePrev();
        }
      }
    }
  };

  // --- Handlers for general navigation ---
  const handleNext = () => {
    if (activeTab === 'chapters' && currentPage < pages.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => { setCurrentPage(prev => prev + 1); setIsAnimating(false); }, 500);
    }
    if (activeTab === 'gift' && currentGiftPage < totalGifts - 1 && !isAnimating) { 
      setIsAnimating(true);
      setTimeout(() => { setCurrentGiftPage(prev => prev + 1); setIsAnimating(false); }, 500);
    }
  };

  const handlePrev = () => {
    if (activeTab === 'chapters' && currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => { setCurrentPage(prev => prev - 1); setIsAnimating(false); }, 500);
    }
    if (activeTab === 'gift' && currentGiftPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => { setCurrentGiftPage(prev => prev - 1); setIsAnimating(false); }, 500);
    }
  };

  const openEnvelope = () => {
    if (onSealOpen) {
      onSealOpen();
      return;
    }

    setIsOpened(true);
    triggerIntroCelebration();
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio prevented", e));
      setIsPlaying(true);
    }
  };

  // --- Intro: Wax-Sealed Envelope ---
  if (!isOpened) {
    return (
      <BreakSealPage
        floatingHearts={floatingHearts}
        floatingSparkles={floatingSparkles}
        isLandscape={isLandscape}
        isMobile={isMobile}
        isTouch={isTouch}
        mousePos={mousePos}
        onMouseMove={handleMouseMove}
        onOpen={openEnvelope}
      />
    );
  }

  // --- Legacy Intro: Wax-Sealed Envelope ---
  if (!isOpened) {
    return (
      <div 
        className="w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 relative"
        style={{ 
          minHeight: '100vh',
          minHeight: '100dvh',
          paddingTop: 'max(16px, var(--safe-area-top))',
          paddingBottom: 'max(16px, var(--safe-area-bottom))',
          paddingLeft: 'max(16px, var(--safe-area-left))',
          paddingRight: 'max(16px, var(--safe-area-right))',
          padding: 'max(16px, var(--safe-area-top)) max(16px, var(--safe-area-right)) max(16px, var(--safe-area-bottom)) max(16px, var(--safe-area-left))'
        }}
        onMouseMove={handleMouseMove}
      >
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60"
          style={{ background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(255,228,230,0.8), transparent 40%)` }}
        />

        {/* Floating hearts animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingHearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute text-pink-300 opacity-40 animate-float"
              style={{
                left: `${heart.left}%`,
                top: `${heart.top}%`,
                animationName: 'float',
                animationDuration: `${heart.duration}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${heart.delay}s`,
                fontSize: `${heart.fontSize}px`
              }}
            >
              💕
            </div>
          ))}
          {floatingSparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute text-rose-200 opacity-30 animate-float"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                animationName: 'float',
                animationDuration: `${sparkle.duration}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${sparkle.delay}s`,
                fontSize: `${sparkle.fontSize}px`
              }}
            >
              ✨
            </div>
          ))}
        </div>

        <div className="z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 animate-fade-in-up px-2 sm:px-6">
          <div className="relative text-center">
            <p className="text-[10px] sm:text-xs text-rose-400 font-nunito uppercase tracking-[0.45em]">FOR YOU</p>
            <div className="mt-2 h-px w-36 sm:w-44 bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-70"></div>
          </div>
          
          {/* Envelope Container */}
          <div className="relative w-full max-w-md mx-auto aspect-[5/4] mb-2 sm:mb-4 md:mb-6 group perspective">
            {/* Envelope outer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/40 to-white rounded-3xl shadow-[0_25px_65px_rgba(225,29,72,0.22)] border-2 border-pink-100/80 overflow-hidden transition-all duration-500 group-hover:shadow-[0_35px_80px_rgba(225,29,72,0.35)] group-hover:border-rose-300">
              {/* Decorative border pattern */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50"></div>
              </div>

              {/* Envelope flap */}
              <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white via-pink-50 to-pink-100 border-b-2 border-pink-200 transform origin-top transition-all duration-700 group-hover:-rotate-15 group-hover:shadow-xl">
                {/* Flap pattern */}
                <div className="absolute top-2 sm:top-3 left-0 w-full flex justify-center opacity-30">
                  <p className="text-[9px] sm:text-xs text-rose-400 font-nunito font-bold tracking-[0.35em]">FOR YOU</p>
                </div>
                {/* Flap decorative line */}
                <div className="absolute bottom-2 left-8 right-8 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-40"></div>
              </div>

              {/* Letter details peek */}
              <div className="absolute top-[40%] left-0 w-full h-[20%] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-4 sm:px-6 text-center">
                <p className="text-[9px] sm:text-xs text-rose-400 font-nunito italic font-semibold mb-1">When you break this seal...</p>
                <p className="text-xs sm:text-sm text-pink-400 font-dancing">A story of forever awaits 💕</p>
              </div>

              {/* Base envelope content area */}
              <div className="absolute bottom-0 left-0 w-full h-[35%] bg-white border-t-2 border-pink-100 flex flex-col justify-between px-3 sm:px-6 py-2 sm:py-3">
                {/* To address */}
                <div className="text-left opacity-40 group-hover:opacity-70 transition-opacity">
                  <p className="text-[9px] sm:text-[10px] text-pink-600 font-nunito font-bold tracking-wide">TO:</p>
                  <p className="text-[10px] sm:text-xs text-rose-500 font-dancing italic">My Most Precious Love</p>
                </div>
                {/* From address */}
                <div className="text-right opacity-30 group-hover:opacity-60 transition-opacity">
                  <p className="text-[9px] sm:text-[10px] text-pink-500 font-nunito font-bold tracking-wide">FROM:</p>
                  <p className="text-[10px] sm:text-xs text-rose-400 font-dancing italic">Your Devoted Heart</p>
                </div>
              </div>

              {/* Love stamps */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 transition-all duration-500 group-hover:rotate-6">
                <div className="relative w-7 sm:w-8 h-8 sm:h-10 bg-gradient-to-br from-rose-300 to-pink-300 border border-rose-400 rounded-sm shadow-md transform -rotate-3 flex items-center justify-center text-base sm:text-lg opacity-80 hover:opacity-100">
                  💕
                </div>
              </div>
              <div className="absolute top-12 sm:top-16 right-1.5 sm:right-2 z-10 transition-all duration-500 group-hover:-rotate-12">
                <div className="relative w-6 sm:w-7 h-8 sm:h-9 bg-gradient-to-br from-pink-300 to-rose-300 border border-pink-400 rounded-sm shadow-md transform rotate-6 flex items-center justify-center text-sm sm:text-base opacity-70 hover:opacity-100">
                  ✦
                </div>
              </div>

              {/* Postmark circle */}
              <div className="absolute top-6 sm:top-8 right-10 sm:right-12 z-5 w-8 sm:w-10 h-8 sm:h-10 border-2 border-pink-300/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                <p className="text-[7px] sm:text-[8px] text-pink-300 font-bold text-center leading-tight">FROM<br/>HEART</p>
              </div>
            </div>

            {/* Wax Seal with enhanced design */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 group-hover:scale-125 cursor-pointer">
              {/* Multiple glow rings */}
              <div className="absolute inset-[-12px] sm:inset-[-15px] bg-rose-500/0 rounded-full blur-2xl group-hover:bg-rose-500/30 transition-all duration-500"></div>
              <div className="absolute inset-[-6px] sm:inset-[-8px] bg-rose-400/0 rounded-full blur-lg group-hover:bg-rose-400/20 transition-all duration-500"></div>
              
              {/* Main wax seal */}
              <div className="relative w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(225,29,72,0.7)] border-3 border-rose-400 group-hover:shadow-[0_15px_40px_rgba(225,29,72,0.9)] transition-all duration-300 transform group-hover:-translate-y-1">
                {/* Seal background circle */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 opacity-60"></div>
                
                {/* Heart symbol */}
                <Heart className="w-8 sm:w-10 h-8 sm:h-10 text-white animate-heartbeat relative z-10" fill="currentColor" />
                
                {/* Decorative stars around seal */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-yellow-200 text-xs sm:text-sm opacity-80">✦</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-yellow-200 text-xs sm:text-sm opacity-80">✦</div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-yellow-200 text-xs sm:text-sm opacity-80">✦</div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-yellow-200 text-xs sm:text-sm opacity-80">✦</div>
                
                {/* Seal drips - more elaborate */}
                <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-2 sm:w-2.5 h-3 sm:h-4 bg-gradient-to-b from-rose-600 to-rose-800 rounded-b-full opacity-90 shadow-md"></div>
                <div className="absolute -bottom-2 left-1/3 w-1.5 sm:w-2 h-2 sm:h-3 bg-rose-700 rounded-b-full opacity-70"></div>
                <div className="absolute -bottom-2 right-1/3 w-1.5 sm:w-2 h-2 sm:h-3 bg-rose-700 rounded-b-full opacity-70"></div>
                <div className="absolute -bottom-1 sm:-bottom-1.5 left-1/4 w-1 sm:w-1.5 h-1.5 sm:h-2 bg-rose-700 rounded-b-full opacity-50"></div>
                <div className="absolute -bottom-1 sm:-bottom-1.5 right-1/4 w-1 sm:w-1.5 h-1.5 sm:h-2 bg-rose-700 rounded-b-full opacity-50"></div>
              </div>

              {/* Shine effect on wax */}
              <div className="absolute top-3 left-3 w-5 sm:w-6 h-5 sm:h-6 bg-white/40 rounded-full blur-md group-hover:animate-pulse opacity-80"></div>
              
              {/* Subtle shimmer */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Decorative ornate corners */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-rose-300 opacity-40 group-hover:opacity-70 transition-opacity rounded-tl-lg"></div>
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-r-2 border-rose-300 opacity-40 group-hover:opacity-70 transition-opacity rounded-tr-lg"></div>
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-l-2 border-rose-300 opacity-40 group-hover:opacity-70 transition-opacity rounded-bl-lg"></div>
            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-rose-300 opacity-40 group-hover:opacity-70 transition-opacity rounded-br-lg"></div>
          </div>

          {/* Text content with enhancements */}
          <div className="mb-1 sm:mb-2 md:mb-3 text-center w-full space-y-1 sm:space-y-2">
            <p className="text-xs sm:text-sm md:text-base text-pink-500 font-nunito font-semibold tracking-[0.35em] uppercase mb-1 sm:mb-2">CELEBRATING</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 font-dancing drop-shadow-md mb-0.5 sm:mb-1 leading-tight">
              May 13th
            </h2>
            <p className="text-[10px] sm:text-xs md:text-sm text-rose-500 font-nunito italic">The day an angel was born</p>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 font-dancing mb-1 sm:mb-2 tracking-wide animate-pulse drop-shadow-md leading-tight text-center">
            A Letter For You
          </h1>
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6 w-full justify-center max-w-md">
            <div className="h-px flex-1 max-w-12 sm:max-w-16 bg-gradient-to-r from-transparent to-pink-300"></div>
            <p className="text-[9px] sm:text-xs text-pink-400 font-nunito uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold drop-shadow-sm whitespace-nowrap">CLASSIFIED: FOREVER</p>
            <div className="h-px flex-1 max-w-12 sm:max-w-16 bg-gradient-to-l from-transparent to-pink-300"></div>
          </div>
          
          {/* Break seal button with enhanced effects */}
          <button 
            onClick={openEnvelope}
            className="group/btn px-7 sm:px-9 md:px-12 py-3.5 sm:py-4 md:py-4.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.18em] sm:tracking-[0.24em] rounded-full shadow-[0_14px_30px_rgba(225,29,72,0.52)] border-2 border-rose-300 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 hover:shadow-[0_24px_45px_rgba(225,29,72,0.62)] hover:-translate-y-2 transition-all active:scale-95 active:translate-y-0 duration-300 relative overflow-hidden touch-press-effect w-full max-w-sm mx-auto"
            style={{ minHeight: '52px' }}
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3 justify-center">
              <span className="text-lg sm:text-xl">🔓</span>
              <span className="hidden sm:inline">BREAK SEAL</span>
              <span className="sm:hidden">BREAK SEAL</span>
              <span className="inline-block group-hover/btn:animate-spin text-lg sm:text-xl">💌</span>
            </span>
            
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -left-full group-hover/btn:left-full transition-all duration-1000"></div>
            
            {/* Button glow on hover */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 blur-xl bg-gradient-to-r from-rose-500 to-pink-500 -z-10 transition-opacity duration-500"></div>
          </button>

          {/* Enhanced hint text with animation */}
          <div className="mt-4 sm:mt-6 md:mt-8 text-center w-full flex flex-col items-center justify-start">
            <p className="text-xs sm:text-sm text-pink-400 font-nunito italic opacity-60 hover:opacity-100 transition-all duration-300 mb-1 sm:mb-2">
              ✨ Hover over the envelope to reveal a secret ✨
            </p>
            <p className="text-[10px] sm:text-xs text-rose-300 font-nunito tracking-wide opacity-50">
              — A story crafted with love —
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Render Logic based on activeTab ---
  const renderContent = () => {
    if (activeTab === 'gift') {
      return (
        <PremiumGiftsTab
          currentGiftPage={currentGiftPage}
          giftsOpened={giftsOpened}
          giftParticles={giftParticles}
          isAnimating={isAnimating}
          onGiftOpen={triggerGiftSparkles}
          onPrevious={handlePrev}
          onNext={handleNext}
          onShowAllGifts={() => setShowGiftShowcase(true)}
        />
      );
    }

    if (activeTab === 'special') {
      return (
        <SpecialMomentsTab
          daysAlive={daysAlive}
          onOpenGifts={() => setActiveTab('gift')}
          onOpenCelebration={() => {
            setActiveTab('celebration');
            setCelebrationFireworks([]);
          }}
        />
      );
    }

    if (activeTab === 'celebration') {
      return (
        <PremiumCelebrationTab
          daysAlive={daysAlive}
          onNightCelebration={() => setShowNightCelebrationModal(true)}
          onSpecialSurprise={() => setShowSpecialSurpriseModal(true)}
        />
      );
    }

    switch(activeTab) {
      
      // --- CAKE PAGE ---
      case 'cake':
        return (
          <div className="flex-1 flex flex-col items-center justify-start w-full py-2 px-2 fade-in relative pt-10">
            <div className="h-24 flex flex-col justify-center items-center w-full">
              <ElegantFade delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 font-dancing mb-2 drop-shadow-sm text-center">
                  {cakeStep === 0 ? "🎂 Make a Wish, Beautiful ✨" : cakeStep === 1 ? "🔪 Time to Cut the Cake 🔪" : "🎉 Happy Birthday, My Heart! 🎉"}
                </h2>
              </ElegantFade>
              <ElegantFade delay={400}>
                <p className={`text-sm text-pink-500 font-nunito transition-opacity duration-1000 ${cakeStep === 2 ? 'opacity-0' : 'animate-pulse'}`}>
                  {cakeStep === 0 ? "✨ Close your eyes, make a wish, and tap to blow the candles 🕯️ 💫" : "🎂 Tap the cake to slice it together 🎂"}
                </p>
              </ElegantFade>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative w-full cursor-pointer group" onClick={handleCakeInteraction}>
              {cakeStep === 0 && (
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-300/20 blur-3xl rounded-full animate-pulse-slow pointer-events-none"></div>
              )}

              {cakeStep > 0 && (
                <div className="absolute inset-0 pointer-events-none z-0">
                  {celebrationFireworks.length > 0 && (
                    <div className="absolute inset-0 pointer-events-none z-10">
                      {celebrationFireworks.map((fw) => (
                        <div
                          key={fw.id}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"
                          style={{
                            animation: `sparkleBurst 1.8s ease-out forwards`,
                            animationDelay: `${fw.delay}s`,
                            '--tx': `${fw.tx}px`,
                            '--ty': `${fw.ty}px`,
                            color: fw.color,
                            fontSize: '18px'
                          }}
                        >
                          {fw.type === 'sparkle' ? '✨' : fw.type === 'heart' ? '💖' : '🎉'}
                        </div>
                      ))}
                    </div>
                  )}
                  {fireworks.map((fw) => (
                    <div 
                      key={fw.id} 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"
                      style={{
                        animation: `firework 1.5s ease-out forwards`,
                        animationDelay: `${fw.delay}s`,
                        '--tx': `${fw.tx}px`,
                        '--ty': `${fw.ty}px`,
                        color: fw.color
                      }}
                    >
                      {fw.type === 'heart' ? <Heart size={16} fill="currentColor"/> : 
                       fw.type === 'star' ? <Stars size={16} fill="currentColor"/> : 
                       <div className="w-3 h-3 rounded-full" style={{backgroundColor: fw.color}}></div>}
                    </div>
                  ))}
                </div>
              )}

              {cakePieceEaten && (
                <div className="absolute inset-0 pointer-events-none z-20">
                  {cakeBiteParticles.map((bp) => (
                    <div
                      key={bp.id}
                      className="absolute text-2xl opacity-0"
                      style={{
                        top: '60%',
                        left: '50%',
                        animation: `sparkleBurst 1.2s ease-out forwards`,
                        animationDelay: `${bp.delay}s`,
                        '--tx': `${bp.tx}px`,
                        '--ty': `${bp.ty}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {bp.emoji}
                    </div>
                  ))}
                </div>
              )}

              {cakeStep === 1 && (
                <div className="absolute right-10 top-10 animate-bounce text-3xl z-50 drop-shadow-md pointer-events-none">🔪</div>
              )}

              {cakeStep === 2 && (
                <div className="absolute inset-0 z-50 pointer-events-none flex justify-center items-center">
                   <div className="absolute top-[20%] left-[20%] w-[60%] h-1 bg-white/80 transform rotate-45 rounded-full z-40 animate-slash-line origin-left"></div>
                   <div className="absolute text-5xl animate-knife drop-shadow-lg -mt-10">🔪</div>
                   <div className="absolute text-6xl animate-slice opacity-0 drop-shadow-xl mt-12 ml-24 z-50"></div>
                </div>
              )}

              <div className={`relative z-10 flex flex-col items-center transition-all duration-700 mt-8 ${cakeStep === 0 && 'hover:scale-105'} ${cakeStep === 2 ? 'opacity-90 scale-95' : ''}`}>
                <div className="flex gap-4 mb-[-8px] z-40 relative">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative flex flex-col items-center">
                      {cakeStep === 0 && (
                        <div className="absolute -top-6 w-3 h-5 bg-gradient-to-b from-yellow-200 to-orange-400 rounded-[50%_50%_20%_20%] shadow-[0_0_15px_#fbbf24] animate-flicker"></div>
                      )}
                      <div className="w-2.5 h-12 bg-gradient-to-r from-pink-50 via-white to-pink-100 border border-pink-200 rounded-t-full shadow-sm overflow-hidden relative">
                         <div className="absolute top-2 w-full h-1.5 bg-rose-300 transform -skew-y-12"></div>
                         <div className="absolute top-6 w-full h-1.5 bg-rose-300 transform -skew-y-12"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative w-28 h-14 bg-gradient-to-b from-white to-pink-50 rounded-lg border-b-4 border-pink-100 shadow-[0_4px_10px_rgba(251,113,133,0.1)] z-30 flex justify-center items-end pb-1">
                   <div className="absolute -bottom-1.5 flex justify-evenly w-full px-2">
                     {[...Array(5)].map((_, i) => <div key={i} className="w-3 h-3 bg-white rounded-full shadow-sm"></div>)}
                   </div>
                </div>
                <div className="relative w-40 h-16 bg-gradient-to-b from-pink-100 to-pink-200 rounded-lg border-b-4 border-pink-300 shadow-[0_4px_15px_rgba(251,113,133,0.15)] z-20 flex flex-col justify-center items-center mt-[-2px]">
                   <Heart className="w-5 h-5 text-rose-400 absolute top-1/2 -translate-y-1/2" fill="currentColor"/>
                   <div className="absolute -bottom-1.5 flex justify-evenly w-full px-3">
                     {[...Array(7)].map((_, i) => <div key={i} className="w-3 h-3 bg-white rounded-full shadow-sm"></div>)}
                   </div>
                </div>
                <div className="relative w-56 h-20 bg-gradient-to-b from-rose-100 to-rose-200 rounded-lg border-b-4 border-rose-300 shadow-[0_6px_20px_rgba(251,113,133,0.2)] z-10 flex flex-col items-center justify-end pb-1 mt-[-2px]">
                   <div className="absolute top-4 w-full flex justify-around px-4 opacity-50">
                      {[...Array(6)].map((_, i) => <Stars key={i} className="w-3 h-3 text-rose-400"/>)}
                   </div>
                   <div className="absolute -bottom-2 flex justify-evenly w-full px-2">
                     {[...Array(10)].map((_, i) => <div key={i} className="w-4 h-4 bg-white rounded-full shadow-md"></div>)}
                   </div>
                </div>
                <div className="w-64 h-10 bg-gradient-to-b from-gray-100 to-gray-200 rounded-[100px_100px_40px_40px] mt-[-5px] shadow-[0_15px_25px_rgba(0,0,0,0.1)] border-t border-white relative z-0 flex justify-center">
                   <div className="w-32 h-6 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-xl absolute bottom-[-6px] shadow-lg border border-gray-100"></div>
                </div>
              </div>
            </div>

            {cakeStep === 2 && cakePieceEaten === false && (
              <div key="cake-piece" className="absolute bottom-[80px] left-1/2 -translate-x-1/2 z-40 cursor-pointer group" onClick={handleEatCakePiece}>
                <div className="relative transition-all duration-700 transform origin-center scale-100 opacity-100 hover:scale-110 hover:rotate-6">
                  <div className="text-8xl animate-bounce drop-shadow-lg">🍰</div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <p className="text-sm font-nunito font-bold text-rose-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">Tap to Eat! 😋</p>
                  </div>
                </div>
              </div>
            )}

            <div className={`w-full flex flex-col items-center gap-4 transition-all duration-1000 transform ${cakeStep === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
              <div className="text-center px-4 pt-2">
                <p className={`text-lg md:text-xl font-nunito font-bold mb-1 italic drop-shadow-sm transition-all duration-700 ${cakePieceEaten ? 'text-amber-500' : 'text-rose-600'}`}>
                  {cakePieceEaten ? "Delicious! Yum yum yum! 😋" : "Here is your first sweet bite..."}
                </p>
                <p className="text-sm md:text-base text-pink-500 font-medium">
                  ...may your whole life be just as sweet. 🍰💖
                </p>
              </div>
              {cakePieceEaten && (
                <div className="flex flex-col items-center gap-3">
                  {showGiftButton && (
                    <button
                      onClick={handleNavigateToGifts}
                      className="px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-white font-nunito font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 active:scale-95 drop-shadow-lg animate-bounce"
                    >
                      🎁 Continue to Gifts →
                    </button>
                  )}
                  <button
                    onClick={handleCutAgain}
                    className="px-6 py-2 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-nunito font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95 drop-shadow-md"
                  >
                    🔪 Cut Again 🍰
                  </button>
                </div>
              )}
            </div>
          </div>
        );
        
      // --- FULL GIFTS PAGE WITH ALL 5 INTERACTIVE GIFTS ---
      case 'gift':
        return (
          <div className="flex flex-col items-center justify-between w-full h-full relative z-10 px-2 md:px-6 py-2 fade-in pt-10" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ touchAction: 'pan-y' }}>
            
            {giftParticles.length > 0 && (
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[2.5rem]">
                {giftParticles.map((gp) => (
                  <div 
                    key={gp.id} 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"
                    style={{
                      animation: `sparkleBurst 1.5s ease-out forwards`,
                      animationDelay: `${gp.delay}s`,
                      '--tx': `${gp.tx}px`,
                      '--ty': `${gp.ty}px`,
                      color: gp.color
                    }}
                  >
                    {gp.type === 'heart' ? <Heart size={14} fill="currentColor"/> : 
                     gp.type === 'star' ? <Stars size={14} fill="currentColor"/> : 
                     <Sparkle size={14} fill="currentColor"/>}
                  </div>
                ))}
              </div>
            )}
            
            <div className="h-20 w-full flex flex-col items-center justify-center shrink-0 z-20">
              <ElegantFade delay={100}>
                <h2 className="text-2xl md:text-3xl font-bold text-rose-500 font-dancing mb-1 text-center">
                  {giftTitles[currentGiftPage]}
                </h2>
              </ElegantFade>
              <ElegantFade delay={400}>
                <p className={`text-sm text-pink-500 font-nunito transition-opacity duration-1000 ${!giftsOpened[currentGiftPage] ? 'animate-pulse' : 'opacity-0'}`}>
                  {giftPrompts[currentGiftPage]}
                </p>
              </ElegantFade>
            </div>

            <div className="flex-1 w-full min-h-[340px] flex items-center justify-center relative my-2">
              
              {currentGiftPage === 0 && (
                <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group" onClick={() => !giftsOpened[0] && triggerGiftSparkles(0)}>
                  {giftsOpened[0] && (
                    <div className="absolute w-full h-full top-0 left-0 flex justify-center pointer-events-none">
                       {[...Array(12)].map((_, i) => (
                         <div key={i} className="absolute text-2xl animate-flower-bloom" style={{
                            '--tx': `${(i - 5.5) * 25}px`,
                            '--ty': `${-20 - Math.random() * 50}px`,
                            animationDelay: `${i * 0.08}s`
                         }}>
                            {['💖', '✨', '💫', '🌟'][Math.floor(Math.random()*4)]}
                         </div>
                       ))}
                    </div>
                  )}
                  <div className={`absolute transition-all duration-700 z-10 flex flex-col items-center w-full px-4 ${giftsOpened[0] ? 'opacity-100 top-[-10px] translate-y-0' : 'opacity-0 top-1/2 translate-y-10 pointer-events-none'}`}>
                     <div className="bg-white/95 backdrop-blur-md p-5 md:p-6 rounded-2xl shadow-xl border border-pink-100 text-center w-full max-w-[280px] relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center border border-white shadow-md">
                          <Heart className="w-6 h-6 text-rose-500 animate-heartbeat" fill="currentColor"/>
                        </div>
                        <h3 className="text-xl font-bold text-rose-600 font-dancing mt-4 mb-3">My Greatest Gift</h3>
                        <p className="text-sm text-pink-800 font-nunito leading-relaxed mb-4">The privilege of waking up knowing you are mine.</p>
                        <p className="text-xs text-rose-500 italic mb-4">You are my whole world</p>
                        <div className="flex justify-center gap-4 text-2xl">
                          <span className="animate-float-slow" style={{animationDelay: '0s'}}>🌍</span>
                          <span className="animate-float-slow" style={{animationDelay: '0.2s'}}>💍</span>
                          <span className="animate-float-slow" style={{animationDelay: '0.4s'}}>🧿</span>
                        </div>
                     </div>
                  </div>

                  <div className={`relative z-20 transition-all duration-700 ${giftsOpened[0] ? 'translate-y-28 scale-75 opacity-60' : 'translate-y-0 hover:scale-110'}`}>
                    <div className={`w-36 h-10 bg-gradient-to-b from-rose-300 to-rose-400 rounded-sm border-2 border-rose-400 relative z-20 shadow-lg hover:shadow-xl transition-shadow duration-500 origin-bottom-right ${giftsOpened[0] ? 'transform -translate-y-24 translate-x-12 rotate-12 opacity-0' : ''}`}>
                       <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-amber-100 border-x border-amber-200"></div>
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-end">
                         <div className="w-8 h-8 border-[3px] border-amber-200 rounded-[50%_50%_0_50%] transform rotate-45 translate-x-1"></div>
                         <div className="w-8 h-8 border-[3px] border-amber-200 rounded-[50%_50%_50%_0] transform -rotate-45 -translate-x-1"></div>
                       </div>
                    </div>
                    <div className="w-32 h-24 bg-gradient-to-br from-rose-400 to-rose-500 mx-auto rounded-b-md border-x-2 border-b-2 border-rose-500 relative shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-500 group-hover:from-rose-300 group-hover:to-rose-400">
                       <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-amber-200 border-x border-amber-300 shadow-inner"></div>
                       {giftsOpened[0] && <div className="absolute top-0 w-full h-4 bg-black/10 rounded-t-full blur-sm"></div>}
                    </div>
                  </div>
                </div>
              )}

              {currentGiftPage === 1 && (
                <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group" onClick={() => !giftsOpened[1] && triggerGiftSparkles(1)}>
                   <div className={`absolute transition-all duration-700 z-10 flex flex-col items-center w-full px-4 ${giftsOpened[1] ? 'opacity-100 top-[-10px] translate-y-0' : 'opacity-0 top-1/2 translate-y-10 pointer-events-none'}`}>
                      {giftsOpened[1] && (
                         <div className="absolute w-full h-full top-0 left-0 flex justify-center pointer-events-none">
                            {[...Array(12)].map((_, i) => (
                               <div key={i} className="absolute text-3xl animate-flower-bloom" style={{
                                  '--tx': `${(i - 5.5) * 35}px`,
                                  '--ty': `${-20 - Math.random() * 50}px`,
                                  animationDelay: `${i * 0.08}s`
                               }}>
                                  {['🌸', '🌷', '🌹', '🌺', '💐'][Math.floor(Math.random()*5)]}
                               </div>
                            ))}
                         </div>
                      )}
                      <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-pink-100 text-center w-full max-w-[260px] relative z-10">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center border border-white shadow-md">
                          <Flower2 className="w-6 h-6 text-rose-400" />
                        </div>
                        <h3 className="text-xl font-bold text-rose-600 font-dancing mt-4 mb-2">Eternal Flowers</h3>
                        <p className="text-rose-600 font-bold font-nunito text-sm mb-2">Real flowers fade...</p>
                        <p className="text-xs text-pink-800 font-medium leading-relaxed">But my love for you will bloom eternally and forever. 🌿💕</p>
                        <p className="text-rose-500 italic text-xs mt-2">You are my eternal garden of love</p>
                      </div>
                   </div>

                   <div className={`relative z-20 transition-all duration-700 ${giftsOpened[1] ? 'translate-y-28 scale-75 opacity-80' : 'translate-y-0 hover:scale-110'}`}>
                      <div className="w-32 h-40 bg-gradient-to-b from-pink-100 to-rose-100 rounded-b-2xl border-2 border-pink-300 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group-hover:from-pink-50 group-hover:to-rose-50">
                         <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent to-pink-200/50"></div>
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 h-3/4">
                           <div className="w-1.5 h-full bg-green-400 transform -rotate-6 rounded-full shadow-md"></div>
                           <div className="w-1.5 h-full bg-green-500 rounded-full shadow-md"></div>
                           <div className="w-1.5 h-full bg-green-400 transform rotate-6 rounded-full shadow-md"></div>
                         </div>
                      </div>
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-md z-20 group-hover:scale-125 transition-transform duration-300">
                         <Flower2 className="w-6 h-6 text-rose-500 animate-pulse" />
                      </div>
                   </div>
                </div>
              )}

              {currentGiftPage === 2 && (
                <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group" onClick={() => !giftsOpened[2] && triggerGiftSparkles(2)}>
                   <div className={`absolute transition-all duration-700 z-10 flex flex-col items-center w-full px-4 ${giftsOpened[2] ? 'opacity-100 top-[-10px] translate-y-0' : 'opacity-0 top-1/2 translate-y-10 pointer-events-none'}`}>
                    <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-pink-100 text-center w-full max-w-[280px] relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center border border-white shadow-md">
                        <Ticket className="w-6 h-6 text-rose-500 animate-pulse" />
                      </div>
                      <h3 className="text-xl font-bold text-rose-600 font-dancing mt-4 mb-2">Love Coupon Valid For Life</h3>
                      <ul className="text-xs text-pink-800 space-y-2 font-medium text-left mb-4">
                        <li>✅ Endless Cuddles & Hugs</li>
                        <li>✅ Late Night Deep Talks</li>
                        <li>✅ My Unconditional Love</li>
                        <li>✅ Forever & Always</li>
                      </ul>
                      <p className="text-rose-500 font-nunito text-sm italic">No expiry date ever! 💕</p>
                    </div>
                  </div>

                  <div className={`relative z-20 transition-all duration-700 ${giftsOpened[2] ? 'translate-y-32 scale-75 opacity-60' : 'translate-y-0 hover:scale-105'}`}>
                    <div className={`w-40 h-28 bg-gradient-to-r from-rose-300 to-pink-400 rounded-2xl border-2 border-dashed border-white shadow-xl flex flex-col items-center justify-center relative overflow-hidden group-hover:shadow-2xl transition-shadow ${giftsOpened[2] ? 'animate-pulse' : ''}`}>
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
                      <Ticket className="w-10 h-10 text-white mb-2 relative z-10" />
                      <p className="text-white font-bold tracking-widest uppercase text-sm relative z-10">Love Coupon</p>
                      <p className="text-white/80 text-xs mt-1 relative z-10 animate-bounce">Tap to Reveal</p>
                    </div>
                  </div>
                </div>
              )}

              {currentGiftPage === 3 && (
                <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group" onClick={() => !giftsOpened[3] && triggerGiftSparkles(3)}>
                   {giftsOpened[3] && (
                    <div className="absolute w-full h-full top-0 left-0 flex justify-center pointer-events-none">
                       {[...Array(15)].map((_, i) => (
                         <div key={i} className="absolute text-2xl animate-flower-bloom" style={{
                            '--tx': `${(Math.random() - 0.5) * 150}px`,
                            '--ty': `${-20 - Math.random() * 60}px`,
                            animationDelay: `${i * 0.1}s`
                         }}>
                            {['👑', '✨', '💖', '🌟'][Math.floor(Math.random()*4)]}
                         </div>
                       ))}
                    </div>
                  )}
                   <div className={`w-56 h-64 rounded-t-full rounded-b-xl border-4 border-rose-300 shadow-xl relative overflow-hidden transition-all duration-1000 group-hover:shadow-2xl ${giftsOpened[3] ? 'bg-gradient-to-br from-pink-100 to-rose-50' : 'bg-white/40 backdrop-blur-md hover:scale-110'}`}>
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 animate-bounce"><Crown className="w-7 h-7 text-rose-500"/></div>
                      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${giftsOpened[3] ? 'opacity-0' : 'opacity-100'}`}>
                         <p className="text-rose-600 font-nunito font-bold tracking-widest animate-pulse">Look inside...</p>
                      </div>
                      <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-all duration-1000 ${giftsOpened[3] ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                         <Heart className="w-12 h-12 text-rose-500 mb-4 animate-heartbeat" fill="currentColor"/>
                         <h3 className="text-rose-700 font-bold font-dancing text-xl mb-3">My Crown Jewel</h3>
                         <p className="text-rose-700 font-bold font-nunito text-sm leading-relaxed mb-2">
                           "The greatest gift I have ever received in this lifetime..."
                         </p>
                         <p className="text-rose-500 font-dancing text-2xl bg-pink-50 py-2 px-4 rounded-full border-2 border-pink-200">
                           ...is YOU.
                         </p>
                         <p className="text-rose-400 italic text-xs mt-3">My forever queen/king 👑</p>
                      </div>
                   </div>
                </div>
              )}

              {currentGiftPage === 4 && (
                <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group" onClick={() => !giftsOpened[4] && triggerGiftSparkles(4)}>
                  <div className={`absolute transition-all duration-700 z-10 flex flex-col items-center w-full px-4 ${giftsOpened[4] ? 'opacity-100 top-[-10px] translate-y-0' : 'opacity-0 top-1/2 translate-y-10 pointer-events-none'}`}>
                    {giftsOpened[4] && (
                      <div className="absolute w-full h-full top-0 left-0 flex justify-center pointer-events-none">
                         {[...Array(16)].map((_, i) => (
                            <div key={i} className="absolute text-2xl animate-flower-bloom" style={{
                               '--tx': `${(Math.random() - 0.5) * 150}px`,
                               '--ty': `${-20 - Math.random() * 50}px`,
                               animationDelay: `${i * 0.1}s`
                            }}>
                               💋
                            </div>
                         ))}
                      </div>
                    )}
                    <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-pink-100 text-center w-full max-w-[280px] relative z-10">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center border border-white shadow-md">
                        <span className="text-xl">🍯</span>
                      </div>
                      <h3 className="text-xl font-bold text-rose-600 font-dancing mt-4 mb-2">A Jar of Kisses</h3>
                      <p className="text-sm text-pink-800 font-nunito leading-relaxed mb-2">For those days when I can't be right next to you...</p>
                      <p className="text-rose-500 italic text-sm">Just open this jar and know how much I love you. Each kiss is filled with endless affection. 😘</p>
                    </div>
                  </div>

                  <div className={`relative z-20 transition-all duration-700 flex flex-col items-center ${giftsOpened[4] ? 'translate-y-28 scale-75 opacity-80' : 'translate-y-0 hover:scale-110'}`}>
                     <div className={`w-12 h-6 bg-amber-700/80 rounded-t-md border-b-2 border-amber-900 transition-all duration-700 origin-bottom mx-auto shadow-lg ${giftsOpened[4] ? 'transform -translate-y-16 -translate-x-8 -rotate-45 opacity-0' : ''}`}></div>
                     <div className="w-28 h-36 bg-gradient-to-b from-white/40 to-white/60 backdrop-blur-sm rounded-3xl border-2 border-white/70 shadow-[inset_0_0_20px_rgba(255,255,255,0.8),0_10px_20px_rgba(251,113,133,0.2)] relative overflow-hidden flex flex-col justify-end p-3 group-hover:shadow-2xl transition-shadow">
                        <div className="absolute top-2 left-2 w-5 h-20 bg-white/50 rounded-full blur-[2px]"></div>
                        <div className={`flex flex-wrap-reverse justify-center gap-2 transition-opacity duration-1000 ${giftsOpened[4] ? 'opacity-20' : 'opacity-100'}`}>
                           {[...Array(15)].map((_, i) => <Heart key={i} className="w-5 h-5 text-rose-500 animate-pulse" fill="currentColor" style={{animationDelay: `${i * 0.1}s`}}/> )}
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 px-3 py-1.5 rounded-full shadow-md border border-pink-200 flex items-center justify-center whitespace-nowrap">
                          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest font-nunito">Endless</span>
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {currentGiftPage === 5 && (
                <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group" onClick={() => !giftsOpened[5] && triggerGiftSparkles(5)}>
                  <div className={`absolute transition-all duration-700 z-10 flex flex-col items-center w-full px-4 ${giftsOpened[5] ? 'opacity-100 top-[-10px] translate-y-0' : 'opacity-0 top-1/2 translate-y-10 pointer-events-none'}`}>
                    <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-blue-100 text-center w-full max-w-[280px] relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center border border-white shadow-md">
                        <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-600 font-dancing mt-4 mb-2">Forever Adventure</h3>
                      <p className="text-sm text-blue-800 font-nunito leading-relaxed mb-3">A promise that every road ahead will be walked with you, hand in hand.</p>
                      <p className="text-rose-500 italic text-sm mb-3">Let's explore the world together! 🌍✈️</p>
                      <div className="flex justify-center gap-4 text-2xl">
                        <span className="animate-float-slow" style={{animationDelay: '0s'}}>🌍</span>
                        <span className="animate-float-slow" style={{animationDelay: '0.2s'}}>🗺️</span>
                        <span className="animate-float-slow" style={{animationDelay: '0.4s'}}>✈️</span>
                      </div>
                    </div>
                  </div>

                  <div className={`relative z-20 transition-all duration-700 ${giftsOpened[5] ? 'translate-y-28 scale-75 opacity-60' : 'translate-y-0 hover:scale-110'}`}>
                    <div className={`w-36 h-10 bg-gradient-to-b from-blue-300 to-cyan-400 rounded-sm border-2 border-blue-400 relative z-20 shadow-lg hover:shadow-xl transition-shadow origin-bottom-right ${giftsOpened[5] ? 'transform -translate-y-24 translate-x-12 rotate-12 opacity-0' : ''}`}>
                      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-white/70 border-x border-white/90"></div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-end">
                        <div className="w-8 h-8 border-[3px] border-cyan-100 rounded-[50%_50%_0_50%] transform rotate-45 translate-x-1"></div>
                        <div className="w-8 h-8 border-[3px] border-cyan-100 rounded-[50%_50%_50%_0] transform -rotate-45 -translate-x-1"></div>
                      </div>
                    </div>
                    <div className="w-32 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 mx-auto rounded-b-md border-x-2 border-b-2 border-cyan-500 relative shadow-xl overflow-hidden hover:shadow-2xl transition-shadow group-hover:from-blue-300 group-hover:to-cyan-400">
                      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-white/30 border-x border-white/40 shadow-inner"></div>
                    </div>
                  </div>
                </div>
              )}

              {currentGiftPage === 6 && (
                <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group" onClick={() => !giftsOpened[6] && triggerGiftSparkles(6)}>
                  <div className={`absolute transition-all duration-700 z-10 flex flex-col items-center w-full px-4 ${giftsOpened[6] ? 'opacity-100 top-[-10px] translate-y-0' : 'opacity-0 top-1/2 translate-y-10 pointer-events-none'}`}>
                    {giftsOpened[6] && (
                      <div className="absolute w-full h-full top-0 left-0 flex justify-center pointer-events-none">
                         {[...Array(14)].map((_, i) => (
                            <div key={i} className="absolute text-2xl animate-flower-bloom" style={{
                               '--tx': `${(Math.random() - 0.5) * 140}px`,
                               '--ty': `${-20 - Math.random() * 60}px`,
                               animationDelay: `${i * 0.09}s`
                            }}>
                               {['♾️', '💖', '🌙', '✨'][Math.floor(Math.random()*4)]}
                            </div>
                         ))}
                      </div>
                    )}
                    <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-pink-100 text-center w-full max-w-[280px] relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-fuchsia-50 rounded-full flex items-center justify-center border border-white shadow-md">
                        <Heart className="w-6 h-6 text-fuchsia-500 animate-heartbeat" fill="currentColor" />
                      </div>
                      <h3 className="text-xl font-bold text-fuchsia-600 font-dancing mt-4 mb-2">My Endless Future</h3>
                      <p className="text-sm text-fuchsia-800 font-nunito leading-relaxed mb-3">This gift holds all the tomorrows I want to spend making you smile and building our forever story.</p>
                      <p className="text-rose-500 italic text-sm mb-3">Forever with you starts now ♾️💕</p>
                      <div className="flex justify-center gap-4 text-2xl">
                        <span className="animate-float-slow" style={{animationDelay: '0s'}}>💖</span>
                        <span className="animate-float-slow" style={{animationDelay: '0.2s'}}>♾️</span>
                        <span className="animate-float-slow" style={{animationDelay: '0.4s'}}>🌙</span>
                      </div>
                    </div>
                  </div>

                  <div className={`relative z-20 transition-all duration-700 ${giftsOpened[6] ? 'translate-y-28 scale-75 opacity-60' : 'translate-y-0 hover:scale-110'}`}>
                    <div className={`w-36 h-10 bg-gradient-to-b from-fuchsia-300 to-purple-400 rounded-sm border-2 border-purple-400 relative z-20 shadow-lg hover:shadow-xl transition-shadow origin-bottom-right ${giftsOpened[6] ? 'transform -translate-y-24 translate-x-12 rotate-12 opacity-0' : ''}`}>
                      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-white/70 border-x border-white/90"></div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-end">
                        <div className="w-8 h-8 border-[3px] border-purple-100 rounded-[50%_50%_0_50%] transform rotate-45 translate-x-1"></div>
                        <div className="w-8 h-8 border-[3px] border-purple-100 rounded-[50%_50%_50%_0] transform -rotate-45 -translate-x-1"></div>
                      </div>
                    </div>
                    <div className="w-32 h-24 bg-gradient-to-br from-fuchsia-400 to-purple-500 mx-auto rounded-b-md border-x-2 border-b-2 border-purple-500 relative shadow-xl overflow-hidden hover:shadow-2xl transition-shadow group-hover:from-fuchsia-300 group-hover:to-purple-400">
                      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-white/30 border-x border-white/40 shadow-inner"></div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="w-full flex justify-center items-center mt-2 pt-4 border-t border-pink-100/60 shrink-0 px-2">
              <div className="w-full max-w-md">
                <FooterNavigation
                  currentIndex={currentGiftPage}
                  totalItems={totalGifts}
                  onPrevious={handlePrev}
                  onNext={handleNext}
                  isPrevDisabled={currentGiftPage === 0}
                  isNextDisabled={currentGiftPage === totalGifts - 1}
                  isAnimating={isAnimating}
                  tabName={`Gift`}
                  showProgressDots={true}
                  customLabels={{ prev: 'Previous', next: 'Next' }}
                />
              </div>
            </div>
          </div>
        );

      // --- STORY CHAPTERS PAGE ---
      case 'chapters':
      default:
        return (
          <div className="flex flex-col h-full w-full fade-in relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ touchAction: 'pan-y' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center mt-2">
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 backdrop-blur-md border border-pink-200 px-5 py-1.5 rounded-full shadow-[0_2px_10px_rgba(251,113,133,0.1)] flex items-center gap-2">
                <Stars className="w-3 h-3 text-rose-400" />
                <span className="text-[10px] md:text-xs font-bold text-rose-600 uppercase tracking-[0.25em] font-nunito mt-px">
                  Chapter {currentPage + 1} of {pages.length}
                </span>
                <Stars className="w-3 h-3 text-rose-400" />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-2 md:px-6 pt-12">
              {pages[currentPage].content}
            </div>

            <div className="w-full flex justify-center items-center mt-4 pt-4 border-t border-pink-100/60 relative z-10 shrink-0 px-2">
              <div className="w-full max-w-md">
                <FooterNavigation
                  currentIndex={currentPage}
                  totalItems={pages.length}
                  onPrevious={handlePrev}
                  onNext={handleNext}
                  isPrevDisabled={currentPage === 0}
                  isNextDisabled={currentPage === pages.length - 1}
                  isAnimating={isAnimating}
                  tabName="Chapter"
                  showProgressDots={true}
                  customLabels={{ prev: 'Previous', next: 'Next' }}
                />
              </div>
            </div>
          </div>
        );

      // --- CELEBRATION PAGE ---
      case 'celebration':
        return (
          <div className="flex-1 flex flex-col items-center justify-start w-full relative z-10 px-2 md:px-6 py-4 overflow-y-auto">
            
            {/* Floating Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-5 left-5 w-24 h-24 bg-rose-200/30 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '0s'}}></div>
              <div className="absolute top-32 right-8 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-amber-200/30 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-32 right-1/4 w-36 h-36 bg-purple-200/30 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '3s'}}></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full flex flex-col items-center gap-8 sm:gap-10">
              
              {/* PREMIUM HERO SECTION */}
              <div className="w-full text-center relative mt-4 px-3">
                <div className="space-y-4">
                  {/* Main Title */}
                  <div className="inline-block relative">
                    <div className="absolute -inset-6 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
                    <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 font-dancing drop-shadow-lg px-6 py-3">
                      🎉 YOU ARE AMAZING! 🎉
                    </h1>
                  </div>
                  
                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-pink-700 font-nunito font-semibold tracking-wide">
                    ✨ Today Celebrates Your Extraordinary Existence ✨
                  </p>
                  
                  {/* Animated Emojis */}
                  <div className="flex justify-center gap-3 mt-3">
                    <span className="text-4xl animate-bounce" style={{animationDelay: '0s'}}>💖</span>
                    <span className="text-4xl animate-bounce" style={{animationDelay: '0.15s'}}>✨</span>
                    <span className="text-4xl animate-bounce" style={{animationDelay: '0.3s'}}>🌟</span>
                    <span className="text-4xl animate-bounce" style={{animationDelay: '0.45s'}}>💕</span>
                  </div>

                  <div className="h-2 w-48 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mt-2"></div>
                </div>
              </div>

              {/* WHY YOU'RE SPECIAL - ENHANCED CARD */}
              <div className="w-full max-w-2xl bg-gradient-to-br from-white/95 via-rose-50/80 to-pink-50/60 rounded-3xl border-3 border-rose-200 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 to-pink-100/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-700 font-dancing mb-6 text-center">
                    💫 Why YOU Are So Special 💫
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="group bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-4 border-l-4 border-rose-400 hover:shadow-lg transition-all hover:scale-105 cursor-default">
                      <p className="text-sm sm:text-base font-nunito font-bold text-rose-700 group-hover:text-rose-900">✨ You light up my world</p>
                    </div>
                    <div className="group bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-4 border-l-4 border-pink-400 hover:shadow-lg transition-all hover:scale-105 cursor-default">
                      <p className="text-sm sm:text-base font-nunito font-bold text-pink-700 group-hover:text-pink-900">💕 You are my greatest treasure</p>
                    </div>
                    <div className="group bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-4 border-l-4 border-purple-400 hover:shadow-lg transition-all hover:scale-105 cursor-default">
                      <p className="text-sm sm:text-base font-nunito font-bold text-purple-700 group-hover:text-purple-900">🌟 You make every day adventure</p>
                    </div>
                    <div className="group bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-4 border-l-4 border-blue-400 hover:shadow-lg transition-all hover:scale-105 cursor-default">
                      <p className="text-sm sm:text-base font-nunito font-bold text-blue-700 group-hover:text-blue-900">🎉 Life is better with YOU</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QUALITIES GRID - 3x3 */}
              <div className="w-full max-w-2xl px-3">
                <h3 className="text-center text-xl sm:text-2xl font-bold text-rose-600 font-dancing mb-5">
                  🌈 Your Beautiful Qualities 🌈
                </h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="group bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-3 text-center border-2 border-rose-200 shadow-md hover:shadow-xl hover:shadow-rose-300/50 transition-all hover:scale-110 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl mb-2 animate-bounce">❤️</div>
                      <p className="text-xs sm:text-sm font-nunito font-bold text-rose-700">Amazing</p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-pink-50 to-amber-50 rounded-xl p-3 text-center border-2 border-pink-200 shadow-md hover:shadow-xl hover:shadow-pink-300/50 transition-all hover:scale-110 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl mb-2 animate-bounce" style={{animationDelay: '0.1s'}}>✨</div>
                      <p className="text-xs sm:text-sm font-nunito font-bold text-pink-700">Beautiful</p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl p-3 text-center border-2 border-amber-200 shadow-md hover:shadow-xl hover:shadow-amber-300/50 transition-all hover:scale-110 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl mb-2 animate-bounce" style={{animationDelay: '0.2s'}}>💎</div>
                      <p className="text-xs sm:text-sm font-nunito font-bold text-amber-700">Precious</p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 text-center border-2 border-purple-200 shadow-md hover:shadow-xl hover:shadow-purple-300/50 transition-all hover:scale-110 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl mb-2 animate-bounce" style={{animationDelay: '0.3s'}}>🌟</div>
                      <p className="text-xs sm:text-sm font-nunito font-bold text-purple-700">Incredible</p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-3 text-center border-2 border-cyan-200 shadow-md hover:shadow-xl hover:shadow-cyan-300/50 transition-all hover:scale-110 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl mb-2 animate-bounce" style={{animationDelay: '0.4s'}}>💫</div>
                      <p className="text-xs sm:text-sm font-nunito font-bold text-cyan-700">Radiant</p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-3 text-center border-2 border-red-200 shadow-md hover:shadow-xl hover:shadow-red-300/50 transition-all hover:scale-110 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-red-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl mb-2 animate-bounce" style={{animationDelay: '0.5s'}}>🔥</div>
                      <p className="text-xs sm:text-sm font-nunito font-bold text-red-700">Awesome</p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 text-center border-2 border-green-200 shadow-md hover:shadow-xl hover:shadow-green-300/50 transition-all hover:scale-110 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-green-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl mb-2 animate-bounce" style={{animationDelay: '0.6s'}}>🌸</div>
                      <p className="text-xs sm:text-sm font-nunito font-bold text-green-700">Wonderful</p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 text-center border-2 border-indigo-200 shadow-md hover:shadow-xl hover:shadow-indigo-300/50 transition-all hover:scale-110 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl mb-2 animate-bounce" style={{animationDelay: '0.7s'}}>⭐</div>
                      <p className="text-xs sm:text-sm font-nunito font-bold text-indigo-700">Stellar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* HEARTFELT MESSAGE */}
              <div className="w-full max-w-2xl bg-gradient-to-r from-rose-100/60 via-pink-100/60 to-purple-100/60 border-3 border-rose-300 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm">
                <p className="text-center text-sm sm:text-lg font-nunito font-bold text-rose-900 leading-relaxed">
                  Today and every day, you deserve all the love, happiness, and joy in the world. 
                  <br className="my-3"/>
                  <span className="text-xl sm:text-2xl text-rose-700 font-black block mt-3">Thank you for being YOU! 💕</span>
                </p>
              </div>

              {/* CTA BUTTONS SECTION */}
              <button
                onClick={() => setShowNightCelebrationModal(true)}
                className="relative group w-full max-w-sm"
                style={{ minHeight: '72px' }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:scale-110" />
                
                {/* Main button with gradient */}
                <div className="relative flex items-center justify-center h-full rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 backdrop-blur-md border-2 border-white/30 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/60 transition-all duration-300 group-hover:scale-105 overflow-hidden">
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                  </div>

                  {/* Floating particles around button */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `hsl(${280 + i * 30}, 100%, 60%)`,
                        left: `${Math.cos((i / 8) * Math.PI * 2) * 35 + 50}%`,
                        top: `${Math.sin((i / 8) * Math.PI * 2) * 35 + 50}%`,
                        animation: `float 4s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`
                      }}
                    />
                  ))}

                  <div className="relative flex items-center justify-center gap-3 flex-col sm:flex-row">
                    <span className="text-3xl sm:text-4xl animate-bounce">🌙</span>
                    <span className="text-white font-bold font-dancing text-lg sm:text-xl">Night Fireworks</span>
                    <span className="text-2xl animate-spin-slow">✨</span>
                  </div>
                </div>
              </button>

              {/* Special Surprise Video Button */}
              <button
                onClick={() => setShowSpecialSurpriseModal(true)}
                className="relative group w-full max-w-sm"
                style={{ minHeight: '72px' }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:scale-110" />
                
                {/* Main button with gradient */}
                <div className="relative flex items-center justify-center h-full rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-700 backdrop-blur-md border-2 border-white/30 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/60 transition-all duration-300 group-hover:scale-105 overflow-hidden">
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                  </div>

                  {/* Floating particles around button */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `hsl(${200 + i * 20}, 100%, 60%)`,
                        left: `${Math.cos((i / 8) * Math.PI * 2) * 35 + 50}%`,
                        top: `${Math.sin((i / 8) * Math.PI * 2) * 35 + 50}%`,
                        animation: `float 4s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`
                      }}
                    />
                  ))}

                  <div className="relative flex items-center justify-center gap-3 flex-col sm:flex-row">
                    <span className="text-3xl sm:text-4xl animate-bounce">🎁</span>
                    <span className="text-white font-bold font-dancing text-lg sm:text-xl">Special Video</span>
                    <span className="text-2xl animate-spin-slow">💫</span>
                  </div>
                </div>
              </button>

              {/* Special Blessings Cards - Enhanced Grid */}
              <div className="w-full max-w-2xl space-y-3">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-1">
                    💫 Special Blessings For You 💫
                  </h3>
                  <p className="text-xs text-pink-500 font-nunito">May these wishes find their way to your heart</p>
                </div>

                {/* Blessings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="group bg-gradient-to-br from-rose-50 via-white to-pink-50 border-2 border-rose-200 rounded-2xl p-4 hover:shadow-xl hover:shadow-rose-200/50 transition-all hover:scale-105 hover:-translate-y-1 cursor-default relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-200/0 via-rose-200/20 to-rose-200/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-2xl mb-2">✨</div>
                      <p className="text-sm text-rose-700 font-nunito font-semibold">Endless Joy</p>
                      <p className="text-xs text-rose-600 font-nunito italic mt-1">May your days be filled with boundless happiness and love</p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-pink-50 via-white to-amber-50 border-2 border-pink-200 rounded-2xl p-4 hover:shadow-xl hover:shadow-pink-200/50 transition-all hover:scale-105 hover:-translate-y-1 cursor-default relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-200/0 via-pink-200/20 to-pink-200/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-2xl mb-2">💖</div>
                      <p className="text-sm text-pink-700 font-nunito font-semibold">Deeply Cherished</p>
                      <p className="text-xs text-pink-600 font-nunito italic mt-1">May you always feel how profoundly you are loved</p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-amber-50 via-white to-rose-50 border-2 border-amber-200 rounded-2xl p-4 hover:shadow-xl hover:shadow-amber-200/50 transition-all hover:scale-105 hover:-translate-y-1 cursor-default relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-200/0 via-amber-200/20 to-amber-200/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-2xl mb-2">👑</div>
                      <p className="text-sm text-amber-700 font-nunito font-semibold">Always Special</p>
                      <p className="text-xs text-amber-600 font-nunito italic mt-1">May your heart forever know how extraordinary you are</p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-rose-50 via-white to-purple-50 border-2 border-purple-200 rounded-2xl p-4 hover:shadow-xl hover:shadow-purple-200/50 transition-all hover:scale-105 hover:-translate-y-1 cursor-default relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200/0 via-purple-200/20 to-purple-200/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-2xl mb-2">🌟</div>
                      <p className="text-sm text-purple-700 font-nunito font-semibold">Beautiful Year</p>
                      <p className="text-xs text-purple-600 font-nunito italic mt-1">May this year shine as brightly as your beautiful soul</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full max-w-sm h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>

              {/* Days Alive Counter */}
              <div className="bg-gradient-to-br from-white via-pink-50 to-white border-2 border-pink-200 rounded-2xl p-6 w-full max-w-sm text-center shadow-lg">
                <p className="text-xs uppercase tracking-widest text-pink-500 font-nunito font-bold mb-2">You've blessed this world for</p>
                <p className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 font-dancing">
                  {daysAlive}
                </p>
                <p className="text-xs uppercase tracking-widest text-pink-500 font-nunito font-bold mt-2">beautiful days</p>
              </div>

              {/* Main Birthday Message */}
              <div className="bg-gradient-to-br from-rose-100/50 via-pink-100/30 to-white border-2 border-rose-300 rounded-3xl p-6 w-full max-w-sm text-center shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-200/10 via-transparent to-pink-200/10"></div>
                <div className="relative">
                  <div className="flex justify-center gap-3 mb-4">
                    <span className="text-3xl animate-bounce" style={{animationDelay: '0s'}}>🎉</span>
                    <span className="text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>💕</span>
                    <span className="text-3xl animate-bounce" style={{animationDelay: '0.4s'}}>🎊</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-dancing text-rose-700 mb-2">
                    Happy Birthday!
                  </h3>
                  <p className="text-sm sm:text-base text-pink-700 font-nunito leading-relaxed">
                    You are loved more than words can express. Today and every day, you deserve all the happiness in the world. 💖
                  </p>
                </div>
              </div>

              {/* Bottom Decorative Elements */}
              <div className="flex justify-center gap-4 pb-4">
                <span className="text-2xl animate-float-slow" style={{animationDelay: '0s'}}>💌</span>
                <span className="text-2xl animate-float-slow" style={{animationDelay: '0.3s'}}>🎁</span>
                <span className="text-2xl animate-float-slow" style={{animationDelay: '0.6s'}}>💖</span>
              </div>
            </div>
          </div>
        );

    }
  };

  const bottomTabs = [
    {
      id: 'chapters',
      label: 'Story',
      title: 'Story Chapters',
      icon: BookHeart,
      onSelect: () => setActiveTab('chapters'),
    },
    {
      id: 'cake',
      label: 'Cake',
      title: 'Birthday Cake',
      icon: CakeIcon,
      onSelect: () => {
        setActiveTab('cake');
        setCakeStep(0);
      },
    },
    {
      id: 'gift',
      label: 'Gifts',
      title: 'Special Gifts',
      icon: GiftIcon,
      onSelect: () => setActiveTab('gift'),
    },
    {
      id: 'special',
      label: 'Special',
      title: 'Memory Vault',
      icon: Crown,
      onSelect: () => setActiveTab('special'),
    },
    {
      id: 'celebration',
      label: 'Party',
      title: 'Celebration',
      icon: Sparkles,
      onSelect: () => {
        setActiveTab('celebration');
        setCelebrationFireworks([]);
      },
    },
  ];

  return (
    <>
      {showIntroMessage && (
        <IntroMessage onComplete={() => {
          setShowIntroMessage(false);
        }} />
      )}
      
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap');
          
          .font-dancing { font-family: 'Dancing Script', cursive; }
          .font-nunito { font-family: 'Nunito', sans-serif; }
          
          .clip-triangle { clip-path: polygon(0 0, 50% 55%, 100% 0); }

          @keyframes elegantReveal {
            0% { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(4px); }
            to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes fall {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) translateX(50px);
              opacity: 0;
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes scaleIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>

      {/* Main Background */}
      <div className="fixed inset-0 -z-10 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fecdd3 35%, #f5d5f5 70%, #dbeafe 100%)' }}>
        <div className="absolute inset-0 opacity-35">
          {/* Decorative circles */}
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-pink-300 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 rounded-full bg-purple-300 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-yellow-300 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-rose-300 blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 flex flex-col" style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)' }}></div>

      {/* Main Container - Single Page Scroll */}
      <div
        className="flex min-h-[100dvh] w-full flex-col items-center overflow-x-hidden"
        style={{
          scrollBehavior: 'smooth',
          paddingBottom: 'calc(6.75rem + var(--safe-area-bottom))'
        }}
      >
        {/* Main Card */}
        <div 
          className="relative z-10 w-full flex flex-col items-center flex-1"
          style={{
            paddingLeft: 'max(0.5rem, clamp(0.5rem, 3vw, 2rem))',
            paddingRight: 'max(0.5rem, clamp(0.5rem, 3vw, 2rem))',
            paddingTop: 'clamp(0.75rem, 2.5vw, 2rem)',
            paddingBottom: 'clamp(1rem, 4vw, 2rem)'
          }}
        >
          <div 
            className={`
              w-full max-w-5xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_40px_rgba(253,164,175,0.2),inset_0_0_0_1px_rgba(255,255,255,0.5)] 
              rounded-[2.5rem] flex flex-col items-center relative
              page-transition ${isAnimating ? 'page-hidden' : 'page-visible'}
            `}
            style={{
              padding: 'clamp(1rem, 4vw, 2rem)',
              paddingBottom: 'clamp(1.25rem, 4vw, 2.5rem)',
              minHeight: 'auto',
              maxHeight: 'none',
              overflow: 'visible'
            }}
          >
            <div className="absolute top-0 inset-x-0 h-1/4 bg-gradient-to-b from-white/70 to-transparent pointer-events-none rounded-t-[2.5rem]"></div>
            
            <div className="w-full relative z-10">
              {renderContent()}
            </div>

          </div>
        </div>

        {/* Bottom Tab Navigation - Fixed */}
        <nav
          className="fixed inset-x-0 bottom-0 z-50 w-full"
          aria-label="Birthday sections"
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/96 to-transparent" />
          <div
            className="relative mx-auto w-full max-w-3xl px-2 pb-2 sm:px-4 sm:pb-3"
            style={{ paddingBottom: 'max(0.5rem, var(--safe-area-bottom))' }}
          >
            <div className="grid grid-cols-5 gap-1 rounded-[1.45rem] border border-white/80 bg-white/86 p-1.5 shadow-[0_18px_56px_rgba(124,58,237,0.16),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl sm:gap-2 sm:rounded-full sm:p-2">
              {bottomTabs.map(({ id, label, title, icon: Icon, onSelect }) => {
                const isActive = activeTab === id;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={onSelect}
                    title={title}
                    aria-label={title}
                    aria-current={isActive ? 'page' : undefined}
                    className={`
                      touch-press-effect flex min-h-[58px] min-w-0 flex-col items-center justify-center gap-1 rounded-[1.1rem]
                      px-1 py-2 font-nunito font-black transition-all duration-300 sm:min-h-[64px] sm:rounded-full sm:px-4
                      ${isActive
                        ? 'bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 text-white shadow-[0_14px_34px_rgba(225,29,72,0.28),inset_0_1px_0_rgba(255,255,255,0.35)] scale-[1.02]'
                        : 'text-pink-600 hover:bg-white hover:text-rose-600 hover:shadow-[0_10px_24px_rgba(244,63,94,0.10)] active:scale-95'}
                    `}
                  >
                    <Icon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2.4} />
                    <span className="w-full truncate text-center text-[9px] uppercase leading-none tracking-[0.08em] sm:text-[11px] sm:tracking-[0.16em]">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

      </div>

      {/* Intro Celebration Popup - Love Rain & Message */}
      {showIntroCelebration && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[100]">
          {/* Love Rain Falling Animation */}
          {loveRain.map((particle) => (
            <div
              key={particle.id}
              className="fixed pointer-events-none text-3xl sm:text-4xl md:text-5xl"
              style={{
                left: `${particle.left}%`,
                top: '-50px',
                animation: `fall ${particle.duration}s linear forwards`,
                animationDelay: `${particle.delay}s`,
                fontSize: `${particle.size}px`,
                textShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
                opacity: 0.8,
              }}
            >
              {particle.type === 'heart' && '💕'}
              {particle.type === 'petal' && '🌹'}
              {particle.type === 'star' && '✨'}
              {particle.type === 'sparkle' && '💫'}
            </div>
          ))}

          {/* Beautiful Popup Modal */}
          <div
            className="absolute fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center pointer-events-auto z-[101]"
            style={{
              animation: 'fadeIn 0.5s ease-out forwards',
              animationDelay: '0.5s',
              opacity: 0,
            }}
          >
            <div
              className="relative bg-gradient-to-br from-white via-pink-50/80 to-white rounded-3xl shadow-2xl border-2 border-pink-200 p-8 md:p-12 max-w-md mx-4 text-center"
              style={{
                animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                animationDelay: '0.8s',
                transform: 'scale(0)',
              }}
            >
              {/* Decorative sparkles */}
              <div className="absolute -top-3 -left-3 text-3xl animate-bounce">✨</div>
              <div className="absolute -top-3 -right-3 text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>💕</div>
              <div className="absolute -bottom-3 -left-3 text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>🌹</div>
              <div className="absolute -bottom-3 -right-3 text-3xl animate-bounce" style={{ animationDelay: '0.6s' }}>💫</div>

              {/* Heart Icon */}
              <div className="flex justify-center mb-4">
                <Heart className="w-16 h-16 text-pink-500 fill-pink-500 animate-pulse" />
              </div>

              {/* Main Message */}
              <h2 className="font-dancing text-4xl md:text-5xl text-rose-600 mb-3 drop-shadow-md leading-tight">
                Welcome, My Love! 💌
              </h2>

              <p className="font-nunito text-pink-700 text-sm md:text-base mb-2 leading-relaxed">
                The seal is broken...
              </p>

              <p className="font-nunito text-pink-600 text-lg md:text-xl italic font-semibold mb-6">
                Your special story awaits ✨
              </p>

              {/* Divider */}
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mb-6"></div>

              {/* Sub-message */}
              <p className="font-dancing text-2xl text-rose-500 mb-2">
                Let's celebrate YOU
              </p>

              <p className="font-nunito text-xs md:text-sm text-pink-500 tracking-widest uppercase mb-4">
                ✦ Every moment, every memory, every love ✦
              </p>

              {/* Animated Button */}
              <button
                className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-nunito font-bold text-sm md:text-base tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse"
                onClick={() => setShowIntroCelebration(false)}
              >
                Begin The Journey 💖
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Night Celebration Fireworks Modal */}
      <NightCelebrationFireworks
        isOpen={showNightCelebrationModal}
        onClose={() => setShowNightCelebrationModal(false)}
      />

      {/* Special Surprise Modal */}
      {showSpecialSurpriseModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-md sm:items-center sm:p-4" style={{ animation: 'fadeIn 0.3s ease-out forwards' }}>
          <div className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/18 bg-gradient-to-br from-slate-950 via-violet-950 to-rose-950 text-white shadow-[0_32px_120px_rgba(15,23,42,0.58)] sm:max-h-[90vh]" style={{ animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(236,72,153,0.36),transparent_30%),radial-gradient(circle_at_82%_22%,rgba(34,211,238,0.26),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(251,191,36,0.18),transparent_34%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 via-violet-400 to-cyan-300" />
            
            {/* Close Button */}
            <button
              onClick={() => setShowSpecialSurpriseModal(false)}
              className="birthday-icon-button absolute right-4 top-4 z-20 h-11 w-11 rounded-full text-rose-600"
              aria-label="Close special video"
            >
              <span className="text-2xl">✕</span>
            </button>

            {/* Header */}
            <div className="relative p-5 pb-3 text-center sm:p-7 sm:pb-4">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
              <div className="relative">
                <div className="text-6xl mb-3 animate-bounce">🎁</div>
                <h2 className="mt-2 font-dancing text-4xl font-bold leading-tight text-white sm:text-5xl">Special Surprise</h2>
              </div>
            </div>

            {/* Content */}
            <div className="relative flex min-h-0 flex-1 flex-col items-center gap-5 overflow-y-auto px-4 pb-5 sm:px-7 sm:pb-7">
              <div className="w-full max-w-2xl mx-auto shrink-0 overflow-hidden rounded-[1.75rem] border border-white/20 bg-black p-2 shadow-[0_28px_80px_rgba(0,0,0,0.42)] aspect-video">
                <iframe
                  src={specialSurpriseVideoUrl}
                  title="Special Surprise Video"
                  className="h-full w-full rounded-[1.25rem]"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="w-full max-w-2xl shrink-0 space-y-4 text-center">
                <p className="px-2 font-nunito text-sm font-semibold leading-relaxed text-white/76 sm:text-base">
                  A personal video message made just for you.
                </p>

                <div className="rounded-2xl border border-cyan-200/22 bg-cyan-100/10 p-5 shadow-sm backdrop-blur">
                  <p className="text-sm text-cyan-100 font-nunito font-bold">
                    Special moments, beautifully presented
                  </p>
                  <div className="flex justify-center gap-2 pt-2">
                    <span className="text-xl animate-pulse">✨</span>
                    <span className="text-xl animate-pulse" style={{animationDelay: '0.2s'}}>💫</span>
                    <span className="text-xl animate-pulse" style={{animationDelay: '0.4s'}}>🌟</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowSpecialSurpriseModal(false)}
                  className="birthday-action-primary w-full rounded-2xl px-4 py-3 font-nunito text-xs font-extrabold uppercase tracking-[0.16em] transition-all duration-300"
                >
                  Close Surprise ✨
                </button>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -bottom-4 -left-4 text-5xl opacity-20 animate-float-slow">🎁</div>
            <div className="absolute -top-8 -right-4 text-6xl opacity-20 animate-float-slow" style={{animationDelay: '0.3s'}}>✨</div>
          </div>
        </div>
      )}

      {/* Gift Showcase Popup */}
      <GiftShowcasePopup
        isOpen={showGiftShowcase}
        onClose={() => setShowGiftShowcase(false)}
        giftsOpened={giftsOpened}
        onGiftOpen={triggerGiftSparkles}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default App;
