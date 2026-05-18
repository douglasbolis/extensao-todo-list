import { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string, reminderAt?: string) => Promise<void>;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [reminderAt, setReminderAt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onAdd(title, reminderAt ? new Date(reminderAt).toISOString() : undefined);
      setTitle('');
      setReminderAt('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Nova Tarefa</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="O que precisa ser feito?"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="reminder" className="block text-sm font-medium text-gray-700 mb-1">Lembrete (Opcional)</label>
          <input
            id="reminder"
            type="datetime-local"
            value={reminderAt}
            onChange={(e) => setReminderAt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={!title.trim() || loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Adicionando...' : 'Adicionar Tarefa'}
        </button>
      </div>
    </form>
  );
}
