const express = require('express')
const Todo = require('./todoSchema')
const app = express();
app.use(express.json());



app.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message : err.message})
    }
})


app.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
    })
    try {  
        const newTodo = await todo.save();
        res.status(201).json({message : `${newTodo} is added`}) 
    } catch (error) {
     
        res.status(404).json({message: error.message})
    }
})

app.patch('/:id', async (req, res) => {
    try {
        const title = req.body.title
        const EditedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            { $set: {title: title} },
            { new: true })
        if (!EditedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ "message" : `${EditedTodo} is edited`})
    } catch (error) {
 
        res.status(404).json({ message: error.message })
    }
})


app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTodo = await Todo.findOneAndDelete({
            _id : id
        })
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(201).json({"message" : `${deletedTodo} is deleted`})
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
})


module.exports = app;