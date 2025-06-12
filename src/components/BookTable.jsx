import React, { useState, useMemo, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    MenuItem,
    Pagination,
    Skeleton,
    ToggleButton,
    ToggleButtonGroup,
    Card,
    CardContent,
    Typography,
    Grid,
} from "@mui/material";
import { Edit, Delete, ViewModule, ViewList } from "@mui/icons-material";

const BookTable = ({ books, onEdit, onDelete }) => {
    const [search, setSearch] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [page, setPage] = useState(1);
    const [viewMode, setViewMode] = useState("table");

    const filteredBooks = useMemo(() => {
        return books
            .filter(
                (book) =>
                    (book.title.toLowerCase().includes(search.toLowerCase()) ||
                        book.author.toLowerCase().includes(search.toLowerCase())) &&
                    (genreFilter ? book.genre === genreFilter : true) &&
                    (statusFilter ? book.status === statusFilter : true)
            )
            .slice((page - 1) * 10, page * 10);
    }, [books, search, genreFilter, statusFilter, page]);

    const uniqueGenres = [...new Set(books.map((b) => b.genre))];
    const isLoading = books.length === 0;

    useEffect(() => {
        setPage(1);
    }, [search, genreFilter, statusFilter]);


    return (
        <div>
            <div className="flex gap-4 mb-4 items-center justify-between lg:flex-row flex-col">
                <TextField
                    label="Search by Title/Author"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    variant="outlined"
                    size="small"
                    className="lg:w-52 w-full"
                />
                <div className="flex gap-2 items-center justify-between w-full">
                    <div className="flex gap-2 items-center">
                        <TextField
                            select
                            label="Genre"
                            value={genreFilter}
                            onChange={(e) => setGenreFilter(e.target.value)}
                            variant="outlined"
                            size="small"
                            className="lg:w-48 w-24"
                        >
                            <MenuItem value="">All</MenuItem>
                            {uniqueGenres.map((genre) => (
                                <MenuItem key={genre} value={genre}>
                                    {genre}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Status"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            variant="outlined"
                            size="small"
                            className="lg:w-48 w-24"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Available">Available</MenuItem>
                            <MenuItem value="Issued">Issued</MenuItem>
                        </TextField>
                    </div>

                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={(e, val) => val && setViewMode(val)}
                        size="small"
                    >
                        <ToggleButton value="table">
                            <ViewList fontSize="small" />
                        </ToggleButton>
                        <ToggleButton value="grid">
                            <ViewModule fontSize="small" />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>

            {!isLoading && filteredBooks.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    <Typography variant="body1" color="text.secondary">
                        No data available based on your filters.
                    </Typography>
                </div>
            ) :

                viewMode === "table" ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow
                                    sx={{
                                        backgroundColor: "#6366F1",
                                        borderLeft: "5px solid #6366F1", // ✅ fixed quote placement
                                        "& th": {
                                            color: "#ffffff",
                                            fontWeight: "bold",
                                            fontSize: "0.95rem",
                                        },
                                    }}

                                >
                                    <TableCell>Title</TableCell>
                                    <TableCell>Author</TableCell>
                                    <TableCell>Genre</TableCell>
                                    <TableCell>Published Year</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {isLoading
                                    ? Array.from(new Array(5)).map((_, i) => (
                                        <TableRow key={i}>
                                            {[...Array(6)].map((_, j) => (
                                                <TableCell key={j}>
                                                    <Skeleton variant="text" />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                    : filteredBooks.map((book) => (
                                        <TableRow
                                            key={book._id}
                                            sx={{
                                                backgroundColor: book.status === "Available" ? "#ECFDF5" : "#FEF2F2",
                                                borderLeft: `5px solid ${book.status === "Available" ? "#10B981" : "#EF4444"}`,
                                                transition: "background 0.3s ease",
                                                '&:hover': { backgroundColor: book.status === "Available" ? "#D1FAE5" : "#FECACA" }
                                            }}
                                        >
                                            <TableCell sx={{ color: "primary.main", fontWeight: 600, fontStyle: "headerFont" }}>
                                                {book.title.length > 20 ? book.title.slice(0, 20) + "..." : book.title}
                                            </TableCell>
                                            <TableCell>{book.author}</TableCell>
                                            <TableCell>{book.genre}</TableCell>
                                            <TableCell>{book.year}</TableCell>
                                            <TableCell
                                                sx={{ fontWeight: 600, color: book.status === "Available" ? "success.main" : "error.main" }}
                                            >
                                                {book.status}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => onEdit(book)}>
                                                    <Edit color="primary" />
                                                </IconButton>
                                                <IconButton onClick={() => onDelete(book.id)}>
                                                    <Delete color="error" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>

                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginX: "auto" }}  >
                        {filteredBooks.map((book) => (
                            <Grid columnSpan={{ xs: 12, sm: 6, md: 4 }}  key={book._id}  >
                                <Card
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: book.status === "Available" ? "#ECFDF5" : "#FEF2F2",
                                        borderLeft: `5px solid ${book.status === "Available" ? '#10B981' : '#EF4444'}`,
                                        transition: "transform 0.2s",
                                        '&:hover': { transform: 'scale(1.02)' }
                                    }}
                                >
                                    <CardContent className="w-48">
                                        <Typography variant="h6" color="primary.main">
                                            {book.title.length > 12 ? book.title.slice(0, 12) + "..." : book.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Author:{book.author.length > 12 ? book.author.slice(0, 12) + "..." : book.author}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Genre: {book.genre}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Year: {book.year}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 600, color: book.status === "Available" ? "success.main" : "error.main" }}
                                        >
                                            Status: {book.status}
                                        </Typography>
                                        <div className="flex gap-2 mt-2">
                                            <IconButton onClick={() => onEdit(book)} className="rounded-full !bg-blue-200">
                                                <Edit color="primary" />
                                            </IconButton>
                                            <IconButton onClick={() => onDelete(book.id)} className="rounded-full !bg-red-200">
                                                <Delete color="error" />
                                            </IconButton>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                )}

            {!isLoading && (
                <div className="flex justify-center mt-4">
                    <Pagination
                        count={Math.ceil(
                            books.filter(
                                (book) =>
                                    (book.title.toLowerCase().includes(search.toLowerCase()) ||
                                        book.author.toLowerCase().includes(search.toLowerCase())) &&
                                    (genreFilter ? book.genre === genreFilter : true) &&
                                    (statusFilter ? book.status === statusFilter : true)
                            ).length / 10
                        )}
                        page={page}
                        onChange={(e, val) => setPage(val)}
                    />
                </div>
            )}
        </div>
    );
};

export default BookTable;
