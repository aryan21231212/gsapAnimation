import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react'

const Practice = () => {
    const wordRef = useRef([]);
    const container = useRef(null);
    const videoRef = useRef(null);

    useGSAP(()=>{
        gsap.from(wordRef.current,{
            opacity:0,
            y:100,
            duration:1,
            stagger:0.05,
            ease:"power4.out"
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
                    end:"+=1000",
                    scrub:true,
                    pin:true,
                }
            })
        }
        video.addEventListener("loadedmetadata",handler);
        return ()=>video.removeEventListener("loadedmetadata",handler);
    },[])
   
    const word = "MOJITO"
  return (
    <>
    <div style={{display:"flex",justifyContent:"center", height:"40vh"}}>
        <h1 style={{display:"flex",color:"white",fontSize:"10rem",letterSpacing:"10px", marginTop:"10rem"}} >
            {word.split('').map((char,index)=>(
                <span ref={(el)=>wordRef.current[index]=el} key={index}>{char}</span>
            ))}
        </h1>
    </div>
    <div ref={container} style={{display:"flex",justifyContent:"center"}}>
            <video style={{height:"800px"}} src="/input.mp4" ref={videoRef} muted playsInline></video>
    </div>
    <div style={{height:"100vh"}}></div>
    </>

  )
}

export default Practice