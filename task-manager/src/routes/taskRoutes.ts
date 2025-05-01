import { Router } from "express";
import { createNewTask, deleteTaskById, getAllTasks, updateTaskStatusById } from "../controllers/taskController";

const router = Router();

router.get("/tasks", getAllTasks);
router.post("/tasks", createNewTask);
router.delete("/tasks/:id", deleteTaskById);
router.patch("/tasks/:id", updateTaskStatusById);

export default router;