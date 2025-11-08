import React from 'react';
import { Activity } from 'lucide-react';
import { LoanMetricsCards } from './loan-metrics-cards';
import { LoanInstancesTable } from './loan-instances-table';
import { ProcessControlButtons } from './process-control-buttons';
export function LoanDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8">
        {/* Header Section */}
        <header className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                UiPath Loan Operations Hub
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg">
                Monitor and manage loan processing workflows in real-time
              </p>
            </div>
          </div>
        </header>
        {/* Quick Actions Bar */}
        <div className="bg-muted/50 p-4 rounded-lg border border-border">
          <ProcessControlButtons />
        </div>
        {/* Metrics Cards */}
        <LoanMetricsCards />
        {/* Main Process Instances Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Loan Process Instances
          </h2>
          <LoanInstancesTable />
        </div>
        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm py-8 border-t border-border">
          <p>Built with ❤️ at UiPath</p>
        </footer>
      </div>
    </div>
  );
}