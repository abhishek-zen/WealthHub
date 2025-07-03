// lib/api/partner.ts

// Define TypeScript interfaces for generic partner API request and response types
export interface PartnerApiRequest {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface PartnerApiResponse<T = any> { // eslint-disable-line @typescript-eslint/no-explicit-any
  data: T | null;
  success: boolean;
  statusCode: number;
  message?: string;
  error?: string;
}

/**
 * A generic function to make API calls to various partner services.
 * @param request - The request payload containing endpoint, method, headers, and body.
 * @returns A promise that resolves to the PartnerApiResponse.
 */
export async function callPartnerApi<T = any>( // eslint-disable-line @typescript-eslint/no-explicit-any
  request: PartnerApiRequest
): Promise<PartnerApiResponse<T>> {
  console.log('Calling generic partner API:', request.endpoint, request.method);

  // --- Mock Implementation ---
  // In a real scenario, this would dynamically route requests to different partner APIs.
  // For now, it returns a generic mock response.

  if (!request.endpoint || !request.method) {
    return {
      data: null,
      success: false,
      statusCode: 400,
      message: 'Missing endpoint or method',
      error: 'Invalid Request',
    };
  }

  // Simulate an API call
  const isSuccess = Math.random() > 0.15; // 85% chance of success for mock

  if (isSuccess) {
    return {
      data: { message: 'Mock partner API call successful!', receivedRequest: request } as T,
      success: true,
      statusCode: 200,
      message: 'Operation completed successfully.',
    };
  } else {
    return {
      data: null,
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      error: 'Mock partner API call failed.',
    };
  }
}
