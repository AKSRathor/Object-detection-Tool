"use client"
import React, { useRef, useState, useEffect } from 'react'
import styles from './Home.module.css'
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'





function MeshComponent3() {
  const fileUrl = "/humanoid/Unarmed.fbx";
  const mesh = useRef(null);
  const fbx = useLoader(FBXLoader, fileUrl);
  const mixer = new THREE.AnimationMixer(fbx);
  fbx.animations.forEach(clip => {
    const action = mixer.clipAction(clip)
    action.play();
  });
  useFrame((state, delta) => {
    mixer?.update(delta)
  })

  fbx.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.material.side = THREE.FrontSide
    }
  })
  
  useEffect(() => {

    mesh.current.position.y = -2.6
    mesh.current.rotation.y = -0.523
    console.log(mesh.current)

    gsap.to(mesh.current.scale, {
      x: 0.035,
      y: 0.035,
      z: 0.035
    })
    console.log(mesh.current)

    return () => {

    }
  }, [])


  return (
    <mesh ref={mesh}>
      <primitive object={fbx} />
    </mesh>
  );
}


const Homep3 = () => {
  return (
    <div className={`${styles.page3Home} page3Home`}>
      <div className={`${styles.threeHomeBottom}`}>
        <div className={`${styles.threePageHead}`}>
          <h1>When the most powerful human exist inside the machine</h1>
        </div>

        <div className={`${styles.threepageBtn} `}>
          <button>Features</button>
        </div>


      </div>
      <div id='canvas-div2'>
        <Canvas className='threeObjectCanvas2'>
          <OrbitControls enableZoom = {false} enableRotate = {false}/>
          <ambientLight intensity={3} />
          <pointLight position={[10, 10, 10]} />
          <MeshComponent3 />
        </Canvas>
      </div>
    </div>
  )
}

export default Homep3