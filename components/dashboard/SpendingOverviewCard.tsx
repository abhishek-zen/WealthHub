import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SpendingOverviewCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Spending
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M17 10H3" />
          <path d="M21 6H3" />
          <path d="M21 14H3" />
          <path d="M17 18H3" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$1,234.56</div>
        <p className="text-xs text-muted-foreground">
          -5.2% from last month
        </p>
      </CardContent>
    </Card>
  );
}
