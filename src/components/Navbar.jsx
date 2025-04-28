import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ toggleSidebar }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [hoveredMenu, setHoveredMenu] = useState(null);

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
            // isMaster: true,
            // children: [
            //     { name: 'Coming Soon', id: 'cs' }
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

    // Animation variants for dropdown menu
    const dropdownVariants = {
        hidden: { 
            opacity: 0,
            y: -5,
            transition: {
                type: 'tween',
                duration: 0.2
            }
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24
            }
        }
    };

    const handleMouseEnter = (id) => {
        setHoveredMenu(id);
    };

    const handleMouseLeave = () => {
        setHoveredMenu(null);
    };

    return (
        <motion.nav
            className="fixed top-0 left-0 w-full z-20 bg-orange-500/60 backdrop-blur-md border-b border-white/10"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
        >
            <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
                <motion.div
                    className="text-2xl font-bold tracking-wide text-white cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <img src="./images/logo.jpg" width={110} alt="Logo" />
                </motion.div>

                <div className="hidden md:flex gap-4">
                    {navItems.map((item) => (
                        <div 
                            key={item.id}
                            className="relative nav-item-hover"
                            onMouseEnter={() => handleMouseEnter(item.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <motion.div
                                className={`relative py-2 cursor-pointer font-medium flex items-center gap-1 ${activeTab === item.id ? 'text-primary' : 'text-white'}`}
                                onClick={() => setActiveTab(item.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.name}
                                {item.isMaster && (
                                    <span className="dropdown-indicator text-xs ml-1 transition-transform duration-300">▾</span>
                                )}
                                {activeTab === item.id && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                        layoutId="underline"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.div>

                            {item.isMaster && item.children && (
                                <AnimatePresence>
                                    {hoveredMenu === item.id && (
                                        <motion.div
                                            className="absolute top-full left-0 min-w-[180px] bg-orange-500/85 backdrop-blur-lg rounded shadow-lg py-2 mt-2 z-30"
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            variants={dropdownVariants}
                                        >
                                            {item.children.map((child) => (
                                                <motion.div
                                                    key={child.id}
                                                    className="px-4 py-2 cursor-pointer whitespace-nowrap transition-all duration-200 hover:bg-white/20"
                                                    whileHover={{ x: 5 }}
                                                    onClick={() => setActiveTab(child.id)}
                                                >
                                                    {child.name}
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    ))}
                </div>

                <motion.button
                    className="md:hidden bg-transparent border-none text-white cursor-pointer"
                    onClick={toggleSidebar}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Toggle menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.button>
            </div>
        </motion.nav>
    );
};

export default Navbar;