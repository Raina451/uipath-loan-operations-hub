import React from 'react';
import { TrendingUp, Clock, CheckCircle, XCircle, DollarSign, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUiPathMaestroInstances } from '@/hooks/useUiPathMaestro';
interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
function MetricCard({ title, value, description, icon, trend }: MetricCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp
              className={`h-3 w-3 mr-1 ${
                trend.isPositive ? 'text-green-600' : 'text-red-600 rotate-180'
              }`}
            />
            <span
              className={`text-xs ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.value}% from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export function LoanMetricsCards() {
  const { data: instances, isLoading } = useUiPathMaestroInstances();
  // Process the instances data to calculate metrics
  const instancesArray = Array.isArray(instances) ? instances : instances?.value || [];
  const totalApplications = instancesArray.length;
  const inProgressCount = instancesArray.filter(
    (instance) => instance.status === 'Running' || instance.status === 'InProgress'
  ).length;
  const completedCount = instancesArray.filter(
    (instance) => instance.status === 'Completed' || instance.status === 'Successful'
  ).length;
  const failedCount = instancesArray.filter(
    (instance) => instance.status === 'Failed' || instance.status === 'Faulted'
  ).length;
  // Calculate approval rate
  const approvalRate = totalApplications > 0 
    ? Math.round((completedCount / totalApplications) * 100) 
    : 0;
  // Calculate average processing time (mock data for demo)
  const avgProcessingTime = '2.3 days';
  // Mock total loan value for demo
  const totalLoanValue = '$12.4M';
  const metrics = [
    {
      title: 'Total Applications',
      value: isLoading ? '...' : totalApplications,
      description: 'All loan applications submitted',
      icon: <Users className="h-4 w-4" />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'In Progress',
      value: isLoading ? '...' : inProgressCount,
      description: 'Currently being processed',
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: 'Approval Rate',
      value: isLoading ? '...' : `${approvalRate}%`,
      description: 'Successfully approved loans',
      icon: <CheckCircle className="h-4 w-4" />,
      trend: { value: 5, isPositive: true },
    },
    {
      title: 'Failed Processes',
      value: isLoading ? '...' : failedCount,
      description: 'Processes with errors',
      icon: <XCircle className="h-4 w-4" />,
    },
    {
      title: 'Avg Processing Time',
      value: isLoading ? '...' : avgProcessingTime,
      description: 'Time to complete application',
      icon: <TrendingUp className="h-4 w-4" />,
      trend: { value: 8, isPositive: false },
    },
    {
      title: 'Total Loan Value',
      value: isLoading ? '...' : totalLoanValue,
      description: 'Combined value of all loans',
      icon: <DollarSign className="h-4 w-4" />,
      trend: { value: 15, isPositive: true },
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}