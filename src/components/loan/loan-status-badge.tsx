import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
interface LoanStatusBadgeProps {
  status: string;
  className?: string;
}
export function LoanStatusBadge({ status, className }: LoanStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case 'running':
      case 'inprogress':
      case 'processing':
        return {
          label: 'Processing',
          className: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        };
      case 'completed':
      case 'successful':
      case 'approved':
        return {
          label: 'Approved',
          className: 'bg-green-100 text-green-800 hover:bg-green-200',
        };
      case 'failed':
      case 'faulted':
      case 'rejected':
        return {
          label: 'Rejected',
          className: 'bg-red-100 text-red-800 hover:bg-red-200',
        };
      case 'paused':
      case 'suspended':
      case 'onhold':
        return {
          label: 'On Hold',
          className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        };
      case 'pending':
      case 'waiting':
        return {
          label: 'Pending',
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        };
      case 'cancelled':
      case 'terminated':
        return {
          label: 'Cancelled',
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        };
      default:
        return {
          label: status || 'Unknown',
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        };
    }
  };
  const config = getStatusConfig(status);
  return (
    <Badge
      variant="secondary"
      className={cn(
        'font-medium text-xs px-2 py-1 rounded-full border-0 transition-colors duration-200',
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}