import { useState, useRef, useEffect } from 'react';

const ManufacturingFacility = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Intersection Observer setup to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Demo images for guaranteed display
  const demoImages = {
    concretePlant: "./public/images/logo.jpg",
    laboratory: "./public/images/image5.jfif",
    distribution: "./public/images/image1.jfif",
    videoThumbnail1: "./public/images/logo.jpg",
    videoThumbnail2: "./public/images/logo.jpg"
  };

  // Combined media items with demo images
  const mediaItems = [
    { 
      id: 1, 
      type: 'photo',
      url: demoImages.concretePlant, 
      title: "Concrete Mixing Plant",
      description: "Our state-of-the-art mixing plant features automated systems for precise material proportioning, ensuring consistent high-quality concrete production. This facility can produce up to 200 cubic meters of concrete per hour, meeting diverse project requirements.",
    },
    { 
      id: 2, 
      type: 'photo',
      url: demoImages.laboratory, 
      title: "Quality Testing Laboratory",
      description: "Equipped with advanced testing equipment, our quality control lab performs rigorous analysis on raw materials and finished products. Every batch undergoes comprehensive testing to ensure it meets international standards and project specifications.",
    },
    { 
      id: 3, 
      type: 'video',
      url: './public/video.mp4', 
      thumbnail: demoImages.videoThumbnail1, 
      title: "Manufacturing Process Overview",
      description: "This video provides a complete walkthrough of our cement manufacturing process, from raw material processing to final packaging. Our innovative techniques minimize energy consumption while maximizing quality and output efficiency.",
      duration: "3:45" 
    },
    { 
      id: 4, 
      type: 'photo',
      url: demoImages.distribution, 
      title: "Distribution Center",
      description: "Our strategically located distribution center enables efficient delivery to construction sites across the region. With a fleet of specialized vehicles and advanced logistics systems, we ensure timely delivery of materials even to remote locations.",
    },
    { 
      id: 5, 
      type: 'video',
      url: "./public/dron.mp4", 
      thumbnail: demoImages.videoThumbnail2, 
      title: "Facility Tour",
      description: "Take a comprehensive tour of our manufacturing facilities and see firsthand the technology and expertise behind our building materials. This guided walkthrough highlights our commitment to quality, safety, and sustainability.",
      duration: "5:20" 
    },
  ];

  const handleNext = () => {
    setVideoPlaying(false);
    setActiveItem((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setVideoPlaying(false);
    setActiveItem((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const handleDotClick = (index) => {
    setVideoPlaying(false);
    setActiveItem(index);
  };

  const toggleVideo = () => {
    setVideoPlaying(!videoPlaying);
    
    // Use setTimeout to allow state update to process
    setTimeout(() => {
      if (!videoPlaying && videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error("Video playback failed:", error);
        });
      } else if (videoPlaying && videoRef.current) {
        videoRef.current.pause();
      }
    }, 0);
  };

  return (
    <section className="w-full py-20 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div 
          className={`text-center mb-16 transform transition-all duration-800 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">MANUFACTURING FACILITY</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Explore our state-of-the-art production facilities where innovation meets precision
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Media display - Left side */}
          <div 
            className={`w-full lg:w-3/5 relative overflow-hidden rounded-xl shadow-2xl bg-gray-100 transition-all duration-600 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            {/* Media items */}
            <div className="relative w-full h-80 md:h-96 overflow-hidden">
              {mediaItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${activeItem === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  {item.type === 'photo' ? (
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      {videoPlaying && activeItem === index ? (
                        <video
                          ref={videoRef}
                          src={item.url}
                          className="w-full h-full object-cover"
                          controls
                          autoPlay
                          playsInline
                          onEnded={() => setVideoPlaying(false)}
                        />
                      ) : (
                        <>
                          <img 
                            src={item.thumbnail} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 active:scale-95"
                              onClick={toggleVideo}
                            >
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </button>
                          </div>
                          {item.duration && (
                            <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-white text-sm">
                              {item.duration}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
              <button
                className="w-10 h-10 rounded-full bg-black/30 hover:bg-orange-500 flex items-center justify-center text-white transform transition-transform hover:scale-110 active:scale-90"
                onClick={handlePrev}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
              <button
                className="w-10 h-10 rounded-full bg-black/30 hover:bg-orange-500 flex items-center justify-center text-white transform transition-transform hover:scale-110 active:scale-90"
                onClick={handleNext}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${activeItem === index ? 'bg-orange-500 w-6' : 'bg-white/70 hover:bg-white'}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`View item ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>

          {/* Content display - Right side */}
          <div 
            className={`w-full lg:w-2/5 transition-all duration-600 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '0.3s' }}
          >
            {mediaItems.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-600 ${activeItem === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 hidden'}`}
              >
                <div className="flex items-center mb-4">
                  <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold text-sm mr-3">
                    {index + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                </div>
                
                <div className="mt-2 mb-6">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    {item.type === 'photo' ? 'Facility Image' : 'Process Video'}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {item.description}
                </p>
                
                <button
                  className="flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors hover:translate-x-1 transform transition-transform"
                >
                  <span>Learn more</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Feature highlights */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-800 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '0.5s' }}
        >
          <div className="bg-orange-50 p-6 rounded-lg border border-gray-200 shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Infrastructure</h3>
            <p className="text-gray-600">State-of-the-art equipment and technology ensuring maximum efficiency and precision</p>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-lg border border-gray-200 shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Control</h3>
            <p className="text-gray-600">Rigorous testing protocols to ensure every product meets our exacting standards</p>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-lg border border-gray-200 shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainable Practices</h3>
            <p className="text-gray-600">Environmentally conscious manufacturing processes reducing our carbon footprint</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingFacility;