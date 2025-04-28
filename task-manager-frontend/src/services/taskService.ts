import axios from 'axios';
import { Task } from '../types/Task';

const API_URL = "http://localhost:3000/tasks";

export const getTasks = () => axios.get<Task[]>(API_URL);
export const addTask = (task: Omit<Task, 'id'>) => axios.post<Task>(API_URL, task);
export const deleteTask = (id: string) => axios.delete(`${API_URL}/${id}`);
export const updateTaskStatus = (id: string, status: 'pending' | 'done') =>
  axios.patch(`${API_URL}/${id}`, { status });
