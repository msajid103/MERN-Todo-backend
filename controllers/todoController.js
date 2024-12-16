const Todo = require('../models/Todo');


exports.createTodo = async (req, res) => {
    const { title, description } = req.body;

    const newTodo = new Todo({
        title,
        description,
        user: req.user 
    });

    try {
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user }); 
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(todo);
    } catch (err) {
        res.status(404).json({ message: "Todo not found" });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user }); 
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or access denied.' });
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteTodoById = async (req, res) => {
    try {
        const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user }); 
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found or access denied.' });
        }
        res.json({ message: 'Todo deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTodoById = async (req, res) => {
    const { title, description } = req.body;

    try {
        // Find the TODO by ID and update
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true, runValidators: true } // Return the updated document and validate input
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
