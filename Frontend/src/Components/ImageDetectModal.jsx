import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ImgProgress from './ImgProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ImageDetectModal(props) {
  
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);
  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Objects Detected
          </Typography>
          <Box sx = {{width:"80%", padding:"3%"}}>
            {!props.imgUrlState && <div style={{padding:"5%"}}><ImgProgress/>
            </div>}
            <img style= {{width:"100%"}} src={props.imgUrlState} alt="" />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
