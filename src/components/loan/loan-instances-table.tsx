import React, { useState } from 'react';
import { format } from 'date-fns';
import { Eye, MoreHorizontal, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useUiPathMaestroInstances } from '@/hooks/useUiPathMaestro';
import { LoanStatusBadge } from './loan-status-badge';
import { LoanDetailsModal } from './loan-details-modal';
import type { RawProcessInstanceGetResponse } from '@uipath/uipath-typescript';
export function LoanInstancesTable() {
  const { data: instances, isLoading, error, refetch } = useUiPathMaestroInstances();
  const [selectedInstance, setSelectedInstance] = useState<RawProcessInstanceGetResponse | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const handleViewDetails = (instance: RawProcessInstanceGetResponse) => {
    setSelectedInstance(instance);
    setIsDetailsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedInstance(null);
  };
  // Handle loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Loan Instances...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  // Handle error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading Instances</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load loan process instances: {error.message}
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="ml-4"
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  // Handle empty state
  const instancesArray = Array.isArray(instances) ? instances : instances?.value || [];
  if (instancesArray.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Loan Instances Found</CardTitle>
          <CardDescription>
            No loan processing instances are currently available. Start a new loan process to see instances here.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Active Loan Process Instances</CardTitle>
          <CardDescription>
            Real-time view of all loan application processes ({instancesArray.length} total)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48">Instance ID</TableHead>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Loan Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instancesArray.map((instance) => {
                  // Extract basic instance information
                  const instanceId = instance.id || 'N/A';
                  const status = instance.status || 'Unknown';
                  const startTime = instance.startTime ? new Date(instance.startTime) : null;
                  const lastModified = instance.lastModified ? new Date(instance.lastModified) : null;
                  // For demo purposes, we'll generate some sample loan data
                  // In a real implementation, this would come from process variables
                  const applicantName = `Applicant ${instanceId.slice(-4)}`;
                  const loanAmount = `$${(Math.random() * 500000 + 50000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
                  return (
                    <TableRow key={instanceId} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">
                        {instanceId.length > 20 ? `${instanceId.slice(0, 20)}...` : instanceId}
                      </TableCell>
                      <TableCell className="font-medium">{applicantName}</TableCell>
                      <TableCell className="font-semibold text-green-700">{loanAmount}</TableCell>
                      <TableCell>
                        <LoanStatusBadge status={status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {startTime ? format(startTime, 'MMM dd, HH:mm') : 'N/A'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {lastModified ? format(lastModified, 'MMM dd, HH:mm') : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(instance)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Loan Details Modal */}
      <LoanDetailsModal
        instance={selectedInstance}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}