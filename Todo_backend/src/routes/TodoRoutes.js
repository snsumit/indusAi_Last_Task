const express = require('express');
const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require("../controllers/TodoControllers");

const router = express.Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
router.post('/todos', createTodo);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

module.exports = router;
