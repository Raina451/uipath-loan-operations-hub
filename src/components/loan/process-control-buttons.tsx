import React, { useState } from 'react';
import { Plus, Play, Pause, Square, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  useUiPathMaestroInstances,
  usePauseMaestroInstance,
  useResumeMaestroInstance,
  useCancelMaestroInstance,
} from '@/hooks/useUiPathMaestro';
// Mock process key and folder key from the client request
const LOAN_PROCESS_KEY = '599b9069-cdaa-4cdc-87b4-9316b6b658fb';
const FOLDER_KEY = '14518163-647b-4f9d-a9fd-13708098ce78';
export function ProcessControlButtons() {
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const { refetch } = useUiPathMaestroInstances();
  const pauseInstance = usePauseMaestroInstance();
  const resumeInstance = useResumeMaestroInstance();
  const cancelInstance = useCancelMaestroInstance();
  const handleStartNewProcess = async () => {
    if (!applicantName.trim() || !loanAmount.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      // In a real implementation, you would use a start process mutation
      // For now, we'll simulate starting a process
      toast.success(`New loan process started for ${applicantName}`, {
        description: `Loan amount: $${loanAmount}`,
      });
      setIsStartDialogOpen(false);
      setApplicantName('');
      setLoanAmount('');
      // Refresh the instances list
      setTimeout(() => {
        refetch();
      }, 1000);
    } catch (error) {
      toast.error('Failed to start new loan process');
      console.error('Start process error:', error);
    }
  };
  const handlePauseAll = async () => {
    try {
      // This would pause all running instances in a real implementation
      toast.info('Pause all functionality would be implemented here');
    } catch (error) {
      toast.error('Failed to pause processes');
    }
  };
  const handleResumeAll = async () => {
    try {
      // This would resume all paused instances in a real implementation
      toast.info('Resume all functionality would be implemented here');
    } catch (error) {
      toast.error('Failed to resume processes');
    }
  };
  const handleRefresh = () => {
    refetch();
    toast.success('Process instances refreshed');
  };
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Start New Process Dialog */}
      <Dialog open={isStartDialogOpen} onOpenChange={setIsStartDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Start New Loan Process
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start New Loan Process</DialogTitle>
            <DialogDescription>
              Enter the loan application details to start a new process instance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="applicant-name">Applicant Name</Label>
              <Input
                id="applicant-name"
                placeholder="Enter applicant name"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan-amount">Loan Amount ($)</Label>
              <Input
                id="loan-amount"
                type="number"
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStartDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleStartNewProcess}>
              Start Process
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePauseAll}
          disabled={pauseInstance.isPending}
        >
          <Pause className="h-4 w-4 mr-2" />
          Pause All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResumeAll}
          disabled={resumeInstance.isPending}
        >
          <Play className="h-4 w-4 mr-2" />
          Resume All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    </div>
  );
}