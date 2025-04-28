import { motion } from 'framer-motion';

const sidebarVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  closed: { x: 20, opacity: 0 },
  open: { x: 0, opacity: 1 }
};

const Sidebar = ({ setIsSidebarOpen }) => {
  const menuItems = [
    { icon: '🏠', name: 'Home' },
    { icon: '👤', name: 'About' },
    { icon: '🛠️', name: 'Services' },
    { icon: '📚', name: 'Blog' },
    { icon: '📞', name: 'Contact' }
  ];
  
  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 bottom-0 z-30 bg-black/0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsSidebarOpen(false)}
      />
      
      <motion.div
        className="fixed top-0 right-0 w-[300px] h-screen z-40 bg-bg-dark border-l border-white/0 p-8 flex flex-col"
        variants={sidebarVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        <motion.button 
          className="absolute top-4 right-4 bg-transparent border-none text-white cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(false)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
        
        <motion.div className="mb-8">
          <h2 className="text-2xl font-bold">Menu</h2>
        </motion.div>
        
        <div className="flex-grow">
          <ul className="space-y-0">
            {menuItems.map((item, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="py-4 flex items-center gap-4 cursor-pointer border-b border-white/0"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <motion.div 
          className="mt-8"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-3 bg-primary text-white border-none rounded font-semibold cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Sidebar;