import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const Footer = () => {
  const [footerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulating subscription
      setTimeout(() => {
        setSubscribed(true);
        setEmail('');
      }, 800);
    }
  };

  const footerLinks = [
    {
      title: "About",
      links: ["Our Story", "Leadership", "Careers", "News", "Corporate Responsibility"]
    },
    {
      title: "Products",
      links: ["Portland Cement", "Ready Mix Concrete", "Building Materials", "Specialty Solutions", "Product Catalog"]
    },
    {
      title: "Resources",
      links: ["Technical Data", "Safety Sheets", "Project Gallery", "FAQs", "Support"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const socialIcons = [
    { id: 1, icon: "📱", label: "Twitter" },
    { id: 2, icon: "👍", label: "Facebook" },
    { id: 3, icon: "📸", label: "Instagram" },
    { id: 4, icon: "💼", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black pt-16 pb-6" ref={footerRef}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <div className="mb-6 flex items-center">
              <div className="text-white font-bold text-2xl mr-2">CONCRETE</div>
              <div className="bg-orange-500 h-6 w-6 rounded-full"></div>
            </div>
            <p className="text-gray-400 mb-6 pr-4">
              Pioneering sustainable construction solutions since 1997. Building stronger foundations for a better tomorrow.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {socialIcons.map(item => (
                <motion.a
                  key={item.id}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-lg hover:bg-orange-500 transition-colors duration-300"
                  whileHover={{ scale: 1.1, backgroundColor: "#f97316" }}
                  whileTap={{ scale: 0.95 }}
                  title={item.label}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((column, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="text-white font-semibold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        {/* <motion.div 
          className="py-8 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-white font-semibold text-lg mb-2">Stay Updated</h3>
              <p className="text-gray-400">Subscribe for industry insights and news</p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 max-w-md ml-0 md:ml-6">
              <div className="relative">
                {!subscribed ? (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full py-3 pl-4 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
                      required
                    />
                    <motion.button
                      type="submit"
                      className="absolute right-2 top-2 rounded-md py-1 px-3 bg-orange-500 hover:bg-orange-600 text-white font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Subscribe
                    </motion.button>
                  </>
                ) : (
                  <motion.div 
                    className="w-full py-3 px-4 bg-green-900/30 border border-green-600 rounded-lg text-green-400 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Thanks for subscribing!
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </motion.div> */}

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="text-gray-500 text-sm mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            © 2025 Concrete Solutions. All rights reserved.
          </motion.div>
          
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
          >
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
              Sitemap
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden opacity-20">
        <motion.div 
          className="absolute w-80 h-80 rounded-full bg-orange-600/20 -bottom-40 -left-20"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-60 h-60 rounded-full bg-gray-300/10 -bottom-20 left-1/3"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>
    </footer>
  );
};

export default Footer;