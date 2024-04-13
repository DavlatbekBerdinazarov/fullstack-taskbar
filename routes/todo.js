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
    const { todo, complated } = req.body; // Changed from "completed" to "complated"

    try {
        await Todo.findByIdAndUpdate(id, { todo, complated: complated === 'on' }, { new: true }); // Convert "complated" to boolean
        res.redirect('/'); // Redirect to the home page or wherever appropriate
    } catch (error) {
        console.error("Error updating todo:", error);
        // Handle error appropriately, e.g., render an error page
        res.status(500).send("Error updating todo");
    }
});



module.exports = router;