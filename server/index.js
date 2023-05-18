// const express = require("express");
// const connection = require("./db/db.js");

// const app = express();

// connection();


// app.listen(5000,()=>{
//     console.log("server is running at 5000");
// });

const express = require('express');
const session = require('express-session');
const connectDB = require('./db/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to MongoDB
connectDB();






// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

