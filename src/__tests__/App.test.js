import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import App from '../App';
import React from 'react';

describe('App Component', () => {
  test('renders the App component correctly', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve([
          { userId: 1, id: 1, title: 'Todo 1', completed: false },
          { userId: 1, id: 2, title: 'Todo 2', completed: true },
        ]),
    });

    render(<App />);

    // Wrap the state update inside act
    await screen.findByText('Todo 1'); // Wait for the Todo 1 text to appear
  });
});
