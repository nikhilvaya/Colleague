import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, HeartHandshake } from 'lucide-react';
import { sendApologyAcceptedNotification } from '../services/emailService';

export const Step1Apology = ({ onNext }) => {

  const handleAccept = (buttonChosen) => {
    // Fire festive heart confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d4d', '#e63946', '#ff758f', '#ffffff']
    });

    // EmailJS Trigger 2
    sendApologyAcceptedNotification(buttonChosen);

    // Proceed to Step 2 (10 Reasons)
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-xl mx-auto px-4 py-8 text-center relative z-10"
    >
      <div className="glass-card p-8 sm:p-12 text-center relative overflow-hidden">
        {/* Soft Background Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl" />

        {/* Cute Animated Tomato Mascot */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative inline-block my-4"
        >
          <div className="text-8xl sm:text-9xl filter drop-shadow-[0_10px_25px_rgba(255,77,77,0.5)]">
            🍅
          </div>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full p-2 text-sm shadow-lg border border-pink-300"
          >
            <Heart className="w-5 h-5 fill-current" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 glow-text font-['Outfit']">
          I'm So Sorry, My Tomato... 🍅❤️
        </h1>

        <p className="text-pink-200/90 text-base sm:text-lg mb-8 leading-relaxed max-w-md mx-auto">
          I know I messed up, and my heart breaks knowing I hurt you. You mean the absolute world to me, and I want to make things right. Will you forgive your Paglu? 🥺
        </p>

        {/* Two Accepting Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAccept("Forgive You ❤️")}
            className="btn-primary w-full sm:w-auto justify-center group"
          >
            <Heart className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
            <span>Forgive You ❤️</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAccept("Definitely Forgive You 🍅")}
            className="btn-secondary w-full sm:w-auto justify-center group"
          >
            <HeartHandshake className="w-5 h-5 group-hover:scale-110 transition-transform text-pink-200" />
            <span>Definitely Forgive You 🍅</span>
          </motion.button>
        </div>

        <div className="mt-8 text-xs text-pink-300/70 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Both choices lead straight to my heart</span>
        </div>
      </div>
    </motion.div>
  );
};
