import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProductsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

const products = [
  {
    id: 1,
    title: "Portland Cement",
    description: "High-quality Portland cement for construction projects",
    icon: "🏗️",
    color: "from-black to-gray-800",
    shadowColor: "shadow-orange-500/40"
  },
  {
    id: 2,
    title: "Ready Mix Concrete",
    description: "Custom ready-mix concrete solutions for all applications",
    icon: "🏢",
    color: "from-orange-600 to-orange-500",
    shadowColor: "shadow-black/40"
  },
  {
    id: 3,
    title: "Building Materials",
    description: "Comprehensive range of construction materials and supplies",
    icon: "🏭",
    color: "from-orange-500 to-black",
    shadowColor: "shadow-white/40"
  }
];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <section className="w-full py-16 bg-white" ref={sectionRef}>
      
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">PRODUCTS & SERVICES</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Discover our innovative solutions designed to transform your business
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className={`relative h-[400px] rounded-lg overflow-hidden cursor-pointer transform transition-all duration-500 shadow-xl`}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onHoverStart={() => setHoveredCard(product.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-90`}></div>

              {/* Animated background circles */}
              <motion.div 
                className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              />

              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <motion.div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${product.shadowColor} shadow-lg bg-white/20 backdrop-blur-sm`}
                  variants={iconVariants}
                  initial="initial"
                  animate={hoveredCard === product.id ? "hover" : "initial"}
                >
                  {product.icon}
                </motion.div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{product.title}</h3>
                  <p className="text-white/90">{product.description}</p>

                  <motion.div 
                    className="mt-6 flex items-center gap-2 text-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={hoveredCard === product.id ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Learn more</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Added Product Categories */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="p-6 bg-orange-50 rounded-lg text-center shadow-md border border-orange-100">
            <div className="text-orange-500 text-3xl mb-2">🧱</div>
            <h4 className="font-bold text-black">Construction</h4>
          </div>
          <div className="p-6 bg-orange-50 rounded-lg text-center shadow-md border border-orange-100">
            <div className="text-orange-500 text-3xl mb-2">🏠</div>
            <h4 className="font-bold text-black">Residential</h4>
          </div>
          <div className="p-6 bg-orange-50 rounded-lg text-center shadow-md border border-orange-100">
            <div className="text-orange-500 text-3xl mb-2">🏙️</div>
            <h4 className="font-bold text-black">Commercial</h4>
          </div>
          <div className="p-6 bg-orange-50 rounded-lg text-center shadow-md border border-orange-100">
            <div className="text-orange-500 text-3xl mb-2">🛣️</div>
            <h4 className="font-bold text-black">Infrastructure</h4>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;