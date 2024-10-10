import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodoForm from './components/AddTodoForm'; 
import TodoItem from './components/TodoItem'; 
import "./App.css"
import Header from './components/Header'
import Footer from "./components/Footer"
const App = () => {
  const [todos, setTodos] = useState([]); // State to hold todos
  const [selectedTodo, setSelectedTodo] = useState(null); // State for selected todo for editing

  // Function to fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data); // Update todos state with fetched data
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to clear selected todo
  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  return (
  
<>
    <Header />
    <main className='container'>
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodoForm 
        fetchTodos={fetchTodos} 
        selectedTodo={selectedTodo} 
        clearSelectedTodo={clearSelectedTodo} 
      />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            fetchTodos={fetchTodos} 
            setSelectedTodo={setSelectedTodo} 
          />
        ))}
      </ul>
    </div>
    </main>
    <Footer />
    </>
  );
};

export default App;
