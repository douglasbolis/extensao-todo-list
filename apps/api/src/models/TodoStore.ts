import { v4 as uuidv4 } from 'uuid';

export interface TodoTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  reminderAt?: Date;
  hasReminderActive: boolean;
}

class TodoStore {
  private tasks: Map<string, TodoTask> = new Map();

  constructor() {
    // Optional: Seed with some initial data if needed
  }

  getAllTasks(): TodoTask[] {
    return Array.from(this.tasks.values());
  }

  addTask(title: string, reminderAt?: Date): TodoTask {
    // Basic validation for creation
    if (!title || title.trim() === '') {
      throw new Error('Task title cannot be empty.');
    }

    const newTask: TodoTask = {
      id: uuidv4(),
      title: title.trim(), // Trim whitespace from title
      completed: false,
      createdAt: new Date(),
      reminderAt: reminderAt,
      hasReminderActive: reminderAt ? new Date() >= reminderAt : false,
    };
    this.tasks.set(newTask.id, newTask);
    return newTask;
  }

  toggleTaskCompletion(id: string): TodoTask | undefined {
    const task = this.tasks.get(id);
    if (task) {
      task.completed = !task.completed;
      this.tasks.set(id, task); // Update in map
      return task;
    }
    return undefined;
  }

  deleteTask(id: string): boolean {
    // Basic validation for removal: check if task exists before deleting
    if (!this.tasks.has(id)) {
      // Or throw an error depending on desired behavior for non-existent ID
      // For now, returning false is consistent with Map.delete behavior for non-existent keys
      return false;
    }
    return this.tasks.delete(id);
  }

  updateTaskReminderActiveStatus(id: string, isActive: boolean): TodoTask | undefined {
    const task = this.tasks.get(id);
    if (task) {
      task.hasReminderActive = isActive;
      this.tasks.set(id, task);
      return task;
    }
    return undefined;
  }
}

export default new TodoStore();
