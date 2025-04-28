import { useState } from 'react';
import { addTask } from '../services/taskService';

interface Props {
  onTaskAdded: () => void;
}

export default function TaskForm({ onTaskAdded }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTask({ title, description, status: 'pending' });
      setTitle('');
      setDescription('');
      onTaskAdded();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Échec de l'ajout de la tâche !");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <button type="submit">Ajouter</button>
    </form>
  );
}
