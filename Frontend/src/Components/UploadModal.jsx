import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import SearchContext from '@/Context/SearchContext';
import styles from "./Home.module.css"
import Link from 'next/link';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  // display:"flex",
  // justifyContent:"center",
  borderRadius:"12px",
  p: 4,
  border:"none"
};

export default function UploadModal() {
  const context = useContext(SearchContext)
  const {modalOpen, setModalOpen} = context
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        sx = {{zIndex:"50"}}
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx = {{padding:"3% 0"}} id="modal-modal-title" variant="h5" component="h2">
            Select your work
          </Typography>
          <Box sx = {{display:"flex", gap:"50px", flexWrap:"wrap", width:"100%"}}>
            <Link href = "/imgdetect"><Box sx = {{display:"flex", flexDirection:"column", gap:"10px"}}><Box> <button className={`${styles.btnForDetect1}`}>  </button></Box><label htmlFor="">Object detection from images</label></Box></Link>
            <Box sx = {{display:"flex", flexDirection:"column", gap:"10px"}}><Box> <button className={`${styles.btnForDetect2}`}>  </button></Box><label htmlFor="">Object detection from Video</label></Box>
            <Box sx = {{display:"flex", flexDirection:"column", gap:"10px"}}><Box> <button className={`${styles.btnForDetect3}`}>  </button></Box><label htmlFor="">Object detection from webcam</label></Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}