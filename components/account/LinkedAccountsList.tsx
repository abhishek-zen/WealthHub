// components/account/LinkedAccountsList.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Define an interface for a linked account
interface LinkedAccount {
  id: string;
  name: string;
  type: string;
  status: "active" | "failed" | "pending";
}

// Mock data for linked accounts
const mockLinkedAccounts: LinkedAccount[] = [
  { id: "acc_001", name: "My Savings Account", type: "Bank", status: "active" },
  { id: "acc_002", name: "Investment Portfolio", type: "Investment", status: "active" },
  { id: "acc_003", name: "Credit Card Platinum", type: "Credit Card", status: "failed" },
  { id: "acc_004", name: "Joint Checking", type: "Bank", status: "pending" },
];

export function LinkedAccountsList() {
  // In a real application, you would fetch this data from an API endpoint
  // For now, we use mock data.
  const linkedAccounts = mockLinkedAccounts;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {linkedAccounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="font-medium">{account.name}</TableCell>
              <TableCell>{account.type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    account.status === "active"
                      ? "default"
                      : account.status === "failed"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
