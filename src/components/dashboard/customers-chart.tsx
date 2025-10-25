"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { name: string } }>;
}

const CustomTooltip = (props: TooltipProps) => {
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

const timePeriods = [
  "1D", "1W", "2W", "3W", "1M", "2M", "3M", "6M", "1Y", "All",
];

// Generate more dynamic, wavy data for different time periods
const generateChartData = (period: string) => {
  const periodData: Record<string, Array<{ name: string; value: number }>> = {
    "1D": Array.from({ length: 24 }, (_, i) => ({
      name: `${i}:00`,
      value: Math.floor(Math.random() * 100) + 200 + Math.sin(i) * 50,
    })),
    "1W": Array.from({ length: 7 }, (_, i) => ({
      name: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      value: Math.floor(Math.random() * 150) + 250 + Math.sin(i) * 80,
    })),
    "2W": Array.from({ length: 14 }, (_, i) => ({
      name: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 120) + 280 + Math.sin(i * 0.5) * 60,
    })),
    "3W": Array.from({ length: 21 }, (_, i) => ({
      name: `W${Math.floor(i / 7) + 1}D${(i % 7) + 1}`,
      value: Math.floor(Math.random() * 130) + 270 + Math.sin(i * 0.3) * 70,
    })),
    "1M": Array.from({ length: 30 }, (_, i) => ({
      name: `${i + 1}`,
      value: Math.floor(Math.random() * 200) + 300 + Math.sin(i * 0.2) * 100,
    })),
    "2M": Array.from({ length: 8 }, (_, i) => ({
      name: `Week ${i + 1}`,
      value: Math.floor(Math.random() * 180) + 320 + Math.sin(i) * 90,
    })),
    "3M": Array.from({ length: 12 }, (_, i) => ({
      name: `W${i + 1}`,
      value: Math.floor(Math.random() * 220) + 280 + Math.sin(i * 0.5) * 110,
    })),
    "6M": Array.from({ length: 6 }, (_, i) => ({
      name: `Month ${i + 1}`,
      value: Math.floor(Math.random() * 250) + 350 + Math.sin(i) * 120,
    })),
    "1Y": Array.from({ length: 12 }, (_, i) => ({
      name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      value: Math.floor(Math.random() * 300) + 400 + Math.sin(i * 0.8) * 150,
    })),
    "All": Array.from({ length: 5 }, (_, i) => ({
      name: `Year ${2021 + i}`,
      value: Math.floor(Math.random() * 500) + 1000 + Math.sin(i) * 200,
    })),
  };

  return periodData[period] || periodData["1D"];
};

export function CustomersChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("1D");
  const [selectedRange, setSelectedRange] = useState("Daily");

  // Generate chart data based on selected period
  const chartData = useMemo(() => {
    return generateChartData(selectedPeriod);
  }, [selectedPeriod]);

  return (
    <div className="transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">
          Customers
        </h2>

        {/* Time period buttons - wrap on mobile */}
        <div className="flex gap-2 flex-wrap">
          {["Daily", "Weekly", "Monthly", "Yearly"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedRange(period)}
              className={`px-3 py-2 font-medium rounded-xl text-xs md:text-sm transition-all duration-200 hover:scale-105 ${
                selectedRange === period
                  ? "bg-blue-100 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Date inputs */}
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 text-sm">From</span>
          <input
            type="text"
            placeholder="mm/dd/yyyy"
            className="w-23 sm:w-27 px-3 py-2 border border-gray-200 rounded-2xl text-[.7rem] sm:text-sm transition-all duration-200 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-gray-500 text-sm">To</span>
          <input
            type="text"
            placeholder="mm/dd/yyyy"
            className="w-23 sm:w-27 px-3 py-2 border border-gray-200 rounded-2xl text-[.7rem] sm:text-sm transition-all duration-200 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={200} className="md:h-80">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
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
              axisLine={false}
              tickLine={false}
              tick={false}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={false}
              width={0}
              padding={{ top: 0, bottom: 0 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0066FF"
              strokeWidth={2.5}
              fill="url(#colorValue)"
              dot={false}
              activeDot={{ r: 6, fill: "#0066FF", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-2 w-full justify-evenly md:justify-between flex-wrap">
        {timePeriods.map((period) => ( // FIXED: Removed unused 'index' parameter
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-3 py-2 rounded-xl sm:rounded-2xl text-xs transition-all duration-200 hover:scale-105 ${
              selectedPeriod === period
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
}