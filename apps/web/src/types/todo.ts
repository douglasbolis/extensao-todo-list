export interface TodoTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  reminderAt?: string;
  hasReminderActive: boolean;
}
