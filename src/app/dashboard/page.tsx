"use client";

import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { CallVolumeChart } from "@/components/dashboard/CallVolumeChart";
import { SuccessRateChart } from "@/components/dashboard/SuccessRateChart";
import { SentimentAnalysisChart } from "@/components/dashboard/SentimentAnalysisChart";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            {/* Top Stats Row */}
            <DashboardStats />

            {/* Bottom Charts Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Call Volume - kept distinct as per original design/mockup usually implies it's big, but user only asked to merge the OTHER two. */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <CallVolumeChart />
                </div>

                {/* Combined Success Rate & Sentiment Analysis */}
                <div className="col-span-1 md:col-span-2 lg:col-span-5">
                    <Card className="h-full">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="col-span-1">
                                    <SuccessRateChart />
                                </div>
                                <div className="col-span-1">
                                    <SentimentAnalysisChart />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
