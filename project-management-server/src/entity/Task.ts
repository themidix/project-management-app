import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './Project';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Project, project => project.tasks)
  project: Project;

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.project = new Project();
  }
}
