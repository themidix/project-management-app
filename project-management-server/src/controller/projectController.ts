import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ProjectRepository } from '../repository/projectRepository';
import { User } from '../entity/User';

interface AuthRequest extends Request {
  user?: User;
}

export const createProject = async (req: AuthRequest, res: Response) => {
  const projectRepository = getCustomRepository(ProjectRepository);
  const { name } = req.body;
  const project = projectRepository.create({ name, user: req.user });
  await projectRepository.save(project);

  res.status(201).json(project);
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  const projectRepository = getCustomRepository(ProjectRepository);
  const projects = await projectRepository.find({ where: { user: req.user }, relations: ['tasks'] });

  res.json(projects);
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  const projectRepository = getCustomRepository(ProjectRepository);
  const project = await projectRepository.findOne({ where: { id: Number(req.params.id) } });

  if (!project || project.user.id !== req.user?.id) {
    return res.status(404).json({ message: 'Project not found or unauthorized' });
  }

  project.name = req.body.name || project.name;
  await projectRepository.save(project);

  return res.json(project);
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  const projectRepository = getCustomRepository(ProjectRepository);
  const project = await projectRepository.findOne({ where: { id: Number(req.params.id) } });

  if (!project || project.user.id !== req.user?.id) {
    return res.status(404).json({ message: 'Project not found or unauthorized' });
  }

  await projectRepository.remove(project);
  return res.status(204).json({ message: 'Project deleted' });
};
