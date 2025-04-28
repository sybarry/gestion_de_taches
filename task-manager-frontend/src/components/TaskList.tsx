import { Task } from '../types/Task';
import { deleteTask, updateTaskStatus } from '../services/taskService';

interface Props {
  tasks: Task[];
  onRefresh: () => void;
}

export default function TaskList({ tasks, onRefresh }: Props) {
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    onRefresh();
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus = task.status === 'pending' ? 'done' : 'pending';
    await updateTaskStatus(task.id, newStatus);
    onRefresh();
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <strong>{task.title}</strong> - {task.description} ({task.status})
          <button onClick={() => handleToggleStatus(task)}>Toggle Statut</button>
          <button onClick={() => handleDelete(task.id)}>Supprimer</button>
        </li>
      ))}
    </ul>
  );
}
