"use client"
import React, { useRef } from 'react'
import styles from './Home.module.css'
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



function MeshComponent() {
  const fileUrl = "/scene.gltf";
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });


  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

const Homep1 = () => {


  return (
    <div>
      <div className={`${styles.firstPageHome} firstPageHome`}>
        <div className={`${styles.fHomeBottom}`}>
          <div className={`${styles.fPageHead}`}>
            <h1>Welcome to the AI search tool</h1>
          </div>

          <div id='canvas-div'>
            <Canvas className='threeObjectCanvas'>
              <OrbitControls enableZoom={false} maxDistance={2.3} />
              <ambientLight intensity={3} />
              <pointLight position={[10, 10, 10]} />
              <MeshComponent />
            </Canvas>
          </div>

        </div>
        <div className={`${styles.fpageBtn}`}>
          <button>Try now</button>
        </div>
      </div>
    </div>
  )
}

export default Homep1