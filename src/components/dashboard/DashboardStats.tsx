import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

export function DashboardStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Calls
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,245</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Avg. Duration
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">3m 15s</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Monthly Usage
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        425 <span className="text-sm font-normal text-muted-foreground">Calls</span>
                    </div>
                </CardContent>
            </Card>

            {/* Filter Card - Custom layout to match design */}
            <Card className="flex flex-col justify-center p-4 space-y-3">
                <div className="relative">
                    <select className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none">
                        <option>Select Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
                </div>
                <div className="relative">
                    <select className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none" defaultValue="March">
                        <option>March</option>
                        <option>April</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
                </div>
            </Card>
        </div>
    );
}
