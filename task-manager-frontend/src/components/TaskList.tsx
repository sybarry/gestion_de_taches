import React from 'react';
import { Task } from '../types/Task';
import { deleteTask, updateTaskStatus } from '../services/taskService';

interface Props {
  tasks: Task[];
  onRefresh: () => void;
}

const TaskList: React.FC<Props> = ({ tasks, onRefresh }) => {
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    onRefresh();
  };

  const toggleStatus = async (task: Task) => {
    const newStatus = task.status === 'pending' ? 'done' : 'pending';
    await updateTaskStatus(task.id, newStatus);
    onRefresh();
  };

  return (
    <div>
      <h2>Liste des Tâches</h2>
      {tasks.map((task) => (
        <div key={task.id} style={{ border: '1px solid #ccc', margin: 5, padding: 5 }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Statut: {task.status}</p>
          <button onClick={() => toggleStatus(task)}>
            Marquer comme {task.status === 'pending' ? 'fait' : 'non fait'}
          </button>
          <button onClick={() => handleDelete(task.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
