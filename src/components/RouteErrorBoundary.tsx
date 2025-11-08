import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
interface RouteErrorBoundaryProps {
  error?: Error;
  reset?: () => void;
}
export function RouteErrorBoundary({ error, reset }: RouteErrorBoundaryProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl">Something went wrong</CardTitle>
          <CardDescription>
            An error occurred while loading this page. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              <p className="font-medium">Error details:</p>
              <p className="mt-1">{error.message}</p>
            </div>
          )}
          {reset && (
            <Button onClick={reset} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}