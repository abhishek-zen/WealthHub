// pages/api/transactions/recent.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Mock data for transactions
const mockTransactionsData = [
  { id: 'txn_001', userId: 'user123', accountId: 'acc_001', description: 'Coffee Shop', amount: 5.50, type: 'expense', category: 'Food & Drink', date: '2024-07-02T10:00:00Z' },
  { id: 'txn_002', userId: 'user123', accountId: 'acc_002', description: 'Salary', amount: 3000.00, type: 'income', category: 'Work', date: '2024-07-01T09:00:00Z' },
  { id: 'txn_003', userId: 'user123', accountId: 'acc_001', description: 'Online Purchase', amount: 75.25, type: 'expense', category: 'Shopping', date: '2024-07-01T14:30:00Z' },
  { id: 'txn_004', userId: 'user123', accountId: 'acc_003', description: 'Stock Sale', amount: 500.00, type: 'income', category: 'Investment', date: '2024-06-30T11:00:00Z' },
  { id: 'txn_005', userId: 'user123', accountId: 'acc_004', description: 'Credit Card Payment', amount: -200.00, type: 'payment', category: 'Credit Card', date: '2024-06-29T16:00:00Z' },
  { id: 'txn_006', userId: 'user456', accountId: 'acc_005', description: 'Rent', amount: 1200.00, type: 'expense', category: 'Housing', date: '2024-07-01T08:00:00Z' },
];

export interface Transaction {
  id: string;
  accountId: string;
  description: string;
  amount: number;
  type: 'expense' | 'income' | 'payment';
  category: string;
  date: string; // ISO 8601 string
}

export interface RecentTransactionsResponse {
  transactions: Transaction[];
  totalCount: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecentTransactionsResponse | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // In a real application, you would get the user ID from the authenticated session
  // and potentially query Supabase with joins to account data.
  const mockUserId = 'user123'; 
  const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 10;
  const offset = typeof req.query.offset === 'string' ? parseInt(req.query.offset, 10) : 0;

  const userTransactions = mockTransactionsData
    .filter(txn => txn.userId === mockUserId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

  const paginatedTransactions = userTransactions.slice(offset, offset + limit);

  res.status(200).json({
    transactions: paginatedTransactions,
    totalCount: userTransactions.length,
  });
}
