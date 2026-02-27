"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    { name: "Successful", value: 78, color: "#10b981" }, // Green
    { name: "Unsuccessful", value: 22, color: "#ef4444" }, // Red
    { name: "Pending", value: 15, color: "#f59e0b" }, // Yellow/Orange
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
            {`${value}%`}
        </text>
    );
};

export function SuccessRateChart() {
    return (
        <div className="flex flex-col h-full w-full">
            <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">Success Rate</h3>
            <div className="h-[200px] w-full relative">
                {/* Removed the center overlay text as it is now a full pie chart and center would be covered */}
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={0} // Full Pie
                            outerRadius={80}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                            labelLine={false}
                            label={renderCustomizedLabel}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
