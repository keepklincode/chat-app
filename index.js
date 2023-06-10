const express = require("express");
const authRoutes = require("./routes/auth");
const blogPostRoutes = require("./routes/blogPost");

const app = express();

app.use(express.json());

const port = 3005;


const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/blog-api'; // Replace with your MongoDB URI

mongoose.connect(dbURI, { 
    useNewUrlParser: true, useUnifiedTopology: true
    })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

  app.use("/", authRoutes);
  // app.use("/", blogPostRoutes)


app.listen(port, () =>{
    console.log(`server listening to port ${port}`);
})