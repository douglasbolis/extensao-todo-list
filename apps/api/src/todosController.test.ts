import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import todosController from './controllers/todosController'
import todoStore, { TodoTask } from './models/TodoStore'

// Setup do app Express apenas para os testes
const app = express()
app.use(express.json())
app.use('/api/todos', todosController)

// Mock the todoStore and its methods
vi.mock('./models/TodoStore')
const mockedTodoStore = todoStore as unknown as {
  getAllTasks: () => TodoTask[];
  addTask: (title: string, reminderAt?: Date) => TodoTask;
  deleteTask: (id: string) => boolean;
  toggleTaskCompletion: (id: string) => TodoTask | undefined;
};

describe('Todos Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/todos', () => {
    it('should return all tasks', async () => {
      const mockTasks: TodoTask[] = [
        { id: '1', title: 'Task 1', completed: false, createdAt: new Date(), hasReminderActive: false },
        { id: '2', title: 'Task 2', completed: true, createdAt: new Date(), hasReminderActive: false, reminderAt: new Date(Date.now() - 10000) },
      ]
      vi.spyOn(mockedTodoStore, 'getAllTasks').mockReturnValue(mockTasks);

      const response = await request(app).get('/api/todos')

      expect(mockedTodoStore.getAllTasks).toHaveBeenCalledTimes(1);
      expect(response.status).toBe(200);
      
      // Datas podem vir como string no JSON
      const expectedTasks = mockTasks.map(t => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
        reminderAt: t.reminderAt ? t.reminderAt.toISOString() : undefined
      }));
      expect(response.body).toEqual(expectedTasks);
    })
  })

  describe('POST /api/todos', () => {
    it('should create a new task successfully', async () => {
      const newTask: TodoTask = { id: 'mock-uuid-123', title: 'New Task', completed: false, createdAt: new Date(), hasReminderActive: false };
      vi.spyOn(mockedTodoStore, 'addTask').mockReturnValue(newTask);

      const response = await request(app)
        .post('/api/todos')
        .send({ title: 'New Task' })

      expect(mockedTodoStore.addTask).toHaveBeenCalledWith('New Task', undefined);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        ...newTask,
        createdAt: newTask.createdAt.toISOString()
      });
    })

    it('should create a task with a reminder', async () => {
      const reminderDate = new Date(Date.now() + 86400000); // Tomorrow
      const newTask: TodoTask = { id: 'mock-uuid-123', title: 'Task with Reminder', completed: false, createdAt: new Date(), reminderAt: reminderDate, hasReminderActive: false };
      vi.spyOn(mockedTodoStore, 'addTask').mockReturnValue(newTask);

      const response = await request(app)
        .post('/api/todos')
        .send({ title: 'Task with Reminder', reminderAt: reminderDate.toISOString() })

      expect(mockedTodoStore.addTask).toHaveBeenCalledWith('Task with Reminder', expect.any(Date));
      expect(response.status).toBe(201);
    })

    it('should return 400 if title is missing or empty', async () => {
      const response1 = await request(app).post('/api/todos').send({ reminderAt: new Date().toISOString() })
      expect(response1.status).toBe(400);
      expect(response1.body).toEqual({ message: 'Task title is required.' });

      const response2 = await request(app).post('/api/todos').send({ title: '   ', reminderAt: new Date().toISOString() })
      expect(response2.status).toBe(400);
      expect(response2.body).toEqual({ message: 'Task title is required.' });
    })
    
    it('should return 400 for invalid reminder date format', async () => {
      const response = await request(app).post('/api/todos').send({ title: 'Invalid Date Task', reminderAt: 'not-a-date' })
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Invalid reminder date format. Use ISO string.' });
    })
    
    it('should return 400 if addTask throws an error', async () => {
      vi.spyOn(mockedTodoStore, 'addTask').mockImplementation(() => {
        throw new Error('Failed to add task');
      });
      const response = await request(app).post('/api/todos').send({ title: 'Task that fails adding' })
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Failed to add task' });
    });
  })

  describe('DELETE /api/todos/:id', () => {
    it('should delete a task successfully', async () => {
      vi.spyOn(mockedTodoStore, 'deleteTask').mockReturnValue(true);
      const response = await request(app).delete('/api/todos/task-id-to-delete')
      expect(mockedTodoStore.deleteTask).toHaveBeenCalledWith('task-id-to-delete');
      expect(response.status).toBe(204);
    })

    it('should return 404 if task is not found', async () => {
      vi.spyOn(mockedTodoStore, 'deleteTask').mockReturnValue(false);
      const response = await request(app).delete('/api/todos/non-existent-id')
      expect(mockedTodoStore.deleteTask).toHaveBeenCalledWith('non-existent-id');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Task not found.' });
    })
  })

  describe('PATCH /api/todos/:id/toggle', () => {
    it('should toggle task completion successfully', async () => {
      const updatedTask: TodoTask = { id: 'task-id-to-toggle', title: 'Task to toggle', completed: true, createdAt: new Date(), hasReminderActive: false };
      vi.spyOn(mockedTodoStore, 'toggleTaskCompletion').mockReturnValue(updatedTask);
      
      const response = await request(app).patch('/api/todos/task-id-to-toggle/toggle')
      
      expect(mockedTodoStore.toggleTaskCompletion).toHaveBeenCalledWith('task-id-to-toggle');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...updatedTask,
        createdAt: updatedTask.createdAt.toISOString()
      });
    })

    it('should return 404 if task is not found for toggling', async () => {
      vi.spyOn(mockedTodoStore, 'toggleTaskCompletion').mockReturnValue(undefined);
      
      const response = await request(app).patch('/api/todos/non-existent-id/toggle')
      
      expect(mockedTodoStore.toggleTaskCompletion).toHaveBeenCalledWith('non-existent-id');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Task not found.' });
    })
  })
})
