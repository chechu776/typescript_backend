import express from "express";
import { getTasks, addTask, updateTask, deleteTask, deleteAllTasks, getTaskById } from "../controllers/controllers.js";

const router = express.Router();

router.get("/gettask/:id", getTaskById);
router.get("/getalltasks", getTasks);
router.post("/addtask", addTask);
router.put("/updatetask/:id", updateTask);
router.delete("/deletetask/:id", deleteTask);
router.delete("/deletealltasks", deleteAllTasks);

export default router;
