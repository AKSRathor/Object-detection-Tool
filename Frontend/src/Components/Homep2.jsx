"use client"

import React, { useRef, useState, useEffect } from 'react'
import styles from './Home.module.css'
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap"





function MeshComponent2() {
  const fileUrl = "/robot/scene.gltf";
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    // mesh.current.rotation.y += 0.01;
  });
  useEffect(() => {

    mesh.current.position.y = -2.6

    gsap.to(mesh.current.scale, {
      x: 0.6,
      y: 0.6,
      z: 0.6
    })
    gsap.to(mesh.current.rotation, {
      x: 0.174,
      yoyoEase: true,
      repeat: -1,
      duration: 1,
    })
    gsap.to(mesh.current.position, {
      y: -2.5,
      repeat: -1,
      duration: 1,
      yoyoEase: true,
    })
    console.log(mesh.current)

    return () => {

    }
  }, [])


  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}



const Homep2 = () => {
  return (
    <div className={`${styles.page2Home} page2Home`}>
      <div className={`${styles.sHomeBottom}`}>
        <div className={`${styles.sPageHead}`}>
          <h1>Watchout the amazing powers of AI</h1>
        </div>

        <div className={`${styles.spageBtn} `}>
          <button>Get Started</button>
        </div>
      </div>
      <div id='canvas-div2'>
        <Canvas className='threeObjectCanvas2'>
          <OrbitControls enableZoom={false} enableRotate={false} />
          <ambientLight intensity={3} />
          <pointLight position={[10, 10, 10]} />
          <MeshComponent2 />
        </Canvas>
      </div>
    </div>
  )
}

export default Homep2