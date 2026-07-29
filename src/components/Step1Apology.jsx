import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, HeartHandshake, Film } from 'lucide-react';
import { sendApologyAcceptedNotification } from '../services/emailService';

export const Step1Apology = ({ onNext }) => {
  const videoSrc = encodeURI("/WhatsApp Video 2026-07-29 at 7.31.32 PM.mp4");

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
      className="w-full max-w-5xl mx-auto px-4 py-4 relative z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Left / Video Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card p-4 sm:p-5 relative overflow-hidden flex flex-col items-center justify-center order-2 lg:order-1"
        >
          {/* Background Glow */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />

          {/* Header pill */}
          <div className="w-full flex items-center justify-between mb-3 px-1">
            <span className="glass-pill px-3 py-1 text-xs font-semibold text-pink-300 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-red-400" />
              <span>A Special Memory For You 💖</span>
            </span>
            <span className="text-sm text-pink-300/80 font-medium">🍅❤️</span>
          </div>

          {/* Video Player */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-pink-500/30 shadow-[0_0_25px_rgba(255,77,77,0.25)] bg-black/50 flex items-center justify-center">
            <video
              src={videoSrc}
              controls
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-h-[440px] object-cover rounded-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        {/* Right / Apology Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 sm:p-8 text-center relative overflow-hidden order-1 lg:order-2"
        >
          {/* Soft Background Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Cute Animated Tomato Mascot */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative inline-block my-2"
          >
            <div className="text-7xl sm:text-8xl filter drop-shadow-[0_10px_25px_rgba(255,77,77,0.5)]">
              🍅
            </div>
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full p-1.5 text-xs shadow-lg border border-pink-300"
            >
              <Heart className="w-4 h-4 fill-current" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 glow-text font-['Outfit']">
            I'm So Sorry, My Tomato... 🍅❤️
          </h1>

          <p className="text-pink-200/90 text-sm sm:text-base mb-4 leading-relaxed max-w-md mx-auto">
            I know I messed up, and my heart breaks knowing I hurt you. You mean the absolute world to me, and I want to make things right.
          </p>

          <div className="mb-6 inline-block bg-gradient-to-r from-red-500/25 via-pink-500/25 to-red-500/25 py-2.5 px-5 rounded-2xl border border-pink-400/40 shadow-[0_0_15px_rgba(255,77,77,0.3)]">
            <p className="text-white font-extrabold text-base sm:text-lg tracking-wide glow-text">
              Ek chance de pls... Will you forgive your Paglu? 🥺🙏❤️
            </p>
          </div>

          {/* Two Accepting Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleAccept("Forgive You ❤️")}
              className="btn-primary w-full sm:w-auto justify-center group text-sm py-2.5 px-5"
            >
              <Heart className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>Forgive You ❤️</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleAccept("Definitely Forgive You 🍅")}
              className="btn-secondary w-full sm:w-auto justify-center group text-sm py-2.5 px-5"
            >
              <HeartHandshake className="w-4 h-4 group-hover:scale-110 transition-transform text-pink-200" />
              <span>Definitely Forgive You 🍅</span>
            </motion.button>
          </div>

          <div className="mt-6 text-xs text-pink-300/70 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Both choices lead straight to my heart</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
