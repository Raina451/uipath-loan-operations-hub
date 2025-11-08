import React from 'react';
import { format } from 'date-fns';
import { X, Calendar, User, DollarSign, FileText, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUiPathMaestroVariables } from '@/hooks/useUiPathMaestro';
import { LoanStatusBadge } from './loan-status-badge';
import type { RawProcessInstanceGetResponse } from '@uipath/uipath-typescript';
interface LoanDetailsModalProps {
  instance: RawProcessInstanceGetResponse | null;
  isOpen: boolean;
  onClose: () => void;
}
const FOLDER_KEY = '14518163-647b-4f9d-a9fd-13708098ce78';
export function LoanDetailsModal({ instance, isOpen, onClose }: LoanDetailsModalProps) {
  const { data: variables, isLoading: variablesLoading } = useUiPathMaestroVariables(
    instance?.id,
    FOLDER_KEY,
    { enabled: !!instance?.id && isOpen }
  );
  if (!instance) return null;
  // Extract basic instance information
  const instanceId = instance.id || 'N/A';
  const status = instance.status || 'Unknown';
  const startTime = instance.startTime ? new Date(instance.startTime) : null;
  const lastModified = instance.lastModified ? new Date(instance.lastModified) : null;
  const endTime = instance.endTime ? new Date(instance.endTime) : null;
  // Mock loan data (in real implementation, this would come from process variables)
  const mockLoanData = {
    applicantName: `Applicant ${instanceId.slice(-4)}`,
    loanAmount: (Math.random() * 500000 + 50000).toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }),
    loanType: 'Personal Loan',
    creditScore: Math.floor(Math.random() * 300) + 500,
    employmentStatus: 'Full-time',
    annualIncome: (Math.random() * 100000 + 40000).toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }),
    purpose: 'Home Improvement',
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">Loan Application Details</DialogTitle>
              <DialogDescription>
                Process Instance: {instanceId.length > 30 ? `${instanceId.slice(0, 30)}...` : instanceId}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Status and Timeline */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Process Status</h3>
                <LoanStatusBadge status={status} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Started</p>
                    <p className="font-medium">
                      {startTime ? format(startTime, 'MMM dd, yyyy HH:mm') : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Last Updated</p>
                    <p className="font-medium">
                      {lastModified ? format(lastModified, 'MMM dd, yyyy HH:mm') : 'N/A'}
                    </p>
                  </div>
                </div>
                {endTime && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Completed</p>
                      <p className="font-medium">
                        {format(endTime, 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Separator />
            {/* Loan Application Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Loan Application Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Applicant Name</p>
                    <p className="font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {mockLoanData.applicantName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                    <p className="font-medium text-green-700 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {mockLoanData.loanAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Type</p>
                    <Badge variant="outline">{mockLoanData.loanType}</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Credit Score</p>
                    <p className="font-medium">{mockLoanData.creditScore}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Income</p>
                    <p className="font-medium">{mockLoanData.annualIncome}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Employment Status</p>
                    <Badge variant="secondary">{mockLoanData.employmentStatus}</Badge>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            {/* Process Variables */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Process Variables</h3>
              {variablesLoading ? (
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </div>
              ) : variables ? (
                <div className="space-y-2">
                  <div className="text-sm bg-muted/50 p-3 rounded-md">
                    <pre className="whitespace-pre-wrap text-xs">
                      {JSON.stringify(variables, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No process variables available for this instance.
                </p>
              )}
            </div>
            {/* Technical Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Technical Details</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Process Instance ID:</span>
                  <span className="font-mono text-xs">{instanceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Process Key:</span>
                  <span className="font-mono text-xs">599b9069-cdaa-4cdc-87b4-9316b6b658fb</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Folder Key:</span>
                  <span className="font-mono text-xs">14518163-647b-4f9d-a9fd-13708098ce78</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}