const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const todoRoutes =  require('./model/todoRoutes')
require('dotenv').config();

app.use(cors())
app.use(express.json());


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err)=>{console.log(err);})


app.use('/api/todos',todoRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})