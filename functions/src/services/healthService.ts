/**
 * Health check service
 */

import { onCall } from 'firebase-functions/v2/https';
import { HealthResponse } from '../types';

/**
 * Health check endpoint
 */
export const health = onCall(
  { region: 'asia-southeast1' },
  async (_request): Promise<HealthResponse> => {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
);
