import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Coffee, Smile, Shield, Flame, Compass, Home, Star, Flower2, Infinity as InfinityIcon } from 'lucide-react';
import { reasons } from '../data/reasons';
import confetti from 'canvas-confetti';
import { sendReasonsViewedNotification } from '../services/emailService';

// Custom icons per reason
const reasonIcons = {
  1: Compass,
  2: Coffee,
  3: Smile,
  4: Shield,
  5: Flame,
  6: Sparkles,
  7: Home,
  8: Star,
  9: Flower2,
  10: InfinityIcon
};

export const Step2Reasons = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentReason = reasons[currentIndex];
  const IconComponent = reasonIcons[currentReason.id] || Heart;

  // Send Email notification on index change
  useEffect(() => {
    sendReasonsViewedNotification(currentIndex + 1, currentReason.title);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < reasons.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);

      // Micro confetti pop every 3 cards
      if ((currentIndex + 1) % 3 === 0) {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#ff4d4d', '#ff758f']
        });
      }
    } else {
      // Completed all 10 cards -> trigger big confetti & proceed
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.92
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.92
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto px-4 py-6 relative z-10"
    >
      {/* Header Info */}
      <div className="text-center mb-6">
        <span className="glass-pill px-4 py-1.5 text-xs font-semibold text-pink-300 tracking-wider uppercase inline-flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>Why You Are Essential to Me</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white glow-text font-['Outfit']">
          10 Reasons You Are My Universe 🍅
        </h2>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto mt-4 bg-red-950/60 rounded-full h-2.5 p-0.5 border border-red-500/30">
          <div
            className="bg-gradient-to-r from-red-500 to-pink-500 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(255,77,77,0.8)]"
            style={{ width: `${((currentIndex + 1) / reasons.length) * 100}%` }}
          />
        </div>
        <div className="text-xs text-pink-300/80 mt-1 font-medium">
          Reason {currentIndex + 1} of {reasons.length}
        </div>
      </div>

      {/* Interactive Card */}
      <div className="relative min-h-[380px] flex items-center justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentReason.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass-card w-full p-6 sm:p-10 relative overflow-hidden"
          >
            {/* Card Accent Glow */}
            <div
              className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-40 pointer-events-none"
              style={{ backgroundColor: currentReason.accent }}
            />

            {/* Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-pink-300 glass-pill px-3 py-1 border border-pink-400/20">
                {currentReason.badge}
              </span>
              <span className="text-3xl filter drop-shadow-md">
                {currentReason.emoji}
              </span>
            </div>

            {/* Title */}
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mt-1">
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug font-['Outfit']">
                {currentReason.title}
              </h3>
            </div>

            {/* Content Body */}
            <p
              className="text-pink-100/90 text-base sm:text-lg leading-relaxed mb-6 font-normal whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: currentReason.content }}
            />

            {/* Card Footer Info */}
            <div className="pt-4 border-t border-pink-500/15 flex items-center justify-between text-xs text-pink-300/70">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
                With all my love
              </span>
              <span className="font-mono">#{currentIndex + 1} / 10</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`glass-pill px-4 py-2.5 text-sm font-semibold flex items-center gap-1.5 transition-all ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed text-gray-500'
              : 'text-pink-200 hover:text-white hover:border-red-400/50 hover:scale-105 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          className="btn-primary px-6 py-3 text-sm font-bold flex items-center gap-2"
        >
          <span>{currentIndex === reasons.length - 1 ? "Complete & Final Chance ❤️" : "Next Reason"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
