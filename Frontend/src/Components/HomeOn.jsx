import React, { useContext, useEffect, useState } from 'react'
import Homep1 from './Homep1'
import Homep2 from './Homep2'
import Homep3 from './Homep3'
import styles from "./Home.module.css"
import gsap from 'gsap'
import UploadModal from './UploadModal'
import dynamic from 'next/dynamic';
import SearchContext from '@/Context/SearchContext'
const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
});


const HomeOn = () => {

  const movFrames = () => {
    gsap.to(".page2Home", {
      zIndex: 4,
      top: 0,
      duration: 0.5,
      delay: 5
    })
    gsap.to(".firstPageHome", {
      zIndex: 2,
      bottom: "-100vh",
      delay: 5,
      duration: 0.5
    })

    //Third entry

    gsap.to(".page3Home", {
      zIndex: 4,
      left: 0,
      duration: 0.5,
      delay: 10.5,
    })
    gsap.to(".page2Home", {
      zIndex: 2,
      right: "-100%",
      duration: 0.5,
      delay: 10.5
    })

    //Reset positions

    gsap.to(".firstPageHome", {
      delay: 16,
      duration: 0.5,
      bottom: "0",
      zIndex: 4,
    })
    gsap.to(".page3Home", {
      top: "-100vh",
      zIndex: 2,
      duration: 0.5,
      delay: 16,

    })
    gsap.to(".page3Home", {
      delay: 17,
      top: 0,
      left: "-100%",
      duration: 0

    })
    gsap.to(".page2Home", {
      zIndex: 2,
      delay: 17,
      top: "-100vh",
      right: "0"
    })
  }

  useEffect(() => {
    //second entry

    movFrames()

    setInterval(() => {
      movFrames()
    }, 21000);

    return () => {

    }
  }, [])


    const context = useContext(SearchContext)
  const {modalOpen, setModalOpen} = context
  const [curColor, setCurColor] = useState("0,124,177")


  return (
    <div className={`${styles.HomeOnPage}`}>
      <AnimatedCursor
        innerSize={8}
        outerSize={20}
        color={curColor}
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
      />
      <UploadModal />
      <Homep1 />
      <Homep2 />
      <Homep3 />
    </div>
  )
}

export default HomeOn