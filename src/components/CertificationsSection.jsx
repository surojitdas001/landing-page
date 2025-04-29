import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CertificationsSection = () => {
  const [expandedCert, setExpandedCert] = useState(null);
  
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const certifications = [
    {
      id: 1,
      name: "ISO 9001:2015",
      description: "Quality Management System certification ensuring consistent quality processes and customer satisfaction.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
        </svg>
      ),
      benefits: [
        "Improved process efficiency",
        "Enhanced customer satisfaction", 
        "Consistent product quality",
        "Risk-based approach to management"
      ]
    },
    {
      id: 2,
      name: "ISO 14001:2015",
      description: "Environmental Management System certification demonstrating commitment to sustainable practices.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      benefits: [
        "Reduced environmental impact", 
        "Lower resource consumption", 
        "Regulatory compliance",
        "Improved corporate image"
      ]
    },
    {
      id: 3,
      name: "OHSAS 18001",
      description: "Occupational Health and Safety Management certification ensuring workplace safety standards.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      benefits: [
        "Reduced workplace accidents", 
        "Lower insurance premiums", 
        "Improved employee morale",
        "Legal compliance"
      ]
    },
    {
      id: 4,
      name: "CE Marking",
      description: "European conformity certification validating products meet EU health, safety, and environmental requirements.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M7.5 12C7.5 9.5 8.5 8 12 8M16.5 12C16.5 9.5 15.5 8 12 8M7.5 12C7.5 14.5 8.5 16 12 16M16.5 12C16.5 14.5 15.5 16 12 16" strokeWidth="2" />
        </svg>
      ),
      benefits: [
        "Access to European markets", 
        "Consumer confidence", 
        "Legal compliance",
        "Standardized quality assurance"
      ]
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
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: "auto", 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const handleCertClick = (id) => {
    if (expandedCert === id) {
      setExpandedCert(null);
    } else {
      setExpandedCert(id);
    }
  };

  return (
    <section 
      className="w-full py-16 bg-white" 
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">CERTIFICATIONS</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Our commitment to quality, safety, and environmental standards is validated through internationally recognized certifications
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-lg"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => handleCertClick(cert.id)}
              >
                <div className="flex items-start">
                  <div className="mr-4 text-orange-500 bg-orange-50 p-3 rounded-lg">
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-900">{cert.name}</h3>
                      <motion.div
                        animate={{ rotate: expandedCert === cert.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-orange-50 rounded-full p-1"
                      >
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </motion.div>
                    </div>
                    <p className="text-gray-600 mt-2">{cert.description}</p>
                  </div>
                </div>

                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate={expandedCert === cert.id ? "expanded" : "collapsed"}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-gray-900 font-medium mb-2">Key Benefits:</h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {cert.benefits.map((benefit, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-center text-gray-700"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          <svg className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust banner */}
        <motion.div
          className="mt-16 p-8 rounded-lg bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 border border-orange-200"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Trust in Our Credentials</h3>
              <p className="text-gray-600">Our certificates demonstrate our unwavering commitment to excellence</p>
            </div>
            <motion.button
              className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium flex items-center shadow-lg shadow-orange-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Certificates</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;