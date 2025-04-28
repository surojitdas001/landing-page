import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  const [expandedItems, setExpandedItems] = useState({});
  
  // Match navigation items with the Navbar structure
  const navItems = [
    { 
      name: 'About us', 
      id: 0,
      isMaster: true,
      children: [
        { name: 'Manufacturing Facility', id: 'mf' },
        { name: 'Share Holders', id: 'sh' }
      ]
    },
    { 
      name: 'Product & Services', 
      id: 1,
      // Commented children preserved from original
      // isMaster: true,
      // children: [
      //   { name: 'Coming Soon', id: 'cs' }
      // ]
    },
    { 
      name: 'Our Initiatives', 
      id: 2,
      isMaster: true,
      children: [
        { name: 'CSR', id: 'csr' },
        { name: 'Sustainability', id: 'sus' }
      ]
    },
    { name: 'Media', id: 3 },
    { name: 'Careers', id: 5 },
    { name: 'Contact Us', id: 8 }
  ];

  const sidebarVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };
  
  const childVariants = {
    closed: { height: 0, opacity: 0 },
    open: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        height: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        }
      }
    }
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 bottom-0 z-30 bg-black/50 backdrop-blur-sm "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsSidebarOpen(false)}
      />
      
      <motion.div
        className="fixed top-0 right-0 w-[280px] h-screen z-40 bg-orange-400/60 backdrop-blur-md shadow-xl overflow-y-auto py-8 px-6 border-l border-white/10"
        variants={sidebarVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        <motion.div 
          className="flex justify-between items-center mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <img src="./images/logo.jpg" width={100} alt="Logo" className="mr-2" />
          </div>
          <motion.button 
            className="bg-white/10 hover:bg-white/20 rounded-full p-2 text-white cursor-pointer transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>
        
        <div className="divide-y divide-white/10">
          {navItems.map((item) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              className="py-3"
            >
              <div 
                className="flex justify-between items-center cursor-pointer text-white font-medium py-2"
                onClick={() => item.isMaster ? toggleExpand(item.id) : null}
              >
                <span className="text-lg">{item.name}</span>
                {item.isMaster && (
                  <motion.span 
                    className="text-xs"
                    animate={{ rotate: expandedItems[item.id] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▾
                  </motion.span>
                )}
              </div>
              
              {item.isMaster && item.children && (
                <AnimatePresence>
                  <motion.div
                    className="overflow-hidden"
                    variants={childVariants}
                    initial="closed"
                    animate={expandedItems[item.id] ? "open" : "closed"}
                  >
                    <div className="pl-4 mt-2 space-y-1 border-l border-white/20">
                      {item.children.map((child) => (
                        <motion.div
                          key={child.id}
                          className="py-2 pl-2 text-white/90 hover:text-white cursor-pointer transition-colors hover:bg-white/10 rounded"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {child.name}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-8 pt-4 border-t border-white/10"
          variants={itemVariants}
        >
          <motion.button
            className="w-full px-6 py-3 bg-white text-orange-600 border-none rounded-lg font-semibold cursor-pointer shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Sidebar;   