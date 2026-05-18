import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { vi, type Mocked } from 'vitest';
import { api } from '../services/api';

// Mock do axios (services/api)
vi.mock('../services/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  }
}));

const mockApi = api as Mocked<typeof api>;

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading state initially', () => {
    mockApi.get.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<App />);
    expect(screen.getByText('Carregando tarefas...')).toBeInTheDocument();
  });

  it('should render empty state when no tasks are returned', async () => {
    mockApi.get.mockResolvedValueOnce({ data: [] });
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Nenhuma tarefa encontrada/i)).toBeInTheDocument();
    });
  });

  it('should render tasks when API returns data', async () => {
    const mockTasks = [
      { id: '1', title: 'Task from API', completed: false, createdAt: new Date().toISOString(), hasReminderActive: false }
    ];
    mockApi.get.mockResolvedValueOnce({ data: mockTasks });
    
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Task from API')).toBeInTheDocument();
    });
  });

  it('should display error message on API failure', async () => {
    mockApi.get.mockRejectedValueOnce(new Error('Network Error'));
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar tarefas.')).toBeInTheDocument();
    });
  });
});
