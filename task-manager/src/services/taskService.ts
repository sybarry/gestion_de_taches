import { Task } from "../models/task";

let tasks: Task[] = [];

export const getTasks = (): Task[] => tasks;

export const createTask = (task: Task): Task => {
  tasks.push(task);
  return task;
};
const API_URL = 'http://localhost:3000/tasks';


export const deleteTask = (id: string): boolean => {
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  return tasks.length < initialLength;
};

export const updateTaskStatus = (id: string, status: "pending" | "done"): Task | null => {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.status = status;
    return task;
  }
  return null;
};
