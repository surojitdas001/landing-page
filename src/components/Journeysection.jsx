import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const JourneySection = () => {
  // Create refs for each timeline item
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="w-full py-24 bg-gradient-to-b from-bg-dark to-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">OUR JOURNEY</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="relative flex justify-center">
          {/* Main Timeline Container */}
          <motion.div 
            className="relative p-8 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-white/10 shadow-xl w-full max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-gradient-to-b from-primary/30 via-primary to-primary/30 transform -translate-x-1/2"></div>
            
            {/* Timeline Items */}
            <div className="space-y-24 relative">
              {timelineItems.map((item, index) => (
                <motion.div 
                  key={index}
                  ref={item.ref}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={item.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Left Content (for odd indexes) or empty for even */}
                    <div className={`md:w-1/2 text-right ${index % 2 === 0 ? 'md:block' : 'md:hidden'}`}>
                      {index % 2 === 0 && (
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <p className="text-gray-300 mt-2">{item.description}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Center Node */}
                    <div className="relative flex items-center justify-center z-10">
                      <motion.div 
                        className="w-12 h-12 bg-primary rounded flex items-center justify-center shadow-lg shadow-primary/30"
                        initial={{ scale: 0 }}
                        animate={item.inView ? { scale: 1 } : {}}
                        transition={{ 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 20, 
                          delay: index * 0.3 + 0.2 
                        }}
                      >
                        <span className="text-white font-bold">{item.year}</span>
                      </motion.div>
                    </div>
                    
                    {/* Right Content (for even indexes) or empty for odd */}
                    <div className={`md:w-1/2 text-left ${index % 2 === 1 ? 'md:block' : 'md:hidden'}`}>
                      {index % 2 === 1 && (
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <p className="text-gray-300 mt-2">{item.description}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Mobile Layout (always visible on mobile) */}
                    <div className="md:hidden w-full">
                      <div className="p-4 bg-gray-800/80 rounded-lg backdrop-blur-sm border border-white/5">
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <p className="text-gray-300 mt-2">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Connecting Line Animation */}
                  {index < timelineItems.length - 1 && (
                    <motion.div 
                      className="absolute left-1/2 w-1 bg-primary/30"
                      style={{ top: '100%', height: '50px', transform: 'translateX(-50%)' }}
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={item.inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.4 }}
                    />
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