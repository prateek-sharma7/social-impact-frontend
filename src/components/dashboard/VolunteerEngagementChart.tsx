import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common";

interface EngagementData {
  month: string;
  volunteers: number;
  hours: number;
}

interface VolunteerEngagementChartProps {
  data: EngagementData[];
}

export const VolunteerEngagementChart: React.FC<
  VolunteerEngagementChartProps
> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volunteer Engagement Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorVolunteers"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ color: "#111827", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="volunteers"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorVolunteers)"
                strokeWidth={2}
                name="Volunteers"
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorHours)"
                strokeWidth={2}
                name="Hours"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-600 rounded-full" />
            <span className="text-sm text-gray-600">Volunteers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-secondary-600 rounded-full" />
            <span className="text-sm text-gray-600">Hours Contributed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
