import { Request, Response, Router } from 'express';
import todoStore, { TodoTask } from '../models/TodoStore';

const router = Router();

// GET /api/todos - List all tasks
router.get('/', async (req: Request, res: Response) => {
  const tasks = todoStore.getAllTasks();
  res.json(tasks);
});

// POST /api/todos - Create a new task
router.post('/', async (req: Request, res: Response) => {
  const { title, reminderAt } = req.body;
  try {
    // Basic validation for title is handled in TodoStore, but we can add a check here too
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Task title is required.' });
    }

    // Optionally parse reminderAt if provided
    let reminderDate: Date | undefined;
    if (reminderAt) {
      const parsedDate = new Date(reminderAt);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid reminder date format. Use ISO string.' });
      }
      reminderDate = parsedDate;
    }

    const newTask = todoStore.addTask(title, reminderDate);
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/todos/:id - Delete a task by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = todoStore.deleteTask(id);

  if (deleted) {
    res.status(204).send(); // No Content
  } else {
    res.status(404).json({ message: 'Task not found.' });
  }
});

// PATCH /api/todos/:id/toggle - Toggle task completion status
router.patch('/:id/toggle', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTask = todoStore.toggleTaskCompletion(id);

  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found.' });
  }
});

export default router;
