import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useNavigate } from 'react-router-dom';

function App() {
  const [reload, setReload] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleReload = () => {
    setReload(!reload);
    setEditTask(null);
    setShowModal(false);
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const handleAddTask = () => {
    setEditTask(null);
    setShowModal(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={
      `${darkMode ? 'dark' : ''} min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 font-sans`
    }>

 <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h2 className="md:text-xl font-bold text-blue-700 dark:text-blue-300">
            📝 Personal Task Manager
          </h2>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Manage your daily goals like a pro
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button
              onClick={logout}
              className="text-xs px-3 py-1 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>
       {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Menu
          </h3>
          <button
            className="text-gray-600 dark:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setMenuOpen(false);
            }}
            className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Background Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <main className=" mx-auto px-4 py-6 dark:bg-gray-900 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
        <TaskList key={reload} onEdit={handleEdit} />
        <div className="mb-6 flex justify-center">
          <button
            onClick={handleAddTask}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            ➕ Add New Task
          </button>
        </div>

        
      </main>

      {/* Modal for editing task */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              ✖️
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Task
            </h2>
            <TaskForm onTaskSaved={handleReload} editTask={editTask} />
          </div>
        </div>
      )}

      <footer className="text-center py-6 text-sm text-gray-400 dark:bg-gray-900 dark:text-gray-500">
        &copy; {new Date().getFullYear()} Personal Task Manager • Built with by Pravin
      </footer>
    </div>
  );
}

export default App;
