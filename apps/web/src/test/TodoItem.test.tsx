import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../components/TodoItem';
import { vi } from 'vitest';
import { TodoTask } from '../types/todo';

const mockTask: TodoTask = {
  id: '1',
  title: 'Test task',
  completed: false,
  createdAt: new Date().toISOString(),
  hasReminderActive: false,
};

describe('TodoItem Component', () => {
  it('should render task title', () => {
    render(<TodoItem task={mockTask} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  it('should apply line-through style if completed', () => {
    render(<TodoItem task={{ ...mockTask, completed: true }} onToggle={vi.fn()} onDelete={vi.fn()} />);
    const titleElement = screen.getByText('Test task');
    expect(titleElement).toHaveClass('line-through');
  });

  it('should call onToggle when checkbox is clicked', () => {
    const mockOnToggle = vi.fn();
    render(<TodoItem task={mockTask} onToggle={mockOnToggle} onDelete={vi.fn()} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('should call onDelete when delete button is clicked', () => {
    const mockOnDelete = vi.fn();
    render(<TodoItem task={mockTask} onToggle={vi.fn()} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /Deletar tarefa/i });
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('should show reminder text if task has reminder', () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    
    render(<TodoItem 
      task={{ ...mockTask, reminderAt: date.toISOString() }} 
      onToggle={vi.fn()} 
      onDelete={vi.fn()} 
    />);
    
    expect(screen.getByText(/Lembrete:/i)).toBeInTheDocument();
  });
});
