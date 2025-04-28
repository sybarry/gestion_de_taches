import { useEffect, useState } from 'react';
import { getTasks } from './services/taskService';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h1>Gestionnaire de Tâches</h1>
      <TaskForm onTaskAdded={loadTasks} />
      <TaskList tasks={tasks} onRefresh={loadTasks} />
    </div>
  );
}
