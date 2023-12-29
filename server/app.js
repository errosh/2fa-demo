const express = require('express')
const app = express()
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');
const router = require('./routes/user');
const path = require('path');
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("Database connection established!");
  })
  .catch((err) => console.log(err));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors({origin:['http://localhost:3000']}))
app.use(express.json())
app.use('/api',router)

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`)
})



