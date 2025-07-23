import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lettersRef = useRef([]);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  useGSAP(() => {

    gsap.from(lettersRef.current, {
      opacity: 0,
      y: 200,
      duration: 1,
      stagger: 0.05,
      ease: 'power4.out',
    });


    const video = videoRef.current;

    const handleLoaded = () => {
      const duration = video.duration;


      gsap.to(video, {
        currentTime: duration,
        ease: 'none',
        scrollTrigger: {
          trigger: videoContainerRef.current,
          start: 'top top',
          end: '+=1000', 
          scrub: true,
          pin: true,
        },
      });
    };

    video.addEventListener('loadedmetadata', handleLoaded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
    };
  }, []);

  const word = 'MOJITO';

  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'center', height: '40vh',  }}>
        <h1
          style={{
            color: 'white',
            fontSize: '10rem',
            letterSpacing: '10px',
            display: 'flex',
            marginTop: '10rem',
          }}
        >
          {word.split('').map((char, index) => (
            <span
              key={index}
              ref={(el) => (lettersRef.current[index] = el)}
              // style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>


      <div
        ref={videoContainerRef}
        style={{ display: 'flex', justifyContent: 'center'  }}
      >
        <video
          ref={videoRef}
          src="/input.mp4"
          muted
          playsInline
          style={{ height: '800px',background:"transparent", mixBlendMode:"screen" }}
        />
      </div>


      <div style={{ minHeight: '100vh'}}></div>
    </>
  );
};

export default App;


