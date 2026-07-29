import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { TomatoCanvas } from './components/TomatoCanvas';
import { Step1Apology } from './components/Step1Apology';
import { Step2Reasons } from './components/Step2Reasons';
import { Step3FinalChance } from './components/Step3FinalChance';
import { sendWebsiteOpenedNotification } from './services/emailService';

export function App() {
  const [step, setStep] = useState(1);

  // EmailJS Trigger 1: Send notification when user opens website
  useEffect(() => {
    sendWebsiteOpenedNotification();
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* Dynamic Animated Tomato & Heart Background */}
      <TomatoCanvas />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center pt-20 pb-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <Step1Apology key="step1" onNext={() => setStep(2)} />
          )}

          {step === 2 && (
            <Step2Reasons key="step2" onNext={() => setStep(3)} />
          )}

          {step === 3 && (
            <Step3FinalChance key="step3" onRestart={() => setStep(2)} />
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 text-center py-4 text-xs text-pink-300/60 font-medium">
        Made with endless love & 🍅 for my universe
      </footer>
    </div>
  );
}

export default App;
