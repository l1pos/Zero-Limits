// src/components/Section.jsx

import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { gsap } from 'gsap';
import './Section.css'; 
import './Modal.css'; // Modal styles import

/**
 * EmployeeModal Component
 * Displays detailed information about a selected employee.
 * @param {object} props - Component props.
 * @param {object} props.employee - The employee data object.
 * @param {function} props.onClose - Function to close the modal.
 */
const EmployeeModal = ({ employee, onClose }) => {
    // Do not render if no employee is selected
    if (!employee) return null;

    return (
        // Overlay closes modal on outside click
        <div className="modal-overlay" onClick={onClose}>
            {/* Prevent click propagation from closing the modal */}
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>X</button>
                <div className="modal-header">
                    <img src={employee.imageUrl} alt={employee.name} className="modal-image" />
                    <h2>{employee.name}</h2>
                    <p className="modal-title">{employee.title}</p>
                </div>
                <div className="modal-body">
                    <h3>Bio:</h3>
                    <p>{employee.bio}</p>
                </div>
            </div>
        </div>
    );
};

/**
 * EmployeeCard Component
 * Displays a clickable card with basic employee info.
 */
const EmployeeCard = ({ name, title, imageUrl, onClick }) => (
    <div className="employee-card" onClick={onClick}>
        <div className="card-image-wrapper">
            <img src={imageUrl} alt={name} className="card-image" />
            <div className="neon-border"></div>
        </div>
        <h3 className="card-name">{name}</h3>
        <p className="card-title">{title}</p>
    </div>
);

/**
 * HallSection Component
 * Main component displaying the team cards and managing the modal/animations.
 * Uses forwardRef to expose animation controls to the parent component.
 */
const HallSection = forwardRef((props, ref) => {
    const contentRef = useRef(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null); 
    
    // Employee data array
    const employees = [
        { 
            name: "Alex", 
            title: "Frontend Developer", 
            imageUrl: "./frontend-dev.jpg",
            bio: "Alex is the core architect of our interfaces, specializing in React and GSAP. His passion for smooth, performance-driven user experiences ensures every interaction is flawless and intuitive."
        },
        { 
            name: "Victoria", 
            title: "HR Manager", 
            imageUrl: "./hr-png.jpg",
            bio: "Victoria is the guardian of our corporate culture, ensuring we attract and retain top talent. She manages the collective's well-being and drives our diversity and inclusion initiatives."
        },
        { 
            name: "Ivan", 
            title: "Rust Developer", 
            imageUrl: "./rust-devolper.jpg",
            bio: "Ivan builds high-performance, low-latency backends using Rust. His expertise in systems programming is the backbone of our 'Zero Limits' capability, ensuring speed and reliability."
        },
    ];
    
    // Opens modal and disables body scroll
    const handleCardClick = (employee) => {
        setSelectedEmployee(employee);
        document.body.style.overflow = 'hidden'; 
    };

    // Closes modal and restores body scroll
    const handleCloseModal = () => {
        setSelectedEmployee(null);
        document.body.style.overflow = 'auto'; 
    };

    // Expose `animateIn` method via ref for GSAP/scroll control in parent
    useImperativeHandle(ref, () => ({
        animateIn: () => {
            // Animate main content in
            gsap.fromTo(contentRef.current, 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
            );
            
            // Animate employee cards with stagger effect
            gsap.fromTo(".employee-card", 
                { opacity: 0, scale: 0.8 }, 
                { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)", stagger: 0.2, delay: 1 } 
            );
        }
    }));
    
    // Initial setup: set content opacity to 0 to prepare for animation
    useEffect(() => {
        gsap.set(contentRef.current, { opacity: 0 });
    }, []);

    return (
        // Fixed dimensions are crucial for horizontal scroll effect
        <section className="hall-section" style={{ width: '100vw', height: '100vh', flexShrink: 0 }}>
            <div ref={contentRef} className="hall-content">
                
                <h1 className="hall-title">OUR TEAM</h1>
                <p className="hall-subtitle">ENGINEERING THE FUTURE</p> 

                <div className="employee-cards-container">
                    {employees.map((employee, index) => (
                        <EmployeeCard 
                            key={index}
                            name={employee.name}
                            title={employee.title}
                            imageUrl={employee.imageUrl}
                            onClick={() => handleCardClick(employee)}
                        />
                    ))}
                </div>
                
            </div>
            
            <EmployeeModal employee={selectedEmployee} onClose={handleCloseModal} />

        </section>
    );
});

export default HallSection;