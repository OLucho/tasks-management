import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/filtered-tasks.dto';
import { TaskStatus } from './task.model';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
});

const mockUser = { username: 'MockUser', id: 1 };

describe('TaskService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();
    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('GetAllTasks', () => {
    it('Get all tasks from repository', () => {
      taskRepository.getTasks.mockResolvedValue([]);
      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Fake_search',
      };
      tasksService.getTasks(filters, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe('GetTaskById', () => {
    it('Calls Repository method findOne and returns a task succefully ', async () => {
      const MOCK_TASK = {
        title: 'title',
        description: 'description',
      };
      taskRepository.findOne.mockResolvedValue(MOCK_TASK);

      const task = await tasksService.getTaskById(1, mockUser);

      expect(task).toEqual(MOCK_TASK);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockUser.id },
      });
    });

    it('Repository throws error if task is not found', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('CreateTask', () => {
    it('Create task method calls TaskRepository', async () => {
      taskRepository.createTask.mockResolvedValue('Task');
      const createTaskDto: CreateTaskDto = {
        title: 'title',
        description: 'description',
      };
      const result = await tasksService.createTask(createTaskDto, mockUser);

      expect(taskRepository.createTask).toHaveBeenCalledTimes(1);
      expect(taskRepository.createTask).toHaveBeenCalledWith(
        createTaskDto,
        mockUser,
      );
      expect(result).toEqual('Task');
    });

    describe('DeleteTask', () => {
      it('Delete Task calls Task Repository with no errors', async () => {
        taskRepository.delete.mockResolvedValue({ affected: 1 });

        const TASK_ID = 1;
        await tasksService.deleteTask(TASK_ID, mockUser);

        expect(taskRepository.delete).toHaveBeenCalledTimes(1);
        expect(taskRepository.delete).toHaveBeenCalledWith({
          id: TASK_ID,
          userId: mockUser.id,
        });
      });
      it('Delete Task throws error if task was not found', async () => {
        taskRepository.delete.mockResolvedValue({ affected: 0 });

        expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
    describe('UpdateTaskStatus', () => {
      it('Update task status correctly', async () => {
        const save = jest.fn().mockResolvedValue(true);
        tasksService.getTaskById = jest.fn().mockResolvedValue({
          status: TaskStatus.OPEN,
          save,
        });
        const result = await tasksService.updateTaskStatus(
          1,
          TaskStatus.DONE,
          mockUser,
        );

        expect(tasksService.getTaskById).toHaveBeenCalled();
        expect(save).toHaveBeenCalled();
        expect(result.status).toEqual(TaskStatus.DONE);
      });
    });
  });
});
