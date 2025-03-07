import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Stars, Coffee, Gift, Music, Calendar, Camera, MessageCircleHeart, Clock, Frown, Sparkles, Infinity } from 'lucide-react';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  const memories = [
    {
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      title: "Our First Date",
      description: "Remember that magical evening at the café?"
    },
    {
      image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?w=800",
      title: "Beach Sunset",
      description: "Watching the sunset together on the beach"
    },
    {
      image: "https://images.unsplash.com/photo-1605493725784-75cf3c4dd72e?w=800",
      title: "Movie Night",
      description: "Our cozy movie nights are everything"
    },
    {
      image: "https://images.unsplash.com/photo-1515478473590-2f67743e3f09?w=800",
      title: "First Concert Together",
      description: "Dancing and singing our hearts out"
    },
    {
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
      title: "Park Picnic",
      description: "That perfect spring afternoon with you"
    },
    {
      image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800",
      title: "Road Trip Adventure",
      description: "Getting lost and finding ourselves together"
    }
  ];

  const reasons = [
    "Your smile brightens even my darkest days",
    "The way you understand me without words",
    "Your incredible strength and determination",
    "How you make everyone around you feel special",
    "The sound of your laughter is my favorite melody"
  ];

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          transform: `translate(${cursorPosition.x - 16}px, ${cursorPosition.y - 16}px)`,
        }}
      />
      
      <div className="min-h-screen relative overflow-hidden">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 py-16 text-center relative z-10"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800"
            alt="Romantic Scene"
            className="w-64 h-64 object-cover rounded-full mx-auto mb-8 floating"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <motion.h1
            className="text-6xl font-bold text-[#eaac8b] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            I'm Sorry
          </motion.h1>

          <motion.p
            className="text-xl text-white mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Every moment without your smile feels like an eternity. I know I made a mistake, 
            and I'm truly sorry. You mean the world to me, and I promise to do better.
          </motion.p>

          {/* My Faults Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16 bg-[#355070]/30 p-8 rounded-2xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-center mb-6">
              <Frown className="w-8 h-8 text-[#e56b6f] mr-3" />
              <h2 className="text-4xl font-bold text-[#eaac8b]">Where I Went Wrong</h2>
            </div>
            <div className="text-white space-y-4">
              <p className="text-lg">I acknowledge my mistakes and take full responsibility for:</p>
              <ul className="list-disc list-inside space-y-2 text-left max-w-2xl mx-auto">
                <li>Not giving you the attention you deserve</li>
                <li>Taking your feelings for granted</li>
                <li>Being inconsiderate of your time and efforts</li>
                <li>Not communicating openly and honestly</li>
              </ul>
            </div>
          </motion.div>

          {/* Why I Love You Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16 bg-[#6d597a]/20 p-8 rounded-2xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-[#eaac8b] mr-3" />
              <h2 className="text-4xl font-bold text-[#eaac8b]">Why I Love You</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  className="bg-[#355070]/30 p-4 rounded-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Heart className="w-6 h-6 text-[#e56b6f] mb-2" />
                  <p className="text-white">{reason}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Promise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {[
              { icon: Heart, text: "My heart beats only for you" },
              { icon: Stars, text: "You're my guiding star" },
              { icon: Coffee, text: "Let's make new memories" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#355070]/30 p-6 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <item.icon className="w-12 h-12 text-[#eaac8b] mx-auto mb-4 heart-beat" />
                <p className="text-white">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* My Promises Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16 bg-[#6d597a]/20 p-8 rounded-2xl backdrop-blur-sm"
          >
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">My Promises</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Clock, text: "I'll always make time for you" },
                { icon: MessageCircleHeart, text: "I'll communicate better" },
                { icon: Calendar, text: "I'll prioritize our dates" },
                { icon: Camera, text: "I'll create more memories with you" },
              ].map((promise, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 text-white p-4 rounded-lg bg-[#355070]/30"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <promise.icon className="w-6 h-6 text-[#e56b6f]" />
                  <span>{promise.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Future Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16 bg-[#355070]/30 p-8 rounded-2xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-center mb-6">
              <Infinity className="w-8 h-8 text-[#eaac8b] mr-3" />
              <h2 className="text-4xl font-bold text-[#eaac8b]">Our Future Together</h2>
            </div>
            <p className="text-white text-lg mb-6">
              I see a beautiful future ahead of us, filled with love, laughter, and countless adventures.
              Every day with you is a gift, and I promise to cherish each moment we share.
            </p>
          </motion.div>

          {/* Memories Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto mb-16 overflow-hidden"
          >
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">Our Beautiful Memories</h2>
            <div className="flex space-x-6 px-4 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {memories.map((memory, index) => (
                <motion.div
                  key={index}
                  className="bg-[#355070]/30 rounded-xl overflow-hidden backdrop-blur-sm flex-none w-80 snap-center"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                >
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-[#eaac8b] font-bold text-xl mb-2">{memory.title}</h3>
                    <p className="text-white">{memory.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.button
            className="bg-[#e56b6f] hover:bg-[#b56576] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Forgive Me? ❤️
          </motion.button>
        </motion.div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 animate-float">
            <Heart className="w-8 h-8 text-[#e56b6f] opacity-50" />
          </div>
          <div className="absolute top-20 right-20 animate-float delay-1000">
            <Gift className="w-8 h-8 text-[#b56576] opacity-50" />
          </div>
          <div className="absolute bottom-20 left-20 animate-float delay-2000">
            <Music className="w-8 h-8 text-[#eaac8b] opacity-50" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;