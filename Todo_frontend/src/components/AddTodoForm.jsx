import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTodoForm = ({ fetchTodos, selectedTodo, clearSelectedTodo }) => {
  const [todo, setTodo] = useState(''); // Text for the todo
  const [priority, setPriority] = useState('LOW'); // Priority of the todo
  const [category, setCategory] = useState('WORK'); // Category of the todo
  const [dueDate, setDueDate] = useState(''); // Due date of the todo
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  useEffect(() => {
    if (selectedTodo) {
      // Populate form fields if a todo is selected for editing
      setTodo(selectedTodo.todo);
      setPriority(selectedTodo.priority);
      setCategory(selectedTodo.category);
      setDueDate(selectedTodo.dueDate ? selectedTodo.dueDate.split('T')[0] : ''); // Format dueDate
    } else {
      // Reset form if no todo is selected
      resetForm();
    }
  }, [selectedTodo]);

  // Function to reset the form state
  const resetForm = () => {
    setTodo('');
    setPriority('LOW');
    setCategory('WORK');
    setDueDate('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state

    try {
      if (selectedTodo) {
        // Update existing todo (PUT request)
        await axios.put(`http://localhost:3000/todos/${selectedTodo.id}`, {
          todo,
          priority,
          category,
          dueDate: dueDate || null,
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        clearSelectedTodo(); // Clear selected todo after update
      } else {
        // Create a new todo (POST request)
        await axios.post('http://localhost:3000/todos', {
          todo,
          priority,
          category,
          status: 'TO DO',
          dueDate: dueDate || null,
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      fetchTodos(); // Refresh todos after adding/updating
      resetForm(); // Clear the form

    } catch (error) {
      console.error('Error submitting todo:', error);
      alert('Failed to submit todo. Please try again.');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add new todo..."
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="WORK">Work</option>
        <option value="HOME">Home</option>
        <option value="LEARNING">Learning</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due Date"
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : selectedTodo ? 'Update Todo' : 'Add Todo'}
      </button>
      {selectedTodo && (
        <button type="button" onClick={clearSelectedTodo}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddTodoForm;
