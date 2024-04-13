const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    complated: {
        default: false,
        type: Boolean
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;