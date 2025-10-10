import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../../src/App';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a test QueryClient
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries in tests
      gcTime: Infinity, // Prevent garbage collection during tests
    },
  },
});

describe('App Smoke Test', () => {
  it('renders navigation menu categories', () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}> 
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    
    // Check for the header with the logo
    expect(screen.getByRole('banner')).toBeDefined();
    
    // Check for the main navigation categories - use getAllByText since some text appears multiple times
    const learnElements = screen.getAllByText(/Learn/i);
    expect(learnElements.length).toBeGreaterThan(0);
    
    // Check for unique navigation elements
    expect(screen.getByText(/Journey Map/i)).toBeDefined();
    expect(screen.getByText(/Get Started/i)).toBeDefined();
  });
});
