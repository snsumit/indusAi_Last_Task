import React from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const TodoItem = ({ todo, fetchTodos, setSelectedTodo }) => {
    const handleToggleStatus = async () => {
        try {
            const updatedStatus = todo.status === 'DONE' ? 'TO DO' : 'DONE';
            const response = await axios.put(`http://localhost:3000/todos/${todo.id}`, {
                ...todo,
                status: updatedStatus
            });
            if (response.status === 200) {
                fetchTodos(); // Refresh todos after updating
            }
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            try {
                await axios.delete(`http://localhost:3000/todos/${todo.id}`);
                fetchTodos();
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }
    };

    const handleEdit = () => {
        setSelectedTodo(todo);
    };

    return (
        <li className={`todo-item ${todo.status === 'DONE' ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.status === 'DONE'}
                onChange={handleToggleStatus}
            />
            <span className="todo-text">{todo.todo}</span>
            <button onClick={handleEdit} title="Edit Todo">
                <FaEdit />
            </button>
            <button onClick={handleDelete} className="delete-btn" title="Delete Todo">
                <FaTrashAlt />
            </button>
        </li>
    );
};

export default TodoItem;
