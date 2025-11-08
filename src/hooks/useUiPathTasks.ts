/**
 * React Query hook for UiPath Tasks (Action Center)
 *
 * Provides methods to:
 * - Fetch all tasks
 * - Assign tasks to users
 * - Complete tasks
 */

import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { uipath } from '../lib/uipath';
import { toast } from 'sonner';
import type { RawTaskGetResponse, TaskAssignmentResponse, TaskType } from '@uipath/uipath-typescript';

/**
 * Fetch all UiPath tasks
 *
 * @param folderId - Optional folder ID to filter tasks
 */
export function useUiPathTasks(folderId?: number): UseQueryResult<RawTaskGetResponse[], Error> {
	return useQuery({
		queryKey: ['uipath', 'tasks', folderId],
		queryFn: async (): Promise<RawTaskGetResponse[]> => {
			try {
				const result = await uipath.tasks.getAll(
					folderId ? { folderId } : undefined
				);
				if (Array.isArray(result)) {
					return result;
				}
				return (result as any).items || [];
			} catch (error) {
				console.error('Failed to fetch tasks:', error);
				throw error;
			}
		},
		refetchInterval: 15000, // Refresh every 15 seconds
	});
}

/**
 * Mutation to assign a task to a user
 */
export function useAssignTask(): UseMutationResult<TaskAssignmentResponse[], Error, { taskId: number; userNameOrEmail: string }> {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			taskId,
			userNameOrEmail,
		}: {
			taskId: number;
			userNameOrEmail: string;
		}): Promise<TaskAssignmentResponse[]> => {
			const result = await uipath.tasks.assign({ taskId, userNameOrEmail });
			// SDK returns OperationResponse with data field containing array
			return result.data as TaskAssignmentResponse[];
		},
		onSuccess: () => {
			toast.success('Task assigned successfully');
			queryClient.invalidateQueries({ queryKey: ['uipath', 'tasks'] });
		},
		onError: (error: Error) => {
			toast.error(`Failed to assign task: ${error.message}`);
		},
	});
}

/**
 * Mutation to complete a task
 *
 * Supports all task types:
 * - External tasks: data and action are optional
 * - App/Form tasks: data and action are required
 *
 * @example
 * ```tsx
 * const completeTask = useCompleteTask();
 *
 * // Complete an App task
 * completeTask.mutate({
 *   taskId: 123,
 *   type: TaskType.App,
 *   action: 'approve',
 *   data: { approved: true },
 *   folderId: 456
 * });
 *
 * // Complete an External task
 * completeTask.mutate({
 *   taskId: 789,
 *   type: TaskType.External,
 *   folderId: 456
 * });
 * ```
 */
export function useCompleteTask(): UseMutationResult<
	void,
	Error,
	| { taskId: number; type: TaskType.External; data?: Record<string, unknown>; action?: string; folderId: number }
	| { taskId: number; type: TaskType.App | TaskType.Form; data: Record<string, unknown>; action: string; folderId: number }
> {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params:
			| { taskId: number; type: TaskType.External; data?: Record<string, unknown>; action?: string; folderId: number }
			| { taskId: number; type: TaskType.App | TaskType.Form; data: Record<string, unknown>; action: string; folderId: number }
		): Promise<void> => {
			const { taskId, type, folderId, data, action } = params;

			await uipath.tasks.complete(
				{
					type,
					taskId,
					...(data !== undefined && { data }),
					...(action !== undefined && { action }),
				} as any,
				folderId
			);
		},
		onSuccess: () => {
			toast.success('Task completed successfully');
			queryClient.invalidateQueries({ queryKey: ['uipath', 'tasks'] });
		},
		onError: (error: Error) => {
			toast.error(`Failed to complete task: ${error.message}`);
		},
	});
}
