import { Test } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/filtered-tasks.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const mockTask = {
  id: 1,
  title: 'title',
  description: 'description',
  status: TaskStatus.DONE,
};

const mockCreateTaskDto: CreateTaskDto = {
  title: 'title',
  description: 'description',
};
const mockGetTasksDto: GetTasksFilterDto = {
  status: TaskStatus.DONE,
  search: 'search',
};
const mockUser = { username: 'username', password: 'password' };

const mockTaskService = () => ({
  getTasks: jest.fn(),
  createTask: jest.fn(),
  getTaskById: jest.fn(),
  updateTaskStatus: jest.fn(),
  deleteTask: jest.fn(),
});

describe('TaskService', () => {
  let tasksService;
  let tasksController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useFactory: mockTaskService }],
    }).compile();
    tasksService = await module.get<TasksService>(TasksService);
    tasksController = await module.get<TasksController>(TasksController);
  });

  describe('GetTasks', () => {
    it('GetTasks calls Service and returns an array of Tasks', async () => {
      tasksService.getTasks.mockResolvedValue([]);

      const result = await tasksController.getTasks(mockGetTasksDto, mockUser);

      expect(tasksService.getTasks).toHaveBeenCalled();
      expect(tasksService.getTasks).toHaveBeenCalledWith(
        mockGetTasksDto,
        mockUser,
      );
      expect(result).toEqual([]);
    });
  });

  describe('CreateTask', () => {
    it('Create tasks calls Service and returns a Task', async () => {
      tasksService.createTask.mockResolvedValue(mockTask);

      const result = await tasksController.createTask(
        mockCreateTaskDto,
        mockUser,
      );

      expect(tasksService.createTask).toHaveBeenCalled();
      expect(tasksService.createTask).toHaveBeenCalledWith(
        mockCreateTaskDto,
        mockUser,
      );
      expect(result).toEqual(mockTask);
    });
  });

  describe('GetTaskById', () => {
    it('getTaskById calls Service and returns a Task', async () => {
      tasksService.getTaskById.mockResolvedValue(mockTask);

      const result = await tasksController.getTaskById(1, mockUser);

      expect(tasksService.getTaskById).toHaveBeenCalled();
      expect(tasksService.getTaskById).toHaveBeenCalledWith(1, mockUser);
      expect(result).toEqual(mockTask);
    });
  });

  describe('updateTaskStatus', () => {
    it('updateTaskStatus calls Service and returns a Task', async () => {
      tasksService.updateTaskStatus.mockResolvedValue(mockTask);

      const result = await tasksController.updateTaskStatus(
        1,
        TaskStatus.DONE,
        mockUser,
      );

      expect(tasksService.updateTaskStatus).toHaveBeenCalled();
      expect(tasksService.updateTaskStatus).toHaveBeenCalledWith(
        1,
        TaskStatus.DONE,
        mockUser,
      );
      expect(result).toEqual(mockTask);
    });
  });

  describe('DeleteTask', () => {
    it('DeleteTask calls Service', async () => {
      await tasksController.deleteTask(1, mockUser);

      expect(tasksService.deleteTask).toHaveBeenCalled();
      expect(tasksService.deleteTask).toHaveBeenCalledWith(1, mockUser);
    });
  });
});
