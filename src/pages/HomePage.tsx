import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoanDashboard } from '@/components/loan/loan-dashboard';
// Create a query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});
export function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <div className="min-h-screen bg-background relative">
          <ThemeToggle />
          <LoanDashboard />
          <Toaster richColors closeButton />
        </div>
      </AppLayout>
    </QueryClientProvider>
  );
}