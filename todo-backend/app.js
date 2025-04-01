const express = require('express');
const sql = require('./db');
const cors = require('cors');

const app = express();

app.use(express.json()); // convert req body into json
app.use(cors({
    origin: ['http://localhost:3001', 'https://your-frontend-app-name.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));


const getTasks = async () => {
    const tasks = await sql`select * from tasks`
    return tasks;
}

app.get('/tasks', async (req, res, next) => {
    const tasks = await getTasks();
    res.status(200).json({
        tasks: tasks
    });
});

app.post('/task', async (req, res, next) => {
    try {
        if (!req.body.newTask) {
            res.status(400).json({
                message: 'Please give task in newTask'
            });
            return;
        }

        // INSERT INTO tasks("gym")
        await sql`INSERT INTO tasks (name) VALUES (${req.body.newTask})`;

        res.status(200).json({
            message: 'Task added successfully'
        });
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    }
});

app.delete('/task/:index', (req, res, next) => {
    // tasks delete elemt at 2 index
    tasks.splice(req.params.index, 1);
    res.status(200).json({
        message: 'Task deleted successfully'
    });
});



app.put('/task/:id', async (req, res, next) => {
    try {
      if (!req.body.updatedTask) {
        res.status(400).json({
          message: 'Please provide updated task in updatedTask field'
        });
        return;
      }
      
      await sql`UPDATE tasks SET name = ${req.body.updatedTask} WHERE id = ${req.params.id}`;
      
      res.status(200).json({
        message: 'Task updated successfully'
      });
    } catch (error) {
      console.log('error', error);
      res.status(500).json({
        message: 'Something went wrong',
        error: error
      });
    }
  });

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});