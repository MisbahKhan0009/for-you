import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Stars, Coffee, Gift, Music, Calendar, Camera, MessageCircleHeart, Clock, Frown, Sparkles, Infinity, X, Headphones } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Loading screen timer
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Try to play audio after user interaction
      const playAudio = async () => {
        try {
          if (audioRef.current) {
            await audioRef.current.play();
          }
        } catch (error) {
          console.log('Audio autoplay failed:', error);
        }
      };
      playAudio();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Add ScrollTrigger effect
  useEffect(() => {
    if (scrollRef.current && containerRef.current) {
      const scrollContainer = scrollRef.current;
      const scrollWidth = scrollContainer.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;

      gsap.to(scrollContainer, {
        x: -(scrollWidth - containerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top center",
          end: () => `+=${scrollWidth - containerWidth}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, []);

  // Cursor effect
  const updateCursor = (e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };
  window.addEventListener('mousemove', updateCursor);
  return (
    <>
      <audio
        ref={audioRef}
        src="/bg audio.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence>
        {isLoading && (
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
                ease: "easeInOut"
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
        )}
      </AnimatePresence>

      <div
        className="custom-cursor"
        style={{
          transform: `translate(${cursorPosition.x - 24}px, ${cursorPosition.y - 24}px)`,
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
            ref={containerRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto mb-16 relative"
          >
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">Our Beautiful Memories</h2>
            <div 
              ref={scrollRef}
              className="flex gap-6 px-4 pb-8 w-fit"
            >
              {memories.map((memory, index) => (
                <motion.div
                  key={index}
                  className="bg-[#355070]/30 rounded-xl overflow-hidden backdrop-blur-sm flex-none w-80"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
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
            onClick={() => setIsModalOpen(true)}
          >
            Forgive Me? ❤️
          </motion.button>

          {/* Apology Modal */}
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full max-w-2xl p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-white"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="text-center">
                  <Heart className="w-12 h-12 text-[#e56b6f] mx-auto mb-6 heart-beat" />
                  <h3 className="text-3xl font-bold text-[#eaac8b] mb-4">My Heartfelt Apology</h3>
                  <p className="text-lg mb-6 leading-relaxed">
                    My dearest, I want you to know that my heart aches for causing you pain. 
                    Your happiness means everything to me, and I realize now more than ever 
                    how precious our love is. I promise to learn from my mistakes and be the 
                    person you deserve – someone who cherishes and respects you completely.
                  </p>
                  <div className="space-y-4 mb-8">
                    <p className="italic text-white/80">
                      "Love is patient, love is kind. It always protects, always trusts, 
                      always hopes, always perseveres."
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#e56b6f] hover:bg-[#b56576] text-white px-6 py-2 rounded-full text-lg transition-colors duration-300"
                    onClick={() => setIsModalOpen(false)}
                  >
                    I Understand ❤️
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Our Song Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mt-16 mb-16 bg-[#6d597a]/20 p-8 rounded-2xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-center mb-6">
              <Music className="w-8 h-8 text-[#eaac8b] mr-3" />
              <h2 className="text-4xl font-bold text-[#eaac8b]">Our Song</h2>
            </div>
            <p className="text-white text-lg mb-4">
              Remember this melody that always makes us dance together?
            </p>
            <div className="bg-[#355070]/30 p-6 rounded-lg text-white text-center">
              <p className="italic">"Can't Help Falling in Love" - Elvis Presley</p>
              <p className="mt-4 text-sm">
                "Take my hand, take my whole life too<br />
                For I can't help falling in love with you..."
              </p>
            </div>
          </motion.div>

          {/* Little Things Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16 bg-[#355070]/30 p-8 rounded-2xl backdrop-blur-sm"
          >
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">Little Things I Miss</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { text: "Your morning texts that brighten my day" },
                { text: "The way you scrunch your nose when you laugh" },
                { text: "Our random midnight snack adventures" },
                { text: "How you always know when I need a hug" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-[#6d597a]/20 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Stars className="w-5 h-5 text-[#eaac8b] mb-2" />
                  <p className="text-white">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* My Wish Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16 bg-[#6d597a]/20 p-8 rounded-2xl backdrop-blur-sm text-center"
          >
            <Gift className="w-12 h-12 text-[#eaac8b] mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-4">My Only Wish</h2>
            <p className="text-white text-lg">
              Is to see your beautiful smile again, to hold your hand, and to make everything right.
              You're not just my love, you're my best friend, my comfort place, my home.
              Please give me another chance to prove how much you mean to me.
            </p>
          </motion.div>

          {/* Growth & Change Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16 bg-[#355070]/30 p-8 rounded-2xl backdrop-blur-sm"
          >
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">How I'm Growing For Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Self-Reflection", text: "Taking time to understand my actions and their impact" },
                { title: "Active Listening", text: "Learning to listen more and understand your perspective" },
                { title: "Emotional Growth", text: "Working on expressing my feelings better" },
                { title: "Personal Development", text: "Becoming the best version of myself for us" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-[#6d597a]/20 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-[#eaac8b] font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-white">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Special Moments Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16 bg-[#6d597a]/20 p-8 rounded-2xl backdrop-blur-sm"
          >
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">Our Journey Together</h2>
            <div className="space-y-8">
              {[
                { date: "First Met", text: "The day that changed my life forever" },
                { date: "First Kiss", text: "A moment of pure magic" },
                { date: "First 'I Love You'", text: "Words that came straight from my heart" },
                { date: "Moving Forward", text: "Creating new memories, stronger than ever" },
              ].map((moment, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="w-32 flex-shrink-0">
                    <p className="text-[#eaac8b] font-bold">{moment.date}</p>
                  </div>
                  <div className="flex-grow bg-[#355070]/30 p-4 rounded-lg">
                    <p className="text-white">{moment.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Daily Reminders */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16 bg-[#355070]/30 p-8 rounded-2xl backdrop-blur-sm"
          >
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">Daily Reminders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "I think about you every morning",
                "Your happiness is my priority",
                "I'm grateful for your love",
                "You make me want to be better",
                "Our love is worth fighting for",
                "You're my favorite person"
              ].map((reminder, index) => (
                <motion.div
                  key={index}
                  className="bg-[#6d597a]/20 p-4 rounded-lg text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-white">{reminder}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Section */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 pb-8 text-center text-white/70"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Heart className="w-5 h-5 text-[#e56b6f]" />
              <span>Made with love</span>
              <Heart className="w-5 h-5 text-[#e56b6f]" />
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} | Forever Yours
            </p>
          </motion.footer>
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