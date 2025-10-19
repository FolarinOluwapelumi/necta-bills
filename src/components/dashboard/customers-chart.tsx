"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

const chartData = [
  { name: "1D", value: 400 },
  { name: "1W", value: 300 },
  { name: "2W", value: 200 },
  { name: "3W", value: 278 },
  { name: "1M", value: 189 },
  { name: "2M", value: 239 },
  { name: "3M", value: 349 },
  { name: "6M", value: 200 },
  { name: "1Y", value: 278 },
  { name: "All", value: 189 },
];

const timePeriods = [
  "1D",
  "1W",
  "2W",
  "3W",
  "1M",
  "2M",
  "3M",
  "6M",
  "1Y",
  "All",
];

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  // Highlight the highest value point with a green circle
  const maxValue = Math.max(...chartData.map((d) => d.value));
  if (payload.value === maxValue) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#10B981"
        stroke="#fff"
        strokeWidth={2}
      />
    );
  }
  return null;
};

const CustomTooltip = (props: any) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-gray-900">
          {payload[0].payload.name}
        </p>
        <p className="text-sm text-blue-600 font-medium">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function CustomersChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("1D");
  const [selectedRange, setSelectedRange] = useState("Daily");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">
          Customers
        </h2>

        {/* <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"> */}
          {/* Time period buttons - wrap on mobile */}
          <div className="flex gap-2 flex-wrap">
            {["Daily", "Weekly", "Monthly", "Yearly"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedRange(period)}
                className={`px-3 py-2 font-medium rounded-xl text-xs md:text-sm transition-all duration-200 hover:scale-105 ${
                  selectedRange === period
                    ? "bg-blue-100 text-blue-500" // Active state: gray bg, black text, medium font
                    : "text-gray-500 hover:text-gray-700" // Inactive state
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Date inputs */}
          <div className="flex gap-2 sm:gap-3 items-center">
            <span className="text-gray-400 text-sm">From</span>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-25 sm:w-30 font-medium px-3 py-2 border border-gray-200 rounded-2xl text-sm transition-all duration-200 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-400 text-sm">To</span>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-25 sm:w-30 px-3 py-2 border border-gray-200 rounded-2xl text-sm transition-all duration-200 focus:ring-blue-500 focus:border-transparent"
            />
          {/* </div> */}
        </div>
      </div>

      <div className="w-full -ml-2 pr-2 md:ml-0 md:pr-0">
        <ResponsiveContainer width="100%" height={200} className="md:h-80">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -5, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              fontSize={12}
              tickMargin={5}
            />
            <YAxis stroke="#9ca3af" fontSize={12} width={35} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0066FF"
              strokeWidth={2.5}
              fill="url(#colorValue)"
              dot={false} 
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-2 mt-6 w-full justify-evenly md:justify-between flex-wrap">
        {timePeriods.map((period, index) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-3 py-2 rounded-xl sm:rounded-2xl text-xs transition-all duration-200 hover:scale-105 ${
              selectedPeriod === period
                ? "bg-gray-100 text-gray-900 font-medium" // Active state
                : "text-gray-400 hover:text-gray-600" // Inactive state
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
}