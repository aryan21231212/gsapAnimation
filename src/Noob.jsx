import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react'

const Noob = () => {

    const wordRef = useRef([])
    const container = useRef(null)
    const videoRef = useRef(null)
    const word = "MOJITO";

    useGSAP(()=>{
        gsap.from(wordRef.current,{
            opacity:0,
            y:100,
            duration:1,
            stagger:0.05,
            ease:"power4.inOut"
        })

        const video = videoRef.current;
        const handler = ()=>{
            let duration = video.duration;
            gsap.to(video,{
                currentTime:duration,
                ease:"none",
                scrollTrigger:{
                    trigger:container.current,
                    start:"top top",
                    end:"+1000",
                    scrub:true,
                    pin:true
                }
    
            })
        }

        video.addEventListener('loadedmetadata', handler);
        return ()=>{
            video.removeEventListener('loadedmetadata', handler);
        }


    },[])
  return (

    <>
    <div style={{display:"flex", justifyContent:"center",height:"40vh",background:"black"}} >
        <h1 style={{display:"flex", marginTop:"10rem",color:"white",fontSize:"10rem",letterSpacing:"10px"}} >
            {word.split('').map((char,idx)=>
                <span ref={(el)=>wordRef.current[idx]=el} key={idx} >{char}</span>
            )}
        </h1>
    </div>
    <div ref={container} style={{display:"flex",justifyContent:"center"}} >
        <video ref={videoRef} muted playsInline style={{height:"800px"}} src="/input.mp4"></video>
    </div>
    <div style={{height:"100vh", bacground:"black"}} ></div>
    </>
    
  )
}

export default Noob