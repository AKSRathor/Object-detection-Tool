"use client"
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from "./img.module.css"
import { styled } from '@mui/material/styles';
import ImageDetectModal from '@/Components/ImageDetectModal';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const page = () => {
  const [upFileImg, setUpFileImg] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [imgUrlState, setImgUrlState] = useState(false)
  const wrapperRef = useRef()
  const [ddBefore, setDdBefore] = useState("Drag and drop your files")
   
  
  useEffect(() => {

    gsap.fromTo(".imgDHome", {
      // display: "flex",
    }, {
      display: "none",
      delay: 5
    });

    return () => {

    }
  }, [])

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    console.log("on submit section")
    const formData = new FormData();
    formData.append('myfile', upFileImg);
    const response = await fetch("http://127.0.0.1:5000/aiimg", {
      method: 'POST',
      headers: {

      },
      body: formData
    })
    const json = await response.blob()
    const imageUrl =  URL.createObjectURL(json);
    console.log(" Return format: ",imageUrl)
    setImgUrlState(imageUrl)
    setOpen(true)
  }

  const handleOnUpload = (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0]
    setUpFileImg(file)
    setDdBefore(file.name)


  }

  const onDragEnter = () => {
    wrapperRef.current.classList.add('dragover')
  }
  const onDragLeave = () => {
    wrapperRef.current.classList.remove('dragover')
  }
  const onDrop = () => {
    wrapperRef.current.classList.add('dragover')
  }

  return (
    <div>
      <div className={`${styles.imgDHome} imgDHome`}>
        <img src="./stocks/photodetect.jpg" className={`${styles.imgLoad}`} alt="" />
      </div>

      {/* <Button component="label" variant="contained" 
      // startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" name='myfile' onChange={handleOnUpload} />
      </Button> */}

      {/* <form> */}

      {/* <label htmlFor="file">File</label> */}
      <div className={`${styles.UploadDivImg}`}>
        <div className={`${styles.imgInput}`} ref = {wrapperRef} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>

          <div className={`${styles.dragNDropFiles}`}>
            <img src="https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-Transparent-File.png" alt="" />
            <p>{ddBefore}</p>
          </div>

          <input id={`${styles.uploadInput}`} name="myfile" type="file" onChange={handleOnUpload} disabled = {upFileImg} />

        </div>
        <div className={`${styles.imgSubmit}`}>
          <button onClick={handleOnSubmit}>Detect</button>
        </div>

      </div>
      <div className="yourImage"></div>
      <div className={`${styles.imageFetchedAfter}`}>
        <ImageDetectModal open = {open} setOpen = {setOpen} imgUrlState = {imgUrlState}/>
      </div>
      {/* </form> */}

    </div>
  )
}

export default page