import { Request, Response } from "express";
import Task, { ITask } from "../models/tasks.js";

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find();
    if(tasks.length === 0) return res.status(200).json({ message: "No tasks available" });
    return res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if(!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
};

export const addTask = async (req: Request, res: Response) => {
    const { title } = req.body;
    if(!title) return res.status(400).json({ message: "Title is required" });

    const newTask = new Task({ title });
    await newTask.save();
    return res.status(201).json(newTask);
};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = await Task.findById(id);
    if(!task) return res.status(404).json({ message: "Task not found" });

    if(title !== undefined) task.title = title;
    if(completed !== undefined) task.completed = completed;

    await task.save();
    return res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if(!task) return res.status(404).json({ message: "Task not found" });
    return res.json({ message: "Task deleted" });
};

export const deleteAllTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find();
    if(tasks.length === 0) return res.status(200).json({ message: "No tasks to delete" });

    await Task.deleteMany({});
    return res.json({ message: "All tasks deleted" });
};
