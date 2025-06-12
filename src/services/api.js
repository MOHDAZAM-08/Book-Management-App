import axios from "axios";

// const BASE_URL = "https://crudcrud.com/api/5b748b9b506047bbb6bf482cf0b7f74a/books";
const BASE_URL = "http://localhost:4000/books";

// export const getBooks = async () => {
//   const res = await axios.get(BASE_URL);
//   return res.data;
// };

// export const createBook = async (data) => {
//   const { _id, ...cleanData } = data; // Remove _id if present
//   const res = await axios.post(BASE_URL, cleanData);
//   return res.data;
// };


// export const updateBook = async (id, data) => {
//   const { _id, ...cleanData } = data;
//   const res = await axios.put(`${BASE_URL}/${id}`, cleanData);
//   return res.data;
// };


// export const deleteBook = async (id) => {
//   const res = await axios.delete(`${BASE_URL}/${id}`);
//   return res.data;
// };

export const getBooks = () => axios.get(BASE_URL);
export const createBook = (data) => axios.post(BASE_URL, data);
export const updateBook = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${BASE_URL}/${id}`);
