import React, { useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createBook, updateBook } from "../services/api";
import { toast } from "react-toastify";

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required"),
    genre: yup.string().required("Genre is required"),
    year: yup.number().required("Year is required").positive().integer(),
    status: yup.string().oneOf(["Available", "Issued"]).required(),
});

const BookFormModal = ({ open, onClose, onRefresh, book }) => {
    const isEdit = Boolean(book);


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            author: "",
            genre: "",     // ✅ must be a valid string or ''
            year: "",
            status: "",    // ✅ must be a valid string or ''
            ...book
        },
    });

    useEffect(() => {
        reset(book || {});
    }, [book, reset]);

    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                await updateBook(book.id, data);
                toast.success("Book updated successfully");
            } else {
                await createBook(data);
                toast.success("Book added successfully");
            }
            reset();
            onRefresh();
            onClose();
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth disableEnforceFocus={false}>
            <DialogTitle>{isEdit ? "Edit Book" : "Add Book"}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="space-y-2 gap-4 flex flex-col" >
                    <TextField
                        label="Title"
                        fullWidth
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        label="Author"
                        fullWidth
                        {...register("author")}
                        error={!!errors.author}
                        helperText={errors.author?.message}
                    />
                    <TextField
                        select
                        label="Genre"
                        defaultValue=""
                        fullWidth
                        {...register("genre")}
                        error={!!errors.genre}
                        helperText={errors.genre?.message}
                    >
                        <MenuItem value="Classic">Classic</MenuItem>
                        <MenuItem value="Dystopian">Dystopian</MenuItem>
                        <MenuItem value="Fiction">Fiction</MenuItem>
                        <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                        <MenuItem value="Romance">Romance</MenuItem>
                        <MenuItem value="Fantasy">Fantasy</MenuItem>
                        <MenuItem value="Science Fiction">Science Fiction</MenuItem>
                        <MenuItem value="Mystery">Mystery</MenuItem>
                        <MenuItem value="Adventure">Adventure</MenuItem>
                    </TextField>
                    <TextField
                        label="Published Year"
                        fullWidth
                        type="number"
                        {...register("year")}
                        error={!!errors.year}
                        helperText={errors.year?.message}
                    />
                    <TextField
                        select
                        label="Status"
                        fullWidth
                        defaultValue=""
                        {...register("status")}
                        error={!!errors.status}
                        helperText={errors.status?.message}
                    >
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Issued">Issued</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        {isEdit ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default BookFormModal;