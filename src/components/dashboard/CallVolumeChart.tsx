"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { name: "Day", value: 30 },
    { name: "Day", value: 20 },
    { name: "Tay", value: 40 }, // Typo copied from image for fidelity "Tay"
    { name: "Mont", value: 50 },
    { name: "Day", value: 25 },
    { name: "Day", value: 35 },
    { name: "Day", value: 40 },
    { name: "May", value: 60 },
    { name: "Day", value: 45 },
    { name: "May", value: 50 },
];

export function CallVolumeChart() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Call Volume</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ background: '#333', border: 'none', color: '#fff' }}
                            />
                            <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
