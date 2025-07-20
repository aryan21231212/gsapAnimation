import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const phrases = [
  "BUILD. INNOVATE. CONNECT.",
  "WELCOME TO GDSC 🚀"
];

const App = () => {
  const circleRefs = useRef([]);
  const rippleRef = useRef(null);
  const containerRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Typing effect
  useEffect(() => {
    if (phraseIndex >= phrases.length) return;

    const text = phrases[phraseIndex];
    setTypedText('');
    let i = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setPhraseIndex((prev) => prev + 1);
        }, 1500);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [phraseIndex]);

  // Animations
  useEffect(() => {
    // Drop circles from above
    circleRefs.current.forEach((circle, i) => {
      gsap.fromTo(
        circle,
        { y: -300, scale: 0.5 },
        {
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'bounce.out',
          delay: i * 0.2,
        }
      );
    });

    // Ripple and shake
    gsap.fromTo(
      rippleRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 3,
        opacity: 0.1,
        duration: 1,
        ease: 'expo.out',
        delay: 0.8,
      }
    );

    gsap.fromTo(
      containerRef.current,
      { x: 0 },
      {
        x: 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        delay: 1.2,
      }
    );
  }, []);

  const googleColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100vw',
        background: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Ripple Impact */}
      <div
        ref={rippleRef}
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #00000022, transparent)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />

      {/* Falling Circles */}
      {googleColors.map((color, i) => (
        <div
          key={i}
          ref={(el) => (circleRefs.current[i] = el)}
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: color,
            position: 'absolute',
            top: '45%',
            left: `${40 + i * 5}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            boxShadow: `0 4px 15px ${color}88`,
          }}
        ></div>
      ))}

      {/* Typing Text */}
      <h1
        style={{
          fontSize: '2.8rem',
          fontWeight: '700',
          marginTop: '260px',
          fontFamily: 'monospace',
          letterSpacing: '3px',
          color: '#202124',
          zIndex: 2,
          whiteSpace: 'pre',
        }}
      >
        {typedText}
      </h1>
    </div>
  );
};

export default App;
