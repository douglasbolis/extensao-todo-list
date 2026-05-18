import { TodoTask } from '../types/todo';

interface TodoItemProps {
  task: TodoTask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ task, onToggle, onDelete }: TodoItemProps) {
  const isReminderActive = task.reminderAt && new Date(task.reminderAt) <= new Date() && !task.completed;

  return (
    <div className={`flex items-center justify-between p-4 mb-2 rounded-lg border ${isReminderActive ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'} shadow-sm transition-colors`}>
      <div className="flex items-center gap-3 overflow-hidden">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
        />
        <div className="flex flex-col overflow-hidden">
          <span className={`text-gray-800 truncate ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </span>
          {task.reminderAt && (
            <span className={`text-xs ${isReminderActive ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
              ⏰ Lembrete: {new Date(task.reminderAt).toLocaleString()}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="ml-4 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors flex-shrink-0"
        aria-label="Deletar tarefa"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
