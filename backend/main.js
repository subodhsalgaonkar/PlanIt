import mongoose from "mongoose";
import express from "express";
import { Todo } from "./models/Todo.js";

let conn = await mongoose.connect("mongodb://localhost:27017/Todo")

const app = express()
const port = 3000

app.get('/', (req, res) => {
    const todo = new Todo({ desc: "Beginner", isDone: true, days: 1 })
    todo.save();
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
