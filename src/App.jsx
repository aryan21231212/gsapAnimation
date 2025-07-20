import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const App = () => {
  const greenRef = useRef(null);
  const yellowRef = useRef(null);
  const redRef = useRef(null);
  const blueRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const balls = [greenRef.current, yellowRef.current, redRef.current, blueRef.current];

    const randomMove = balls.map((ball) => {
      return gsap.to(ball, {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-200, 200),
        duration: 1.5,
        repeat: 1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });

    // After random movement, converge to center
    gsap.timeline({ delay: 3 })
      .to(balls, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
      .to(balls, {
        scale: 0.6,
        duration: 0.5,
        ease: 'back.out(2)',
      })
      .to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power4.out',
        delay: 0.3,
      });
  }, []);

  return (
    <div className="main" style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: '#121212', position: 'relative' }}>
      <div ref={greenRef} style={ballStyle('#00ff00')} />
      <div ref={yellowRef} style={ballStyle('#ffff00')} />
      <div ref={redRef} style={ballStyle('#ff0000')} />
      <div ref={blueRef} style={ballStyle('#0000ff')} />

      <h1
        ref={textRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0,
          fontSize: '8rem',
          fontWeight: '900',
          letterSpacing: '10px',
          background: 'linear-gradient(90deg, green, yellow, red, blue)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0px 0px 10px rgba(255,255,255,0.2)',
        }}
      >
        GDSC
      </h1>
    </div>
  );
};

const ballStyle = (color) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: color,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export default App;
