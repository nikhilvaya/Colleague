import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';

export const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => {
    // Soft romantic ambient synth sound
    const audioObj = new Audio('https://assets.mixkit.co/music/preview/mixkit-romantic-breeze-100.mp3');
    audioObj.loop = true;
    audioObj.volume = 0.35;
    return audioObj;
  });

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(e => console.log('Audio play error:', e));
    }
  };

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between pointer-events-auto">
      <div className="flex items-center gap-2 glass-pill px-4 py-2 text-red-200 text-sm font-semibold shadow-lg">
        <span className="text-xl animate-bounce">🍅</span>
        <span className="tracking-wide font-bold">Tomato Apology Edition</span>
        <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '4s' }} />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleAudio}
          className="glass-pill px-3 py-2 text-xs text-pink-200 hover:text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          title={isPlaying ? "Mute Background Music" : "Play Romantic Music"}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="hidden sm:inline">Playing Music ♪</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-pink-300" />
              <span className="hidden sm:inline">Romantic Music</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
