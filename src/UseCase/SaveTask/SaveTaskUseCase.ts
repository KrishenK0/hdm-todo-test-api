import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from 'src/Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRep: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    if (!dto.name || typeof dto.name !== 'string' || dto.name.trim().length === 0) {
      throw new BadRequestException('Task name must be a non-empty string');
    }

    if (dto.name.length > 255) {
      throw new BadRequestException('Task name must not exceed 255 characters');
    }

    try {
      const task = await this.taskRep.save(dto);

      return task;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
