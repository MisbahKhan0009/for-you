import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Headphones, Volume2 } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  onAudioEnabled: () => void;
  isAudioReady: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  onAudioEnabled,
  isAudioReady 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate how often to update to reach 100% in 10 seconds
    const interval = 10000 / 100; // 100ms per 1%
    
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 100) {
          clearInterval(timer);
          onLoadingComplete();
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#355070] flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-24 h-24 border-4 border-[#eaac8b] rounded-full border-t-transparent"
      />
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-[#eaac8b] text-2xl mt-8 font-semibold"
      >
        Loading...
      </motion.h2>
      
      {/* Progress percentage */}
      <div className="mt-4 w-64 relative">
        <div className="h-2 bg-[#355070] border border-[#eaac8b]/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#eaac8b]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-[#eaac8b] text-sm mt-2 text-center">{progress}%</p>
      </div>
      
      {/* Audio enable button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={onAudioEnabled}
        className={`mt-8 flex items-center gap-2 px-4 py-2 rounded-full ${
          isAudioReady ? "bg-[#eaac8b] text-[#355070]" : "bg-[#355070] border border-[#eaac8b] text-[#eaac8b]"
        } transition-colors duration-300`}
      >
        <Volume2 className="w-5 h-5" />
        <span>{isAudioReady ? "Audio Enabled" : "Enable Audio"}</span>
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 flex items-center text-white/80 space-x-2"
      >
        <Headphones className="w-5 h-5" />
        <span>Please use headphones for the best experience</span>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;