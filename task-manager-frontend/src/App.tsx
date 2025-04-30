import { useEffect, useState } from 'react';
import { getTasks } from './services/taskService';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

import './App.css';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des tâches :", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px'
    }}>
      <img src="/logo.png" alt="Logo" style={{ height: '50px' }} />
    </div>

      <h1>Gestionnaire de Tâches</h1>
      <TaskForm onTaskAdded={loadTasks} />
      <TaskList tasks={tasks} onRefresh={loadTasks} />
    </div>
  );
}
