import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '@/lib/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';


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
        <AuthProvider>
          <Router>
            { children }
          </Router>
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.Suspense>
  );
};