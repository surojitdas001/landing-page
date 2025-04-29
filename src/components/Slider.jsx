import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideContent from './SlideContent';

const slides = [
  {
    id: 1,
    name: "Home",
    type: "video",
    background: "/video.mp4",
    title: "Experience The Future",
    description: ""
  },
  {
    id: 5,
    name: "Support",
    type: "image",
    background: "/images/image5.jfif",
    title: "Saving Nature",
    description: ""
  },
  {
    id: 2,
    name: "Technology",
    type: "image",
    background: "/images/image6.png",
    title: "Building Strength",
    description: ""
  },
  {
    id: 4,
    name: "Solutions",
    type: "image",
    background: "/images/image5.jfif",
    title: "Helping Hands",
    description: ""
  },
  {
    id: 3,
    name: "Design",
    type: "image",
    background: "/images/image6.png",
    title: "Technology ",
    description: "The New Way of Business "
  },
  
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 45000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  // Text Arc Menu
  const renderTextArcMenu = () => {
    return (
      <div className="absolute top-0 left-0 w-[60vh] h-screen z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-px ml-5 origin-left-center pointer-events-auto">
          {slides.map((slide, index) => {
            const angle = -30 + (index * 15); // Distribute menu items along an arc
            return (
              <div 
                key={slide.id}
                className={`absolute top-0 left-0 w-full h-px origin-left-center cursor-pointer ${currentSlide === index ? 'active' : ''}`}
                style={{ transform: `rotate(${angle}deg)` }}
                onClick={() => goToSlide(index)}
              >
                <div 
                  className={`absolute left-0 w-full text-left origin-left-center whitespace-nowrap text-lg font-medium pl-4 tracking-wide ${
                    currentSlide === index 
                      ? 'text-primary font-bold text-xl shadow-md' 
                      : 'text-white/70 arc-text-hover'
                  }`}
                >
                  {slide.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slide Content */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <SlideContent slide={slides[currentSlide]} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        <button 
          className="flex items-center justify-center w-10 h-10 bg-white/20 border-none rounded-full text-white cursor-pointer transition-colors duration-300 hover:bg-primary"
          onClick={prevSlide}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          className="flex items-center justify-center w-10 h-10 bg-white/20 border-none rounded-full text-white cursor-pointer transition-colors duration-300 hover:bg-primary"
          onClick={nextSlide}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Text Arc Menu */}
    </div>
  );
};

export default Slider;