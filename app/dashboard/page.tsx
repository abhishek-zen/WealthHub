import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { BankingSummaryCard } from "@/components/dashboard/BankingSummaryCard";
import { InvestmentsSummaryCard } from "@/components/dashboard/InvestmentsSummaryCard";
import { SpendingOverviewCard } from "@/components/dashboard/SpendingOverviewCard";
import { TaxOverviewCard } from "@/components/dashboard/TaxOverviewCard";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userSegment = user?.user_metadata?.segment || "default"; // Assuming 'segment' is a metadata field

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Breadcrumbs />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userSegment === "business" ? (
          <>
            <BankingSummaryCard />
            <InvestmentsSummaryCard />
            <TaxOverviewCard />
          </>
        ) : (
          <>
            <BankingSummaryCard />
            <InvestmentsSummaryCard />
            <SpendingOverviewCard />
          </>
        )}
      </div>

      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Quick Links</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Make Payment</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">View Transactions</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Transfer Funds</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Download Statements</button>
      </div>
    </div>
  );
}
