// src/models/Todo.js

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true 
    },
    todo: { 
        type: String,
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    priority: { 
        type: String,
        required: true 
    },
    status: { 
        type: String, 
        required: true 
    },
    dueDate: { 
        type: Date,
        required: false 
    }
});

// Define the schema paths


const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
