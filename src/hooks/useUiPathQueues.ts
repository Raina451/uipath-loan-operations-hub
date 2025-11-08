/**
 * React Query hook for UiPath Queues
 *
 * Provides methods to:
 * - Fetch all queues
 * - Get queue by ID
 *
 * Note: Queue item management (add/update/delete items) is not yet available in the SDK.
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { uipath } from '../lib/uipath';
import type { QueueGetResponse } from '@uipath/uipath-typescript';

/**
 * Fetch all UiPath queues
 *
 * @param folderId - Optional folder ID to filter queues
 */
export function useUiPathQueues(folderId?: number): UseQueryResult<QueueGetResponse[], Error> {
	return useQuery({
		queryKey: ['uipath', 'queues', folderId],
		queryFn: async (): Promise<QueueGetResponse[]> => {
			try {
				const result = await uipath.queues.getAll(
					folderId ? { folderId } : undefined
				);
				if (Array.isArray(result)) {
					return result;
				}
				return (result as any).items || [];
			} catch (error) {
				console.error('Failed to fetch queues:', error);
				throw error;
			}
		},
		refetchInterval: 10000, // Refresh every 10 seconds for queue monitoring
	});
}

/**
 * Get a specific queue by ID
 *
 * @param queueId - The queue ID
 * @param folderId - Required folder ID
 */
export function useUiPathQueue(queueId: number | undefined, folderId: number): UseQueryResult<QueueGetResponse, Error> {
	return useQuery({
		queryKey: ['uipath', 'queues', queueId, folderId],
		queryFn: async (): Promise<QueueGetResponse> => {
			if (!queueId) throw new Error('Queue ID is required');
			return await uipath.queues.getById(queueId, folderId);
		},
		enabled: !!queueId,
		refetchInterval: 10000,
	});
}

