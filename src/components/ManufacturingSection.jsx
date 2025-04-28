import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ManufacturingSection = () => {
  const [activeTab, setActiveTab] = useState('facilities');
  const [facilityRef, facilityInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [certRef, certInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const facilities = [
    {
      id: 1,
      title: "Modern Production Line",
      description: "State-of-the-art automated production facilities with cutting-edge technology",
      icon: "⚙️",
      stats: "25,000+ sq ft"
    },
    {
      id: 2,
      title: "Quality Control Lab",
      description: "Advanced testing equipment ensuring all products meet industry standards",
      icon: "🔬",
      stats: "99.8% accuracy"
    },
    {
      id: 3,
      title: "Distribution Center",
      description: "Centralized logistics hub for efficient nationwide delivery",
      icon: "🚚",
      stats: "48hr delivery"
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "ISO 9001:2015",
      description: "Quality Management System certification ensuring consistent product quality",
      logo: "🏅",
      year: "Since 2010"
    },
    {
      id: 2,
      name: "ISO 14001:2015",
      description: "Environmental Management System certification for sustainable practices",
      logo: "🌱",
      year: "Since 2012"
    },
    {
      id: 3,
      name: "OHSAS 18001",
      description: "Occupational Health and Safety certification for workplace safety",
      logo: "🛡️",
      year: "Since 2014"
    },
    {
      id: 4,
      name: "Green Building Council",
      description: "Recognition for sustainable construction material production",
      logo: "🏗️",
      year: "Since 2016"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const tabVariants = {
    inactive: { opacity: 0.7, scale: 0.95 },
    active: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={facilityInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
          ref={facilityRef}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">MANUFACTURING FACILITY</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Our cutting-edge facilities and certified processes ensure the highest quality products
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg p-1 bg-gray-700/50 backdrop-blur-sm">
            <motion.button
              variants={tabVariants}
              animate={activeTab === 'facilities' ? 'active' : 'inactive'}
              className={`px-6 py-3 rounded-lg font-medium ${activeTab === 'facilities' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-300'}`}
              onClick={() => setActiveTab('facilities')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Facilities
            </motion.button>
            <motion.button
              variants={tabVariants}
              animate={activeTab === 'certifications' ? 'active' : 'inactive'}
              className={`px-6 py-3 rounded-lg font-medium ${activeTab === 'certifications' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-300'}`}
              onClick={() => setActiveTab('certifications')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Certifications
            </motion.button>
          </div>
        </div>

        {/* Facilities Content */}
        {activeTab === 'facilities' && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key="facilities"
          >
            {facilities.map((facility) => (
              <motion.div
                key={facility.id}
                className="relative p-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-700"
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-400/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
                
                <div className="bg-gray-800/40 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6">
                  {facility.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{facility.title}</h3>
                <p className="text-gray-300 mb-4">{facility.description}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <span className="text-orange-400 font-semibold">{facility.stats}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Certifications Content */}
        {activeTab === 'certifications' && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key="certifications"
            ref={certRef}
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                className="flex items-center p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-3xl mr-6">
                  {cert.logo}
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-white">{cert.name}</h3>
                    <span className="ml-3 text-sm font-medium text-orange-400">{cert.year}</span>
                  </div>
                  <p className="text-gray-300 mt-1">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats Row */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={facilityInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-orange-500 mb-1">25+</div>
            <div className="text-gray-300">Years Experience</div>
          </div>
          <div className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-orange-500 mb-1">100+</div>
            <div className="text-gray-300">Team Members</div>
          </div>
          <div className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-orange-500 mb-1">12</div>
            <div className="text-gray-300">Patents</div>
          </div>
          <div className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-orange-500 mb-1">5000+</div>
            <div className="text-gray-300">Projects Completed</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ManufacturingSection;