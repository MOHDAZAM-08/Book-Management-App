import React, { useEffect, useState } from "react";
import BookTable from "../components/BookTable";
import BookFormModal from "../components/BookFormModal";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { createBook, getBooks } from "../services/api";
import { CircularProgress, Button } from "@mui/material";
import data from "../../db.json"; // Assuming you have a JSON file with book data


function Dashboard() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchBooks = async () => {
        setLoading(true);
        const data = await getBooks();

        setBooks(data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleInsertData = (books) => async () => {
        for (const book of books) {
            try {
                await createBook(book); // single await is enough
                fetchBooks();
            } catch (err) {
                console.error(`❌ Failed: ${book.title}`, err.message);
            }
        }
    };


    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 title" >
                    Book Dashboard
                </h1>

                <div className="gap-2 flex items-center text-xs">
                    <Button variant="contained" color="primary" onClick={() => setIsFormOpen(true)}>
                        + Add Book
                    </Button>

                    {/* Insert Data from JSON */}
                    {/* <Button variant="contained" color="primary" onClick={handleInsertData(data.books)}>
                    Insert Data
                </Button> */}
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center mt-20">
                    <CircularProgress />
                </div>
            ) : (
                <BookTable
                    books={books}
                    onEdit={(book) => {
                        setSelectedBook(book);
                        setIsFormOpen(true);
                    }}
                    onDelete={(id) => setDeleteId(id)}
                />
            )}

            <BookFormModal
                open={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setSelectedBook(null);
                }}
                onRefresh={fetchBooks}
                book={selectedBook}
            />

            <ConfirmDeleteDialog
                bookId={deleteId}
                onClose={() => setDeleteId(null)}
                onRefresh={fetchBooks}
            />
        </div>
    );
}

export default Dashboard;
