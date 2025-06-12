import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { deleteBook } from "../services/api";
import { toast } from "react-toastify";

const ConfirmDeleteDialog = ({ bookId, onClose, onRefresh }) => {

  const handleDelete = async () => {
    try {
      await deleteBook(bookId);
      toast.success("Book deleted successfully");
      onRefresh();
      onClose();
    } catch (err) {
      toast.error("Failed to delete book");
    }
  };

  return (
    <Dialog open={Boolean(bookId)} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this book?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
