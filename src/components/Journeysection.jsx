import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const JourneySection = () => {
  const [ref1, inView1] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [mainRef, mainInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timelineItems = [
    {
      ref: ref1,
      inView: inView1,
      year: '2010',
      title: 'Company Founded',
      description: 'Started our journey with a vision to transform the industry'
    },
    {
      ref: ref2,
      inView: inView2,
      year: '2015',
      title: 'Global Expansion',
      description: 'Expanded operations to international markets'
    },
    {
      ref: ref3,
      inView: inView3,
      year: '2023',
      title: 'Innovation Hub',
      description: 'Launched our state-of-the-art research and development center'
    }
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  // Generate dynamic wave path based on scroll position
  const generateWavePath = (index) => {
    const baseAmplitude = 15; // Base wave height
    const scrollFactor = Math.sin(scrollY / 300) * 5; // Scroll-based variation
    const indexFactor = index * 2; // Different wave for each segment
    
    const amplitude = baseAmplitude + scrollFactor + indexFactor;
    
    return `M0,15 C33,${15-amplitude} 66,${15+amplitude} 100,15 C133,${15-amplitude} 166,${15+amplitude} 200,15`;
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-bg-dark to-gray-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4" ref={mainRef}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">OUR JOURNEY</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Main Timeline Container */}
          <motion.div 
            className="relative p-4 md:p-8 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-white/10 shadow-xl w-full overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            
            {/* Timeline Items - Vertical for mobile, horizontal for larger screens */}
            <div className={`${isMobile ? 'flex flex-col space-y-12' : 'flex justify-between items-center relative'}`}>
              {timelineItems.map((item, index) => (
                <motion.div 
                  key={index}
                  ref={item.ref}
                  className={`relative ${isMobile ? 'w-full' : 'flex-1 px-2 md:px-4'}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={item.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Content Box */}
                  <div className="flex flex-col items-center">
                    {/* Node */}
                    <motion.div 
                      className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 mb-4 z-10"
                      initial={{ scale: 0 }}
                      animate={item.inView ? { scale: 1 } : {}}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                        delay: index * 0.3 + 0.2 
                      }}
                    >
                      <span className="text-sm md:text-base text-white font-bold">{item.year}</span>
                    </motion.div>

                    {/* Content */}
                    <div className="text-center p-3 md:p-4 bg-gray-800/80 rounded-lg backdrop-blur-sm border border-white/5 w-full md:max-w-xs">
                      <h3 className="text-lg md:text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-sm md:text-base text-gray-300 mt-2">{item.description}</p>
                    </div>
                  </div>

                  {/* Enhanced Wave Connecting Lines - Desktop only */}
                  {!isMobile && index < timelineItems.length - 1 && (
                    <div className="absolute top-[1.25rem] md:top-[1.5rem] left-[50%] right-[-50%] h-8 overflow-hidden">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 30">
                        {/* Background wave */}
                        <motion.path
                          d={generateWavePath(index)}
                          fill="none"
                          stroke="rgba(59, 130, 246, 0.15)" 
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        
                        {/* Animated glow effect */}
                        <motion.path
                          d={generateWavePath(index)}
                          fill="none"
                          stroke="rgba(59, 130, 246, 0.4)" 
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        
                        {/* Main animated wave */}
                        <motion.path
                          d={generateWavePath(index)}
                          fill="none"
                          stroke="rgba(59, 130, 246, 0.9)" 
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, pathOffset: 0 }}
                          animate={mainInView ? { 
                            pathLength: 1,
                            pathOffset: 0,
                            transition: { 
                              pathLength: { duration: 1.5, delay: index * 0.3 },
                              pathOffset: { repeat: Infinity, duration: 2, repeatType: "loop" }
                            }
                          } : {}}
                        />
                        
                        {/* Pulse effect dots */}
                        <motion.circle
                          cx="0"
                          cy="15"
                          r="3"
                          fill="#3b82f6"
                          initial={{ x: 0, opacity: 0 }}
                          animate={mainInView ? {
                            x: [0, 200],
                            opacity: [0.8, 0],
                            transition: {
                              x: { duration: 2, repeat: Infinity, ease: "linear" },
                              opacity: { duration: 2, repeat: Infinity, ease: "linear" }
                            }
                          } : {}}
                        />
                        
                        <motion.circle
                          cx="0"
                          cy="15"
                          r="2"
                          fill="#60a5fa"
                          initial={{ x: 0, opacity: 0 }}
                          animate={mainInView ? {
                            x: [0, 200],
                            opacity: [0.8, 0],
                            transition: {
                              x: { duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 },
                              opacity: { duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }
                            }
                          } : {}}
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;