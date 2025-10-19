// src/components/ExtraSection.jsx

import React, { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import './ExtraSection.css'; 

gsap.registerPlugin(ScrollTrigger);

// Core Value Card
const CoreValueCard = ({ title, text }) => (
    <div className="value-card">
        <h3 className="value-title">{title}</h3>
        <p className="value-text">{text}</p>
    </div>
);


const ExtraSection = forwardRef((props, ref) => {
    const contentRef = useRef(null);
    const cardsRef = useRef(null);

    // Company Data
    const coreValues = [
        { title: "Innovation", text: "We constantly challenge the status quo to deliver next-generation solutions." },
        { title: "Precision", text: "Every line of code is optimized for maximum performance and reliability." },
        { title: "Impact", text: "Our focus is on creating tools that fundamentally change the way you operate." }
    ];

    // Animation for elements inside this section upon arrival
    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;

        // Animate title, text, and cards with stagger
        gsap.fromTo(container.children, {
            opacity: 0,
            y: 50,
        }, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            scrollTrigger: {
                trigger: container,
                start: "left 80%", // Start when 80% of section is visible
                end: "left 50%", // End when section is centered
                containerAnimation: ScrollTrigger.getById('mainScroll'), // Use the ID of the main horizontal scroll (optional, but good practice)
                toggleActions: "play none none none" 
            }
        });

    }, []);

    return (
        <section ref={ref} className="extra-section-wrapper" style={{ width: '100vw', height: '100vh', flexShrink: 0 }}>
            <div ref={contentRef} className="extra-content">
                
                <h1 className="extra-title">OUT OF THE BOX SYSTEMS</h1>
                
                <p className="extra-text">
                    We are the architects of the new digital landscape. Our mission is to dismantle outdated limitations and engineer systems that define the future of high-performance computing and user experience.
                </p>
                
                <div ref={cardsRef} className="core-values-container">
                    {coreValues.map((value, index) => (
                        <CoreValueCard key={index} title={value.title} text={value.text} />
                    ))}
                </div>

                <div className="extra-footer">
                   <p>Innovation is not a feature; it's our foundation.</p>
                </div>

            </div>
        </section>
    );
});

export default ExtraSection;