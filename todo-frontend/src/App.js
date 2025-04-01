import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { getTasks, addTask, updateTask, deleteTask } from './services/apiService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskName) => {
    try {
      await addTask(taskName);
      fetchTasks(); // Refresh the task list
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error(err);
    }
  };

  const handleEditTask = async (taskId, updatedName) => {
    try {
      await updateTask(taskId, updatedName);
      fetchTasks(); // Refresh the task list
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks(); // Refresh the task list
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <main className="container">
        {error && <div className="error-message">{error}</div>}
        
        <AddTaskForm onAddTask={handleAddTask} />
        
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskList 
            tasks={tasks} 
            onDelete={handleDeleteTask} 
            onEdit={handleEditTask} 
          />
        )}
      </main>
    </div>
  );
}

export default App;