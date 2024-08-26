import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { TaskRepository } from '../repositories/taskRepository';
import { ProjectRepository } from '../repositories/projectRepository';

export const addTask = async (req: Request, res: Response) => {
  const projectRepository = getCustomRepository(ProjectRepository);
  const taskRepository = getCustomRepository(TaskRepository);

  const project = await projectRepository.findOne(req.params.projectId);

  if (!project || project.user.id !== req.user.id) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const task = taskRepository.create({ ...req.body, project });
  await taskRepository.save(task);

  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const taskRepository = getCustomRepository(TaskRepository);
  const task = await taskRepository.findOne(req.params.id, { relations: ['project'] });

  if (!task || task.project.user.id !== req.user.id) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  await taskRepository.save(task);

  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskRepository = getCustomRepository(TaskRepository);
  const task = await taskRepository.findOne(req.params.id, { relations: ['project'] });

  if (!task || task.project.user.id !== req.user.id) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await taskRepository.remove(task);
  res.status(204).json({ message: 'Task deleted' });
};
