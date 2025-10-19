import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

// Use forwardRef to receive ref from parent (App.jsx)
const Hero = forwardRef(({ onStartClick }, ref) => {
  const headingRef = useRef(null); 
  const videoRef = useRef(null); 

  // Expose methods to the parent component
  useImperativeHandle(ref, () => ({
      startVideoZoomAndExit: () => {
          
          // 1. Animate video: Zoom in and fade out for exit effect
          gsap.to(videoRef.current, {
              scale: 2.5, 
              opacity: 0, 
              duration: 2,
              ease: "power2.inOut"
          });
          
          // 2. Hide all UI elements
          gsap.to([headingRef.current, ".hero-signature-container", ".start-button"], {
              opacity: 0,
              duration: 0.5,
              ease: "power1.out"
          });

          // 3. Trigger scene change after animation completes
          setTimeout(() => {
              onStartClick(); // App.jsx changes sceneState
          }, 1800); 
      }
  }));

  return (
    <section className="hero">
      <video ref={videoRef} className="hero-video" autoPlay loop muted playsInline> 
        <source src="./background-main.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-overlay">
        
        {/* Main Heading Block */}
        <div ref={headingRef} className="hero-heading"> 
          <div className="line-top">
            <span className="small-the">THE</span>
            <h1 className="big-text">HALL</h1>
            <span className="small-off">OF</span>
          </div>
          <h2 className="big-text bottom-text">ZERO LIMITS</h2>
        </div>

        {/* Start Button */}
        <button 
          // Calls the exposed animation function via ref
          onClick={() => ref.current.startVideoZoomAndExit()} 
          className="start-button"
        >
          Enter
        </button>
        
        {/* Signature/Copyright Container */}
        <div className="hero-signature-container">
            <div className="hero-signature">
                <img src="./logo-company.png" alt="Company Logo" className="signature-logo" />
                <span className="copyright-text">Ⓒ Out of The Box Systems</span>
            </div>
        </div>
        
      </div> 
    </section>
  );
});

export default Hero;
