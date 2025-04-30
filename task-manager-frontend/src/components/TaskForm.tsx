import React, { useState } from 'react';
import { addTask } from '../services/taskService';

interface Props {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<Props> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addTask({ title, description, status: 'pending' });
      console.log('Réponse du serveur:', response);  // Log pour voir la réponse
      setTitle('');
      setDescription('');
      onTaskAdded();  // Refresh des tâches
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Échec de l'ajout de la tâche !");
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une Tâche</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default TaskForm;
