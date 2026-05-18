import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Request, Response } from 'express'
import todosController from './controllers/todosController'
import todoStore, { TodoTask } from './models/TodoStore'

// Mock the todoStore and its methods
vi.mock('./models/TodoStore')
const mockedTodoStore = todoStore as unknown as {
  getAllTasks: () => TodoTask[];
  addTask: (title: string, reminderAt?: Date) => TodoTask;
  deleteTask: (id: string) => boolean;
  toggleTaskCompletion: (id: string) => TodoTask | undefined;
};

// Mock Request and Response objects
const mockRequest = (body: any = {}, params: any = {}, query: any = {}) => ({
  body,
  params,
  query
}) as Request;

const mockResponse = () => {
  const res = {} as Response;
  res.json = vi.fn().mockReturnValue(res);
  res.status = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  res.sendStatus = vi.fn().mockReturnValue(res);
  return res;
};

describe('Todos Controller', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
  })

  // --- GET /api/todos ---
  describe('GET /api/todos', () => {
    it('should return all tasks', async () => {
      const mockTasks: TodoTask[] = [
        { id: '1', title: 'Task 1', completed: false, createdAt: new Date(), hasReminderActive: false },
        { id: '2', title: 'Task 2', completed: true, createdAt: new Date(), hasReminderActive: false, reminderAt: new Date(Date.now() - 10000) },
      ]
      vi.spyOn(mockedTodoStore, 'getAllTasks').mockReturnValue(mockTasks);

      const req = mockRequest()
      const res = mockResponse()

      // Força o TypeScript a ignorar a assinatura estrita do Router do Express
      await (todosController as any).get(req, res);

      expect(mockedTodoStore.getAllTasks).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockTasks);
      expect(res.status).not.toHaveBeenCalled(); // Default status is 200
    })
  })

  // --- POST /api/todos ---
  describe('POST /api/todos', () => {
    it('should create a new task successfully', async () => {
      const newTask: TodoTask = { id: 'mock-uuid-123', title: 'New Task', completed: false, createdAt: new Date(), hasReminderActive: false };
      vi.spyOn(mockedTodoStore, 'addTask').mockReturnValue(newTask);

      const req = mockRequest({ title: 'New Task' })
      const res = mockResponse()

      // Força o TypeScript a ignorar a assinatura estrita do Router do Express
      await (todosController as any).post(req, res);

      expect(mockedTodoStore.addTask).toHaveBeenCalledWith('New Task', undefined);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newTask);
    })

    it('should create a task with a reminder', async () => {
      const reminderDate = new Date(Date.now() + 86400000); // Tomorrow
      const newTask: TodoTask = { id: 'mock-uuid-123', title: 'Task with Reminder', completed: false, createdAt: new Date(), reminderAt: reminderDate, hasReminderActive: false };
      vi.spyOn(mockedTodoStore, 'addTask').mockReturnValue(newTask);

      const req = mockRequest({ title: 'Task with Reminder', reminderAt: reminderDate.toISOString() })
      const res = mockResponse()

      // Força o TypeScript a ignorar a assinatura estrita do Router do Express
      await (todosController as any).post(req, res);

      expect(mockedTodoStore.addTask).toHaveBeenCalledWith('Task with Reminder', expect.any(Date));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newTask);
    })

    it('should return 400 if title is missing or empty', async () => {
      const req1 = mockRequest({ reminderAt: new Date().toISOString() });
      const res1 = mockResponse();
      // Força o TypeScript a ignorar a assinatura estrita do Router do Express
      await (todosController as any).post(req1, res1);
      expect(res1.status).toHaveBeenCalledWith(400);
      expect(res1.json).toHaveBeenCalledWith({ message: 'Task title is required.' });

      const req2 = mockRequest({ title: '   ', reminderAt: new Date().toISOString() });
      const res2 = mockResponse();
      // Força o TypeScript a ignorar a assinatura estrita do Router do Express
      await (todosController as any).post(req2, res2);
      expect(res2.status).toHaveBeenCalledWith(400);
      expect(res2.json).toHaveBeenCalledWith({ message: 'Task title is required.' });
    })
    
    it('should return 400 for invalid reminder date format', async () => {
      const req = mockRequest({ title: 'Invalid Date Task', reminderAt: 'not-a-date' });
      const res = mockResponse();
      // Força o TypeScript a ignorar a assinatura estrita do Router do Express
      await (todosController as any).post(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid reminder date format. Use ISO string.' });
    })
    
    it('should return 400 if addTask throws an error', async () => {
      vi.spyOn(mockedTodoStore, 'addTask').mockImplementation(() => {
        throw new Error('Failed to add task');
      });
      const req = mockRequest({ title: 'Task that fails adding' });
      const res = mockResponse();
      // Força o TypeScript a ignorar a assinatura estrita do Router do Express
      await (todosController as any).post(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Failed to add task' });
    });
  })

  // --- DELETE /api/todos/:id ---
  describe('DELETE /api/todos/:id', () => {
    it('should delete a task successfully', async () => {
      vi.spyOn(mockedTodoStore, 'deleteTask').mockReturnValue(true);
      const req = mockRequest({}, { id: 'task-id-to-delete' });
      const res = mockResponse();
      // Força o TypeScript a ignorar a assinatura estrita do Router do Express
      await (todosController as any).delete(req, res);
      expect(mockedTodoStore.deleteTask).toHaveBeenCalledWith('task-id-to-delete');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    })

    it('should return 404 if task is not found', async () => {
      vi.spyOn(mockedTodoStore, 'deleteTask').mockReturnValue(false);
      const req = mockRequest({}, { id: 'non-existent-id' });
      const res = mockResponse();
      // Força o TypeScript a ignorar a assinatura estrita do Router do Express
      await (todosController as any).delete(req, res);
      expect(mockedTodoStore.deleteTask).toHaveBeenCalledWith('non-existent-id');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task not found.' });
    })
  })

  // --- PATCH /api/todos/:id/toggle ---
  describe('PATCH /api/todos/:id/toggle', () => {
    it('should toggle task completion successfully', async () => {
      const updatedTask: TodoTask = { id: 'task-id-to-toggle', title: 'Task to toggle', completed: true, createdAt: new Date(), hasReminderActive: false };
      vi.spyOn(mockedTodoStore, 'toggleTaskCompletion').mockReturnValue(updatedTask);
      const req = mockRequest({}, { id: 'task-id-to-toggle' });
      const res = mockResponse();
      // Força o TypeScript a ignorar a assinatura estrita do Router do Express
      await (todosController as any).patch(req, res);
      expect(mockedTodoStore.toggleTaskCompletion).toHaveBeenCalledWith('task-id-to-toggle');
      expect(res.json).toHaveBeenCalledWith(updatedTask);
    })

    it('should return 404 if task is not found for toggling', async () => {
      vi.spyOn(mockedTodoStore, 'toggleTaskCompletion').mockReturnValue(undefined);
      const req = mockRequest({}, { id: 'non-existent-id' });
      const res = mockResponse();
      // Força o TypeScript a ignorar a assinatura estrita do Router do Express
      await (todosController as any).patch(req, res);
      expect(mockedTodoStore.toggleTaskCompletion).toHaveBeenCalledWith('non-existent-id');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task not found.' });
    })
  })

})