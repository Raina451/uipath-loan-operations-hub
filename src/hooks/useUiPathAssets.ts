/**
 * React Query hook for UiPath Assets
 *
 * Provides methods to:
 * - Fetch all assets
 * - Get asset by ID
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { uipath } from '../lib/uipath';
import type { AssetGetResponse } from '@uipath/uipath-typescript';

/**
 * Fetch all UiPath assets
 *
 * @param folderId - Optional folder ID to filter assets
 */
export function useUiPathAssets(folderId?: number): UseQueryResult<AssetGetResponse[], Error> {
	return useQuery({
		queryKey: ['uipath', 'assets', folderId],
		queryFn: async (): Promise<AssetGetResponse[]> => {
			try {
				const result = await uipath.assets.getAll(
					folderId ? { folderId } : undefined
				);
				if (Array.isArray(result)) {
					return result;
				}
				return (result as any).items || [];
			} catch (error) {
				console.error('Failed to fetch assets:', error);
				throw error;
			}
		},
	});
}

/**
 * Get a specific asset by ID
 *
 * @param assetId - The asset ID
 * @param folderId - Required folder ID
 */
export function useUiPathAsset(assetId: number | undefined, folderId: number): UseQueryResult<AssetGetResponse, Error> {
	return useQuery({
		queryKey: ['uipath', 'assets', assetId, folderId],
		queryFn: async (): Promise<AssetGetResponse> => {
			if (!assetId) throw new Error('Asset ID is required');
			return await uipath.assets.getById(assetId, folderId);
		},
		enabled: !!assetId,
	});
}
