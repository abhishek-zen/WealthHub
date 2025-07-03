// pages/api/accounts/balances.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Mock data for linked accounts and their balances
// In a real application, this would come from a database (e.g., Supabase)
const mockLinkedAccountsData = [
  { id: 'acc_001', userId: 'user123', name: 'Primary Checking', type: 'bank', balance: 1500.75 },
  { id: 'acc_002', userId: 'user123', name: 'Savings A', type: 'bank', balance: 5000.00 },
  { id: 'acc_003', userId: 'user123', name: 'Investments XYZ', type: 'investment', balance: 12345.67 },
  { id: 'acc_004', userId: 'user123', name: 'Credit Card ABC', type: 'credit_card', balance: -750.20 },
  { id: 'acc_005', userId: 'user456', name: 'Other User Bank', type: 'bank', balance: 200.00 },
];

export interface AccountBalance {
  accountId: string;
  name: string;
  type: string;
  balance: number;
}

export interface ConsolidatedBalancesResponse {
  totalBalance: number;
  breakdownByType: {
    bank: number;
    investment: number;
    credit_card: number;
    [key: string]: number; // Allow other account types dynamically
  };
  accounts: AccountBalance[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConsolidatedBalancesResponse | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // In a real application, you would get the user ID from the authenticated session
  // For now, we'll use a hardcoded mock user ID.
  const mockUserId = 'user123'; 

  // Filter accounts for the mock user
  const userAccounts = mockLinkedAccountsData.filter(account => account.userId === mockUserId);

  let totalBalance = 0;
  const breakdownByType: { [key: string]: number } = {};
  const accountsList: AccountBalance[] = [];

  userAccounts.forEach(account => {
    totalBalance += account.balance;
    if (breakdownByType[account.type]) {
      breakdownByType[account.type] += account.balance;
    } else {
      breakdownByType[account.type] = account.balance;
    }
    accountsList.push({
      accountId: account.id,
      name: account.name,
      type: account.type,
      balance: account.balance,
    });
  });

  res.status(200).json({
    totalBalance,
    breakdownByType: breakdownByType as ConsolidatedBalancesResponse['breakdownByType'],
    accounts: accountsList,
  });
}
