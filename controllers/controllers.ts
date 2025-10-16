import { Request, Response } from "express";

let tasks: { id: number; title: string; completed: boolean }[] = [];
let idCounter = 1;

export const getTasks = (req: Request, res: Response) => {
    if(tasks.length === 0) {
        res.status(200).json({ message: "No tasks available" });
        return;
    }
    res.json(tasks);
};

export const getTaskById = (req: Request, res: Response) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === Number(id));
    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    res.json(task);
};

export const addTask = (req: Request, res: Response):void => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  const newTask = { id: idCounter++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response):void => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.find(t => t.id === Number(id));
  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  } 

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== Number(id));
  if(!tasks){
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.json({ message: "Task deleted" });
};

export const deleteAllTasks = (req: Request, res: Response) => {
    if(tasks.length === 0) {
        res.status(200).json({ message: "No tasks to delete" });
        return;
    }
    tasks = [];
    res.json({ message: "All tasks deleted" });
}