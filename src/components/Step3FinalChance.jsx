import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper, CheckCircle2, RefreshCw } from 'lucide-react';
import { sendFinalChanceAcceptedNotification } from '../services/emailService';

export const Step3FinalChance = ({ onRestart }) => {
  const [accepted, setAccepted] = useState(false);
  const [chosenOption, setChosenOption] = useState('');

  const handleFinalAccept = (optionText) => {
    setChosenOption(optionText);
    setAccepted(true);

    // Continuous romantic confetti blast
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#ff4d4d', '#ffffff']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#e63946', '#ff758f']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#ff4d4d', '#ffd166', '#ffffff']
    });

    // EmailJS Trigger 4
    sendFinalChanceAcceptedNotification(optionText);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-xl mx-auto px-4 py-8 relative z-10"
    >
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="ask-chance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-8 sm:p-12 text-center relative overflow-hidden"
          >
            {/* Animated Tomato Heart Icon */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-8xl my-4 inline-block filter drop-shadow-[0_10px_30px_rgba(255,77,77,0.6)]"
            >
              🥺🍅❤️
            </motion.div>

            <span className="glass-pill px-4 py-1.5 text-xs font-bold text-pink-300 tracking-wide uppercase inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>One Last Honest Request</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white glow-text mb-4 font-['Outfit']">
              I am really, really sorry...
            </h2>

            <p className="text-pink-100 text-xl font-bold mb-8 text-pink-200">
              "Pls ek chance de..." 🥺❤️
            </p>

            <p className="text-pink-200/90 text-base mb-8 max-w-md mx-auto leading-relaxed">
              I promise to cherish every second with you, listen more, love deeper, and make sure your cute smile never fades.
            </p>

            {/* Two Final Acceptance Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFinalAccept("Give 1 Chance ❤️")}
                className="btn-primary w-full sm:w-auto justify-center"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>Give 1 Chance ❤️</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFinalAccept("Give 1000 Chances 🍅")}
                className="btn-secondary w-full sm:w-auto justify-center"
              >
                <PartyPopper className="w-5 h-5 text-pink-200" />
                <span>Give 1000 Chances 🍅</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="glass-card p-8 sm:p-12 text-center relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-8xl my-4 inline-block filter drop-shadow-[0_15px_35px_rgba(255,77,77,0.7)]"
            >
              🎉🍅💖
            </motion.div>

            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-500/30 mb-4">
              <CheckCircle2 className="w-4 h-4" />
              <span>Accepted: {chosenOption}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white glow-text mb-4 font-['Outfit']">
              THANK YOU MY TOMATO! 🍅❤️
            </h2>

            <p className="text-pink-100 text-lg mb-8 leading-relaxed max-w-md mx-auto">
              You've officially made me the happiest person in the universe! I promise to treat you like the precious treasure you are. Forever your Paglu! 🤍
            </p>

            <button
              onClick={onRestart}
              className="glass-pill px-6 py-2.5 text-sm font-semibold text-pink-200 hover:text-white flex items-center justify-center gap-2 mx-auto transition-all hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Read Reasons Again 📜</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
