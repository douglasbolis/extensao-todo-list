import { useEffect, useState } from 'react';
import { api } from './services/api';
import { TodoTask } from './types/todo';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';

function App() {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await api.get<TodoTask[]>('/todos');
      setTasks(res.data);
    } catch (err) {
      setError('Erro ao carregar tarefas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Timer to force re-render every minute so that active reminders trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(currentTasks => [...currentTasks]); 
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleAdd = async (title: string, reminderAt?: string) => {
    await api.post('/todos', { title, reminderAt });
    fetchTasks();
  };

  const handleToggle = async (id: string) => {
    try {
      // Optimistic update for better UX
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
      await api.patch(`/todos/${id}/toggle`);
    } catch (err) {
      // Rollback on error
      fetchTasks();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Optimistic update
      setTasks(tasks.filter(t => t.id !== id));
      await api.delete(`/todos/${id}`);
    } catch (err) {
      fetchTasks();
    }
  };

  const activeRemindersCount = tasks.filter(t => 
    t.reminderAt && new Date(t.reminderAt) <= new Date() && !t.completed
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4 sm:p-8">
      <div className="w-full max-w-lg">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Minhas Tarefas</h1>
          {activeRemindersCount > 0 && (
            <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm flex items-center justify-between" role="alert">
              <div>
                <p className="font-bold">Lembrete Ativo!</p>
                <p>Você tem {activeRemindersCount} tarefa(s) atrasada(s) ou no horário.</p>
              </div>
            </div>
          )}
        </header>

        <TodoForm onAdd={handleAdd} />

        <main>
          {loading ? (
            <p className="text-center text-gray-500">Carregando tarefas...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-500 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              Nenhuma tarefa encontrada. Que tal adicionar uma?
            </p>
          ) : (
            <div className="flex flex-col">
              {tasks
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(task => (
                <TodoItem 
                  key={task.id} 
                  task={task} 
                  onToggle={handleToggle} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
