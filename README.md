🔁 1. Clone the Repository
If you're starting fresh:
git clone https://github.com/MOHDAZAM-08/Book-Management-App
cd Book-Management-App


📦 2. Install All Dependencies
Make sure you're inside the project folder:
npm install

🧾 3. Start the React Frontend
npm run dev
This will start the frontend on http://localhost:5173

🔌 4. Run the Mock Backend (json-server)
✅ Create or verify you have db.json in root:
{
  "books": [
    {
      "id": "1",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Romance",
      "year": 1925,
      "status": "Available"
    }
    // ... more books
  ]
}
✅ Then run:
npm run api
This runs your backend API at http://localhost:4000/books

🔗 How the Project Works
React frontend runs on: http://localhost:5173

Mock API (json-server) runs on: http://localhost:4000

All book CRUD actions (GET, POST, PUT, DELETE) are done via http://localhost:4000/books

You interact with this using Axios in your React services

