import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Stars, Coffee, Gift, Music, Calendar, Camera, MessageCircleHeart, Clock, Frown, Sparkles, Infinity, X, Headphones, Volume2, VolumeX } from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Add visitor tracking effect
  useEffect(() => {
    // Function to send visit notification
    const sendVisitNotification = async () => {
      try {
        // Get some basic info about the visitor
        const userAgent = navigator.userAgent;
        const screenSize = `${window.screen.width}x${window.screen.height}`;
        const visitTime = new Date().toISOString();
        
        // Get IP address using a more reliable API
        let ipAddress = "Unknown";
        try {
          // Using ipinfo.io which provides more reliable IP data
          const ipResponse = await fetch('https://ipinfo.io/json');
          const ipData = await ipResponse.json();
          ipAddress = ipData.ip || "Unknown";
          
          // Add additional location data if available
          const location = ipData.city && ipData.country ? 
            `${ipData.city}, ${ipData.country}` : "Unknown location";
          
          // Create a FormData object with the visitor information
          const formData = new FormData();
          formData.append('_subject', 'Website Visit Notification - For You');
          formData.append('email', 'mkhanmisbah007@gmail.com');
          formData.append('website', 'https://for-you-5ez.pages.dev/');
          formData.append('userAgent', userAgent);
          formData.append('screenSize', screenSize);
          formData.append('visitTime', visitTime);
          formData.append('ipAddress', ipAddress);
          formData.append('location', location);
          
          // Send the data to FormSubmit service
          await fetch('https://formsubmit.co/mkhanmisbah007@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json',
            },
          });
          
          console.log('Visit notification sent with IP address:', ipAddress);
        } catch (ipError) {
          console.error('Failed to fetch IP address:', ipError);
          
          // Fallback to send notification without IP if IP fetch fails
          const formData = new FormData();
          formData.append('_subject', 'Website Visit Notification - For You');
          formData.append('email', 'mkhanmisbah007@gmail.com');
          formData.append('website', 'https://for-you-5ez.pages.dev/');
          formData.append('userAgent', userAgent);
          formData.append('screenSize', screenSize);
          formData.append('visitTime', visitTime);
          formData.append('ipAddress', 'Failed to retrieve');
          
          await fetch('https://formsubmit.co/mkhanmisbah007@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json',
            },
          });
        }
      } catch (error) {
        console.error('Failed to send visit notification:', error);
      }
    };
    
    // Send the notification
    sendVisitNotification();
  }, []);

  const memories = [
    {
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      title: "Our First Date",
      description: "Remember that magical evening at the café?",
    },
    {
      image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?w=800",
      title: "Beach Sunset",
      description: "Watching the sunset together on the beach",
    },
    {
      image: "https://images.unsplash.com/photo-1515890435782-59a5bb6ec191?w=800",
      title: "Movie Night",
      description: "Our cozy movie nights are everything",
    },
    {
      image: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?w=800",
      title: "First Concert Together",
      description: "Dancing and singing our hearts out",
    },
    {
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
      title: "Park Picnic",
      description: "That perfect spring afternoon with you",
    },
    {
      image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800",
      title: "Road Trip Adventure",
      description: "Getting lost and finding ourselves together",
    },
  ];

  const reasons = ["Your smile brightens even my darkest days", "The way you understand me without words", "Your incredible strength and determination", "How you make everyone around you feel special", "The sound of your laughter is my favorite melody"];

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
          console.log("Audio autoplay failed:", error);
        }
      };
      playAudio();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Try to play audio after loading is complete
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsAudioReady(true);
        }
      } catch (error) {
        console.log("Audio autoplay failed:", error);
      }
    };
    playAudio();
  };

  // Add the missing handleAudioEnabled function
  // Update the handleAudioEnabled function to be more robust
  // Update the handleAudioEnabled function to toggle mute/unmute
  const handleAudioEnabled = async () => {
    try {
      if (audioRef.current) {
        if (!isAudioReady) {
          // First time playing - initialize audio
          audioRef.current.volume = 0.5;
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("Audio started playing successfully");
                setIsAudioReady(true);
              })
              .catch(error => {
                console.error("Audio play failed:", error);
                // Try again with user interaction
                const playOnClick = () => {
                  audioRef.current?.play()
                    .then(() => setIsAudioReady(true))
                    .catch(e => console.error("Second attempt failed:", e));
                };
                playOnClick();
              });
          }
        } else {
          // Toggle mute/unmute
          audioRef.current.muted = !audioRef.current.muted;
          setIsAudioMuted(audioRef.current.muted);
        }
      }
    } catch (error) {
      console.error("Audio control failed:", error);
    }
  };

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
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }
  }, []);

  // Cursor effect - move this inside a useEffect
  useEffect(() => {
    // Check if device supports hover (non-touch device)
    const isNonTouchDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    if (isNonTouchDevice) {
      const updateCursor = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener("mousemove", updateCursor);
      
      // Clean up the event listener when component unmounts
      return () => {
        window.removeEventListener("mousemove", updateCursor);
      };
    }
  }, []);
  
  return (
    <>
      {/* Update the audio element with correct path and attributes */}
      <audio 
        ref={audioRef} 
        src="/audio/bg audio.mp3" 
        loop 
        preload="auto"
        onCanPlayThrough={() => console.log("Audio loaded and ready to play")}
        onError={(e) => console.error("Audio error:", e)}
      />

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen 
            onLoadingComplete={handleLoadingComplete} 
            onAudioEnabled={handleAudioEnabled}
            isAudioReady={isAudioReady}
          />
        )}
      </AnimatePresence>

      {/* Audio control button when loading is complete */}
      {!isLoading && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 z-40 bg-[#355070]/80 backdrop-blur-sm p-3 rounded-full border border-[#eaac8b]/30"
          onClick={handleAudioEnabled}
          title={!isAudioReady ? "Enable Audio" : (isAudioMuted ? "Unmute Audio" : "Mute Audio")}
        >
          {isAudioReady && isAudioMuted ? (
            <VolumeX className="w-5 h-5 text-white/70" />
          ) : (
            <Volume2 className={`w-5 h-5 ${isAudioReady ? "text-[#eaac8b]" : "text-white/70"}`} />
          )}
        </motion.button>
      )}

      <div
        className="custom-cursor"
        style={{
          transform: `translate(${cursorPosition.x - 24}px, ${cursorPosition.y - 24}px)`,
        }}
      />

      <div className="min-h-screen relative overflow-hidden">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="container mx-auto px-4 py-16 text-center relative z-10">
          <motion.img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800" alt="Romantic Scene" className="w-64 h-64 object-cover rounded-full mx-auto mb-8 floating" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} />

          <motion.h1 className="text-6xl font-bold text-[#eaac8b] mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            I'm Sorry
          </motion.h1>

          <motion.p className="text-xl text-white mb-8 max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            Every moment without your smile feels like an eternity. I know I made a mistake, and I'm truly sorry. You mean the world to me, and I promise to do better.
          </motion.p>

          {/* My Faults Section */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto mb-16 bg-[#355070]/30 p-8 rounded-2xl backdrop-blur-sm">
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
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto mb-16 bg-[#6d597a]/20 p-8 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-[#eaac8b] mr-3" />
              <h2 className="text-4xl font-bold text-[#eaac8b]">Why I Love You</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
              {reasons.map((reason, index) => (
                <motion.div key={index} className="bg-[#355070]/30 p-4 rounded-lg" initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}>
                  <div className="flex justify-start items-center">
                    <Heart className="w-6 h-6 text-[#e56b6f] pe-1" />
                    <p className="text-white">{reason}</p>
                  </div>
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
              <motion.div key={index} className="bg-[#355070]/30 p-6 rounded-lg backdrop-blur-sm" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.5 }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <item.icon className="w-12 h-12 text-[#eaac8b] mx-auto mb-4 heart-beat" />
                <p className="text-white">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* My Promises Section */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto mb-16 bg-[#6d597a]/20 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">My Promises</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Clock, text: "I'll always make time for you" },
                { icon: MessageCircleHeart, text: "I'll communicate better" },
                { icon: Calendar, text: "I'll prioritize our dates" },
                { icon: Camera, text: "I'll create more memories with you" },
              ].map((promise, index) => (
                <motion.div key={index} className="flex items-center space-x-4 text-white p-4 rounded-lg bg-[#355070]/30" initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02 }}>
                  <promise.icon className="w-6 h-6 text-[#e56b6f]" />
                  <span>{promise.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Future Section */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto mb-16 bg-[#355070]/30 p-8 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-center mb-6">
              <Infinity className="w-8 h-8 text-[#eaac8b] mr-3" />
              <h2 className="text-4xl font-bold text-[#eaac8b]">Our Future Together</h2>
            </div>
            <p className="text-white text-lg mb-6">I see a beautiful future ahead of us, filled with love, laughter, and countless adventures. Every day with you is a gift, and I promise to cherish each moment we share.</p>
          </motion.div>

          {/* Memories Section */}
          <motion.div ref={containerRef} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto mb-16 relative">
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">Our Beautiful Memories</h2>
            <div ref={scrollRef} className="flex gap-6 px-4 pb-8 w-fit">
              {memories.map((memory, index) => (
                <motion.div key={index} className="bg-[#355070]/30 rounded-xl overflow-hidden backdrop-blur-sm flex-none w-80" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.5 }} whileHover={{ y: -10 }}>
                  <img src={memory.image} alt={memory.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-[#eaac8b] font-bold text-xl mb-2">{memory.title}</h3>
                    <p className="text-white">{memory.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.button className="bg-[#e56b6f] hover:bg-[#b56576] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={() => setIsModalOpen(true)}>
            Forgive Me? ❤️
          </motion.button>

          {/* Apology Modal */}
          {isModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-2xl p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-white">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center">
                  <Heart className="w-12 h-12 text-[#e56b6f] mx-auto mb-6 heart-beat" />
                  <h3 className="text-3xl font-bold text-[#eaac8b] mb-4">My Heartfelt Apology</h3>
                  <p className="text-lg mb-6 leading-relaxed">My dearest, I want you to know that my heart aches for causing you pain. Your happiness means everything to me, and I realize now more than ever how precious our love is. I promise to learn from my mistakes and be the person you deserve – someone who cherishes and respects you completely.</p>
                  <div className="space-y-4 mb-8">
                    <p className="italic text-white/80">"Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres."</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#e56b6f] hover:bg-[#b56576] text-white px-6 py-2 rounded-full text-lg transition-colors duration-300" onClick={() => setIsModalOpen(false)}>
                    I Understand ❤️
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Our Song Section */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto mt-16 mb-16 bg-[#6d597a]/20 p-8 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-center mb-6">
              <Music className="w-8 h-8 text-[#eaac8b] mr-3" />
              <h2 className="text-4xl font-bold text-[#eaac8b]">Our Song</h2>
            </div>
            <p className="text-white text-lg mb-4">Remember this melody that always makes us dance together?</p>
            <div className="bg-[#355070]/30 p-6 rounded-lg text-white text-center">
              <p className="italic">"Can't Help Falling in Love" - Elvis Presley</p>
              <p className="mt-4 text-sm">
                "Take my hand, take my whole life too
                <br />
                For I can't help falling in love with you..."
              </p>
            </div>
          </motion.div>

          {/* Little Things Section */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto mb-16 bg-[#355070]/30 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">Little Things I Miss</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{ text: "Your morning texts that brighten my day" }, { text: "The way you scrunch your nose when you laugh" }, { text: "Our random midnight snack adventures" }, { text: "How you always know when I need a hug" }].map((item, index) => (
                <motion.div key={index} className="bg-[#6d597a]/20 p-4 rounded-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="flex justify-start items-center">
                  <Stars className="w-5 h-5 text-[#eaac8b] pe-1" />
                  <p className="text-white">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* My Wish Section */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto mb-16 bg-[#6d597a]/20 p-8 rounded-2xl backdrop-blur-sm text-center">
            <Gift className="w-12 h-12 text-[#eaac8b] mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-4">My Only Wish</h2>
            <p className="text-white text-lg">Is to see your beautiful smile again, to hold your hand, and to make everything right. You're not just my love, you're my best friend, my comfort place, my home. Please give me another chance to prove how much you mean to me.</p>
          </motion.div>

          {/* Growth & Change Section */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto mb-16 bg-[#355070]/30 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">How I'm Growing For Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Self-Reflection", text: "Taking time to understand my actions and their impact" },
                { title: "Active Listening", text: "Learning to listen more and understand your perspective" },
                { title: "Emotional Growth", text: "Working on expressing my feelings better" },
                { title: "Personal Development", text: "Becoming the best version of myself for us" },
              ].map((item, index) => (
                <motion.div key={index} className="bg-[#6d597a]/20 p-6 rounded-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <h3 className="text-[#eaac8b] font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-white">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Special Moments Timeline */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto mb-16 bg-[#6d597a]/20 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">Our Journey Together</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#eaac8b]/30" />

              <div className="space-y-12">
                {[
                  { date: "January 2023", title: "First Met", text: "The day that changed my life forever", icon: Heart },
                  { date: "March 2023", title: "First Date", text: "A magical evening that I'll never forget", icon: Coffee },
                  { date: "May 2023", title: "First Kiss", text: "A moment of pure magic under the stars", icon: Stars },
                  { date: "July 2023", title: "First 'I Love You'", text: "Words that came straight from my heart", icon: MessageCircleHeart },
                  { date: "September 2023", title: "Moving Forward", text: "Creating new memories, stronger than ever", icon: Infinity },
                ].map((moment, index) => (
                  <motion.div key={index} className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}>
                    {/* Timeline Point */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#eaac8b] rounded-full" />

                    {/* Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                      <div className="bg-[#355070]/30 p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <moment.icon className="w-5 h-5 text-[#eaac8b]" />
                          <span className="text-[#eaac8b] font-bold">{moment.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#eaac8b] mb-2">{moment.title}</h3>
                        <p className="text-white">{moment.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Daily Reminders */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto mb-16 bg-[#355070]/30 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-[#eaac8b] mb-8">Daily Reminders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["I think about you every morning", "Your happiness is my priority", "I'm grateful for your love", "You make me want to be better", "Our love is worth fighting for", "You're my favorite person"].map((reminder, index) => (
                <motion.div key={index} className="bg-[#6d597a]/20 p-4 rounded-lg text-center" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }}>
                  <p className="text-white">{reminder}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Section */}
          <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16 pb-8 text-center text-white/70">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Heart className="w-5 h-5 text-[#e56b6f]" />
              <span>Made with love</span>
              <Heart className="w-5 h-5 text-[#e56b6f]" />
            </div>
            <p className="text-sm">© {new Date().getFullYear()} | Forever Yours</p>
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
