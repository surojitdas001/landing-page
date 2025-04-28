import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Slider from './components/Slider';
import './index.css';
import JourneySection from './components/Journeysection';
import ProductsSection from './components/Productsection';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="relative w-full min-h-screen">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />
      
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}
      </AnimatePresence>
      
      {/* Slider replaces the content section */}
      <Slider />

      <JourneySection />
      
      {/* Products & Services Section */}
      <ProductsSection />
    </div>
  );
}

export default App;