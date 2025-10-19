// src/App.jsx

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import './App.css'; 
import Hero from './components/Hero.jsx'; 
import HallSection from './components/Section.jsx'; 
import ExtraSection from './components/ExtraSection.jsx'; 

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [sceneState, setSceneState] = useState('intro'); 
  const heroRef = useRef(null); 
  const scrollContainerRef = useRef(null); 
  const hallRef = useRef(null); 
  
  // Initial lock: disable scroll and reset window position
  useEffect(() => {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; 
      window.scrollTo(0, 0); 
  }, []); 

  // Horizontal Scroll Logic
  useEffect(() => {
    
    if (sceneState !== 'hall' || !scrollContainerRef.current) return;

    // Enable vertical scrolling for ScrollTrigger's pin mechanism
    document.body.style.overflow = 'auto'; 
    document.documentElement.style.overflow = 'auto';

    const sections = gsap.utils.toArray(scrollContainerRef.current.children);
    let totalWidth = 0;

    sections.forEach(section => {
      totalWidth += section.offsetWidth;
    });

    // GSAP ScrollTrigger setup for horizontal movement
    gsap.to(sections, {
      x: () => -(totalWidth - window.innerWidth), 
      ease: "none",
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        pin: true, 
        scrub: 0.5, 
        end: () => "+=" + (totalWidth - window.innerWidth + 50),
      }
    });

    // Trigger Section 2 'in' animation
    if (hallRef.current && hallRef.current.animateIn) {
        hallRef.current.animateIn();
    }
    
    // Cleanup: reset scroll lock
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.body.style.overflow = 'hidden'; 
      document.documentElement.style.overflow = 'hidden';
    };

  }, [sceneState]);

  // Handler called after Hero exit animation
  const handleSceneChange = () => {
      setSceneState('hall');
  };

  const appStyle = {
    position: 'relative', 
    height: sceneState === 'intro' ? '100vh' : 'auto', 
    width: '100vw', 
    overflow: 'hidden' 
  };

  const horizontalScrollStyle = {
    display: 'flex',
    flexWrap: 'nowrap', 
    width: 'fit-content' // Crucial for horizontal layout
  };

  return (
    <div className="App" style={appStyle}>
      
      {/* Scene 1: Hero Intro */}
      {sceneState === 'intro' && (
          <Hero 
            ref={heroRef} 
            onStartClick={handleSceneChange} 
          />
      )}
      
      {/* Scene 2 & 3: Horizontal Scroll Container */}
      {sceneState === 'hall' && (
        <div ref={scrollContainerRef} style={horizontalScrollStyle}>
          
          <HallSection ref={hallRef} /> 
          <ExtraSection /> 
          
        </div>
      )}
    </div>
  );
}

export default App;