import { Button, Dialog, DialogActions, DialogContent, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text:string;
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const MessageManager: React.FC<DialogProps> = ({ open, onClose, onConfirm,text }) => {
  if (!open) return null;

  return (
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>{text}</DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>OK</Button>
        </DialogActions>
      </Dialog>
    
  );
};

export default MessageManager;



