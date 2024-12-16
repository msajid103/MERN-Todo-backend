const express = require('express');
const {
    createTodo,
    getTodos,
    getTodoById,
    deleteTodoById,
    updateTodoById
} = require('../controllers/todoController');

const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();


router.post('/', authMiddleware, createTodo);
router.get('/', authMiddleware, getTodos);
router.get('/:id', authMiddleware, getTodoById);
router.delete('/:id', authMiddleware, deleteTodoById);
router.put('/:id', authMiddleware, updateTodoById);

module.exports = router;
