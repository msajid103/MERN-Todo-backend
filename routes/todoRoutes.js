const express = require('express');
const {
    createTodo,
    getTodos,
    getTodoById,
    deleteTodoById,
    updateTodoById 
} = require('../controllers/todoController');

const router = express.Router();

// Define routes
router.post('/', createTodo);
router.get('/', getTodos);
router.get('/:id', getTodoById);
router.delete('/:id', deleteTodoById);
router.put('/:id', updateTodoById); 

module.exports = router;
