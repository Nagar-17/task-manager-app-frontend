import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';


const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        ...task,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const navigate = useNavigate();
  
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/users/me');
        setUser(res.data);
      } catch (err) {
        console.error(err);
        navigate('/');
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
       Hello, {user?.name || '...'} {tasks.length === 0 ? 'Add' : ''} Your Tasks
      </h2>

      {tasks.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center">No tasks yet. Start being productive 🚀</p>
      )}

      <div className="grid gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`rounded-2xl shadow-md p-5 transition duration-300 border-l-8 
              ${task.completed 
                ? 'bg-green-50 dark:bg-green-900 border-green-500' 
                : 'bg-white dark:bg-gray-800 border-blue-500'}
            `}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{task.description}</p>
                )}
                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <p>
                    <strong>Due:</strong>{' '}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : 'No due date'}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    {task.completed ? '✅ Completed' : '⏳ Pending'}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ml-4 whitespace-nowrap 
                  ${
                    task.priority === 'High'
                      ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                      : task.priority === 'Medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                      : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  }
                `}
              >
                {task.priority}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => toggleComplete(task)}
                className="px-4 py-1.5 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {task.completed ? 'Undo' : 'Mark Complete'}
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="px-4 py-1.5 text-sm rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>

              <button
                onClick={() => onEdit(task)}
                className="px-4 py-1.5 text-sm rounded-full bg-gray-500 text-white hover:bg-gray-600 transition"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
