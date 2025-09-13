import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../../src/App';
import { MemoryRouter } from 'react-router-dom';

// Minimal ThemeProvider mock if needed (avoid pulling full context cost)

describe('App Smoke Test', () => {
  it('renders navigation tabs', () => {
    render(
      <MemoryRouter initialEntries={['/']}> 
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Core Concepts/i)).toBeInTheDocument();
  });
});
