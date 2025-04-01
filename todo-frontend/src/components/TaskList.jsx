import React, { useState } from 'react';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditedText(task.name);
  };

  const saveEdit = (id) => {
    if (editedText.trim()) {
      onEdit(id, editedText);
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add a task to get started!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editingId === task.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="edit-input"
                  />
                  <div className="edit-buttons">
                    <button onClick={() => saveEdit(task.id)} className="save-btn">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="view-mode">
                  <span>{task.name}</span>
                  <div className="task-buttons">
                    <button
                      onClick={() => startEditing(task)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;