const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');


// Routing
router.get('/', async (req, res) => {
    const myTodos = await Todo.find().lean();
    res.render('home', {
        todos: myTodos.reverse(),
    });
});

router.post('/addtodo', async (req, res) => {
    const todo = await Todo.create(req.body);
    console.log(todo);
    res.redirect('/');
});

router.post('/delete-todo/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findByIdAndDelete(id);
    console.log(todo);
    res.redirect('/');
});

router.get('/edit-todo/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id).lean();
    res.render('edit-todo', {
        todo: todo,
    });
})

router.post('/edit-todo/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true }).lean();
    await todo.save();

    res.redirect('/');
});


module.exports = router;