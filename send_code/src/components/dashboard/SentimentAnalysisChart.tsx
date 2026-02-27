"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

// Mock data to match the wavey lines
const data = [
    { name: 'Jan', positive: 300, neutral: 200, negative: 180 },
    { name: 'Feb', positive: 380, neutral: 240, negative: 220 },
    { name: 'Mar', positive: 350, neutral: 200, negative: 180 },
    { name: 'Apr', positive: 360, neutral: 240, negative: 220 },
    { name: 'May', positive: 320, neutral: 210, negative: 190 },
    { name: 'Jun', positive: 350, neutral: 250, negative: 230 },
    { name: 'Jul', positive: 380, neutral: 280, negative: 260 },
];

export function SentimentAnalysisChart() {
    return (
        <div className="flex flex-col h-full w-full">
            <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">Sentiment Analysis</h3>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            hide
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}k`}
                        />
                        <Tooltip
                            contentStyle={{ background: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        <Line
                            type="monotone"
                            dataKey="positive"
                            stroke="#82ca9d" // Greenish
                            strokeWidth={2}
                            dot={{ r: 4, fill: "#82ca9d", strokeWidth: 0 }}
                            name="Positive"
                        />
                        <Line
                            type="monotone"
                            dataKey="neutral"
                            stroke="#facc15" // Yellowish
                            strokeWidth={2}
                            dot={{ r: 4, fill: "#facc15", strokeWidth: 0 }}
                            name="Neutral"
                        />
                        <Line
                            type="monotone"
                            dataKey="negative"
                            stroke="#ef4444" // Reddish
                            strokeWidth={2}
                            dot={{ r: 4, fill: "#ef4444", strokeWidth: 0 }}
                            name="Negative"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
