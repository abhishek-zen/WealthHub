// components/dashboard/ConsolidatedBalancesCard.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Import the interface from the API route for type safety
import { ConsolidatedBalancesResponse } from "@/pages/api/accounts/balances";

export function ConsolidatedBalancesCard() {
  const [data, setData] = useState<ConsolidatedBalancesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/accounts/balances");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ConsolidatedBalancesResponse = await response.json();
        setData(result);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Consolidated Balances</CardTitle>
          <CardDescription>Loading your financial overview...</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Consolidated Balances</CardTitle>
          <CardDescription>Error fetching data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error: {error}. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Consolidated Balances</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent>
          <p>No financial data to display. Link your accounts to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consolidated Balances</CardTitle>
        <CardDescription>Your overall financial snapshot.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-2xl font-bold">
            Total Balance: ${data.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="text-lg font-semibold mb-2">Breakdown by Type:</h3>
          {
            Object.entries(data.breakdownByType).map(([type, amount]) => (
              <div key={type} className="flex justify-between items-center py-1">
                <span className="capitalize">{type.replace('_', ' ')}:</span>
                <span>${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  );
}
