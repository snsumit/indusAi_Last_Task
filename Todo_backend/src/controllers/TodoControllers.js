const Todo = require("../TodoModel");
const { formatDueDate } = require("../../middlewares/formatDate");
const { v4: uuidv4 } = require('uuid');
const { parse, isValid } = require("date-fns");

const validateTodo = (todo) => {
  const { priority, status, category, dueDate } = todo;

  let error = null;
  
  if (!['HIGH', 'MEDIUM', 'LOW'].includes(priority)) {
      error = 'Invalid Todo Priority';
  }
  if (!['TO DO', 'IN PROGRESS', 'DONE'].includes(status)) {
      error = 'Invalid Todo Status';
  }
  if (!['WORK', 'HOME', 'LEARNING'].includes(category)) {
      error = 'Invalid Todo Category';
  }
  if (!dueDate || !isValid(parse(dueDate, "yyyy-MM-dd", new Date()))) {
      error = 'Invalid Due Date';
  }

  return error;
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error('Error in getTodos:', err);
    res.status(500).send('Server Error');
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id }); // find by UUID, not ObjectId
    if (!todo) return res.status(404).send('Todo not found');
    
    res.json({
      id: todo.id,
      todo: todo.todo,
      priority: todo.priority,
      category: todo.category,
      status: todo.status,
      dueDate: formatDueDate(todo.due_date), // make sure this format function works properly
    });
  } catch (err) {
    console.error('Error in getTodoById:', err);
    res.status(500).send('Server Error');
  }
};

const createTodo = async (req, res) => {
  const { todo, priority, category, dueDate } = req.body;

  let error = validateTodo({ todo, priority, status: 'TO DO', category, dueDate });
  if (error) return res.status(400).send(error);

  try {
    const newTodo = new Todo({
      id: uuidv4(),
      todo,
      priority,
      category,
      status: 'TO DO',
      due_date: dueDate ? new Date(dueDate) : null, // Only set due_date if provided
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).send('Server Error');
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const todo = await Todo.findOne({ id:id }); // Use findOne for custom UUID
    if (!todo) return res.status(404).send('Todo not found');

    // Update the fields dynamically
    Object.keys(updateFields).forEach(field => {
      todo[field] = updateFields[field];
    });

    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).send('Server Error');
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params; // directly extract `id` from `req.params`
  
  try {
    const deletedTodo = await Todo.findOneAndDelete({ id }); // use `findOneAndDelete` to delete by UUID
    if (!deletedTodo) {
      return res.status(404).send('Todo not found');
    }
    res.json(deletedTodo); // return the deleted document as a response
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).send('Server Error');
  }
};




module.exports = { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
