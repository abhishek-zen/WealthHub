// lib/api/upi.ts

// Define TypeScript interfaces for UPI request and response types
export interface InitiateUpiPaymentRequest {
  payerVpa: string;
  payeeVpa: string;
  amount: number;
  transactionRef: string;
  remarks?: string;
}

export interface InitiateUpiPaymentResponse {
  transactionId: string;
  status: 'pending' | 'success' | 'failed';
  message?: string;
}

export interface UpiTransactionHistoryRequest {
  userId: string;
  limit?: number;
  offset?: number;
}

export interface UpiTransaction {
  transactionId: string;
  type: 'debit' | 'credit';
  vpa: string;
  amount: number;
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
  remarks?: string;
}

export interface UpiTransactionHistoryResponse {
  transactions: UpiTransaction[];
  totalCount: number;
}

/**
 * Initiates a UPI payment.
 * @param request - The request payload for initiating UPI payment.
 * @returns A promise that resolves to the InitiateUpiPaymentResponse.
 */
export async function initiateUpiPayment(
  request: InitiateUpiPaymentRequest
): Promise<InitiateUpiPaymentResponse> {
  console.log('Initiating UPI payment:', request);

  // --- Mock Implementation ---
  // In a real scenario, this would interact with a UPI payment gateway.
  const mockTransactionId = `upi_${Date.now()}`;
  const isSuccess = Math.random() > 0.1; // 90% chance of success for mock

  return {
    transactionId: mockTransactionId,
    status: isSuccess ? 'success' : 'failed',
    message: isSuccess ? 'UPI payment successful.' : 'UPI payment failed.',
  };
}

/**
 * Fetches UPI transaction history for a user.
 * @param request - The request payload for fetching history.
 * @returns A promise that resolves to the UpiTransactionHistoryResponse.
 */
export async function getUpiTransactionHistory(
  request: UpiTransactionHistoryRequest
): Promise<UpiTransactionHistoryResponse> {
  console.log('Fetching UPI transaction history for user:', request.userId);

  // --- Mock Implementation ---
  const mockTransactions: UpiTransaction[] = [
    {
      transactionId: 'upi_txn_001', type: 'debit', vpa: 'payee123@bank', amount: 100.50, timestamp: new Date().toISOString(), status: 'success', remarks: 'Groceries'
    },
    {
      transactionId: 'upi_txn_002', type: 'credit', vpa: 'payer456@bank', amount: 500.00, timestamp: new Date().toISOString(), status: 'success', remarks: 'Freelance payment'
    },
    {
      transactionId: 'upi_txn_003', type: 'debit', vpa: 'payee789@bank', amount: 25.00, timestamp: new Date().toISOString(), status: 'failed', remarks: 'Mobile recharge'
    },
  ];

  return {
    transactions: mockTransactions,
    totalCount: mockTransactions.length,
  };
}
