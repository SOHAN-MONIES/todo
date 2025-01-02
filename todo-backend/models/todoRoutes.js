const express = require('express');
const app = express();
const Todo = require('../models/Mini_Schema');

// Get all todos
app.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new todo
app.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a todo
app.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a todo
app.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        await todo.deleteOne();
        res.json({ message: 'Deleted todo' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = app;
