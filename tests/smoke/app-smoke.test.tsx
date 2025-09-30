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
  it('renders navigation tabs', () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}> 
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    
    const tabs = screen.getAllByText(/Core Concepts/i);
    expect(tabs.length).toBeGreaterThan(0);
  });
});
