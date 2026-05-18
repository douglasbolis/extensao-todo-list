import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from '../components/TodoForm';
import { vi } from 'vitest';

describe('TodoForm Component', () => {
  it('should render input fields and submit button', () => {
    render(<TodoForm onAdd={vi.fn()} />);
    
    expect(screen.getByLabelText(/Nova Tarefa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Lembrete/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Adicionar Tarefa/i })).toBeInTheDocument();
  });

  it('should call onAdd when form is submitted with valid title', async () => {
    const mockOnAdd = vi.fn().mockResolvedValue(undefined);
    render(<TodoForm onAdd={mockOnAdd} />);
    
    const titleInput = screen.getByLabelText(/Nova Tarefa/i);
    const submitButton = screen.getByRole('button', { name: /Adicionar Tarefa/i });

    fireEvent.change(titleInput, { target: { value: 'Buy milk' } });
    fireEvent.click(submitButton);

    expect(mockOnAdd).toHaveBeenCalledWith('Buy milk', undefined);
  });

  it('should not call onAdd if title is empty', async () => {
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);
    
    const submitButton = screen.getByRole('button', { name: /Adicionar Tarefa/i });

    // Clicando com o input vazio
    fireEvent.click(submitButton);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});
