import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TaxOverviewCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Tax
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
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$987.65</div>
        <p className="text-xs text-muted-foreground">
          Estimated Q2 2024
        </p>
      </CardContent>
    </Card>
  );
}
