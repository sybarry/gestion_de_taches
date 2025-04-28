import { Request, Response } from "express";
import { Task } from "../models/task";
import { createTask, deleteTask, getTasks, updateTaskStatus } from "../services/taskService";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["pending", "done"])
});

export const getAllTasks = (req: Request, res: Response) => {
  res.json(getTasks());
};

export const createNewTask = (req: Request, res: Response) => {
    try {
        const taskData = taskSchema.parse(req.body);
        const newTask: Task = { id: `${Date.now()}`, ...taskData };
        const createdTask = createTask(newTask);
        res.status(201).json(createdTask);
    } catch (error) {
        if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        } else {
        res.status(400).json({ error: "An unknown error occurred" });
        }
    }
      
};

export const deleteTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  const result = deleteTask(id);
  if (result) {
    res.status(204).json({ error: "Tache supprimée avec succes" });
  } else {
    res.status(404).json({ error: "Tache non supprimée" });
  }
};

export const updateTaskStatusById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedTask = updateTaskStatus(id, status);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).json({ error: "Erreur de mise a jour" });
  }
};
