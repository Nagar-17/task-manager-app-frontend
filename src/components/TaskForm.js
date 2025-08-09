import React, { useState, useEffect } from 'react';
import API from '../api';

const TaskForm = ({ onTaskSaved, editTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
  });

  useEffect(() => {
    if (editTask) {
      setTask({
        title: editTask.title,
        description: editTask.description || '',
        dueDate: editTask.dueDate ? editTask.dueDate.substring(0, 10) : '',
        priority: editTask.priority || 'Medium',
      });
    }
  }, [editTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editTask) {
      await API.put(`/tasks/${editTask._id}`, task);
    } else {
      await API.post('/tasks', task);
    }

    setTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
    });

    onTaskSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        {editTask ? '✏️ Edit Task' : '➕ Add New Task'}
      </h3>

      <input
        name="title"
        placeholder="Task title"
        value={task.title}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
      />

      <input
        name="description"
        placeholder="Description (optional)"
        value={task.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
      />

      <input
        name="dueDate"
        type="date"
        value={task.dueDate}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
      />

      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
      >
        {editTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;