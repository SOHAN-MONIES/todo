import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/todos', { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/todos/${id}`, { completed });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
         
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo._id, !todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      <aside>
      This is aside tag
      </aside>
      </ul>
    </div>
  );
};

export default App;
