import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import TodoList from '../TodoList';

describe('TodoList Component', () => {
    test('adds and displays new todos', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        json: () =>
          Promise.resolve([
            { userId: 1, id: 1, title: 'Todo 1', completed: false },
            { userId: 1, id: 2, title: 'Todo 2', completed: true },
          ]),
      });
  
      render(<TodoList />);

        // Ensure the input and button are in the document
        const inputElement = screen.getByPlaceholderText(/add new todo/i);
        const addButton = screen.getByText(/add todo/i);

        // Simulate user input
        fireEvent.change(inputElement, { target: { value: 'Learn React Testing' } });
        fireEvent.click(addButton);

        // Check if the new todo is added to the list
        const newTodo = await screen.findByText('Learn React Testing');
        expect(newTodo).toBeInTheDocument();

        // Clear input field after adding
        expect(inputElement.value).toBe('');
    });
});
