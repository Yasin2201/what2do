import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '@/lib/react-query';


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
        { children }
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.Suspense>
  );
};