import { motion } from 'framer-motion';

const SlideContent = ({ slide }) => {
  const isVideo = slide.type === 'video';

  return (
    <div className="relative w-full h-full">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          >
            <source src={slide.background} type="video/mp4" />
            Your browser does not support video tag.
          </video>
        ) : (
          <img 
            src={slide.background} 
            alt={slide.name} 
            className="w-full h-full object-cover" 
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full"></div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-start h-full">
        <div className="max-w-3xl p-8 z-10 md:ml-32">
          <motion.h1
            className="text-5xl font-extrabold mb-4 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {slide.title}
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {slide.description}
          </motion.p>
          <motion.button
            className="px-8 py-3 bg-primary text-white border-none rounded text-base font-semibold cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;