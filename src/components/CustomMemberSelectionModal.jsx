/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { Container } from '@mui/material';
import CustomMemberList from './CustomMemberList';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Note: SelectionType will have two arguments either single or multiple

function CustomMemberSelectionModal({
  open,
  setOpen,
  onClose,
  onSubmit,
  membersList,
  selectionType = 'multiple',
  addExpensePayload,
  setAddExpensePayload,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Select members
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <CustomMemberList
            membersList={membersList}
            actionType="check"
            selectionType={selectionType}
            addExpensePayload={addExpensePayload}
            setAddExpensePayload={setAddExpensePayload}
          />
        </Container>
      </Dialog>
    </React.Fragment>
  );
}

export default CustomMemberSelectionModal;
