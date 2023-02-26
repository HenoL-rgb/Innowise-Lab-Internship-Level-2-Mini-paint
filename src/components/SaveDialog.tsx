import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type SaveDialogProps = {
  handleSave: (title: string) => void;
};
export default function SaveDialog({ handleSave }: SaveDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleShare = (e: any) => {
    if (title.length === 0) {
      setError(!error);
      return;
    }
    handleSave(title);
    setOpen(false);
  };

  function handleClose() {
    setOpen(false);
  }

  function handleChange(e: any) {
    setTitle(e.target.value);
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Save
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter image title:</DialogContentText>
          <TextField
            autoFocus
            required={true}
            error={error}
            margin="dense"
            id="name"
            label="Title"
            type="email"
            fullWidth
            variant="standard"
            value={title}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleShare}>Share</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
