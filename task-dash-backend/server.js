const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Placeholder for task data
let tasks = [];

// Create Task (POST request)
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        text: req.body.text,
        completed: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Read All Tasks (GET request)
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// Update Task (PUT request)
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        task.text = req.body.text !== undefined ? req.body.text : task.text;
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
        res.status(200).json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete Task (DELETE request)
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);

    res.status(200).json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
