import { UniqueIdentifier } from '@dnd-kit/core';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, Mock, describe, beforeEach, it, expect } from 'vitest';

import { Task } from '@/components/task/task';
import { useKanbanStore } from '@/store/kanban-store';

vi.mock('@/store/kanban-store', () => ({
  useKanbanStore: vi.fn(),
}));

describe('Task Component', () => {
  let mockUpdateTask: Mock;
  let mockRemoveTask: Mock;

  beforeEach(() => {
    // Reset mocks and initialize new ones
    vi.clearAllMocks();
    mockUpdateTask = vi.fn();
    mockRemoveTask = vi.fn();

    // Inject mocked actions into the store
    const mockSelector = vi.fn();
    (useKanbanStore as unknown as Mock).mockImplementation(
      (selector = mockSelector) => {
        return selector({
          updateTask: mockUpdateTask,
          removeTask: mockRemoveTask,
        });
      },
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders the task with given text', () => {
    const { getByText } = render(<Task id="1" text="Sample Task" />);
    expect(getByText('Sample Task')).toBeInTheDocument();
  });

  it('shows the input field on double-click', async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByText } = render(
      <Task id="1" text="Sample Task" />,
    );
    const taskCard = getByText('Sample Task');

    await user.dblClick(taskCard);

    expect(getByLabelText('Task text')).toBeInTheDocument();
  });

  it('hides the input field when clicking outside', async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByText } = render(
      <Task id="1" text="Sample Task" />,
    );
    await user.dblClick(getByText('Sample Task'));

    const input = getByLabelText('Task text');
    expect(input).toBeInTheDocument();

    await user.click(document.body);
    expect(input).not.toBeInTheDocument();
  });

  it('calls updateTask with the updated value on save', async () => {
    const user = userEvent.setup();

    const { getByLabelText, getByText } = render(
      <Task id="1" text="Sample Task" />,
    );

    await user.dblClick(getByText('Sample Task'));

    const input = getByLabelText('Task text');
    await user.clear(input);
    await user.type(input, 'Updated Task');
    await user.click(getByText('Save'));

    expect(mockUpdateTask).toHaveBeenCalledWith(
      '1' as UniqueIdentifier,
      'Updated Task',
    );
  });

  it('calls removeTask when the delete button is clicked', async () => {
    const { getByRole } = render(<Task id="1" text="Sample Task" />);
    const deleteButton = getByRole('button', { name: /delete task/i });
    await userEvent.click(deleteButton);

    expect(mockRemoveTask).toHaveBeenCalledWith('1');
  });

  it('saves the task when Enter key is pressed in the input field', async () => {
    const { getByText, getByLabelText } = render(
      <Task id="1" text="Sample Task" />,
    );
    await userEvent.dblClick(getByText('Sample Task'));

    const input = getByLabelText('Task text');
    await userEvent.clear(input);
    await userEvent.type(input, 'Updated Task');
    await userEvent.keyboard('{Enter}');

    expect(mockUpdateTask).toHaveBeenCalledWith('1', 'Updated Task');
  });
});
