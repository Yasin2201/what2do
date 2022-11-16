import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '@/lib/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from '@/context/AuthContext';

export const AppProvider = ({ children }) => {
  return (
    <React.Suspense
      fallback={
        <div>
          loading...
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Router>
            { children }
          </Router>
        </AuthContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.Suspense>
  );
};