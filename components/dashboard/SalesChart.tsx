"use client";

import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { ArrowUpRight } from 'lucide-react';

interface SalesChartProps {
  data: Array<{ month: string; avg_sale_value: number; avg_item_per_sale: number }>;
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex gap-2 items-start">
        <div className="bg-white dark:bg-[#1A1A1A] border-2 border-dashed border-[#1A71F6] rounded-lg px-3 py-2 shadow-sm">
          <p className="font-jakarta text-[11px] text-gray-500 dark:text-gray-400 mb-1">Average item persale</p>
          <p className="font-jakarta font-semibold text-[14px] text-[#2A2A2A] dark:text-white">
            ${formatNumber(payload[1]?.value || 0)}
          </p>
        </div>
        <div className="bg-[#BCF328] rounded-lg px-3 py-2 shadow-sm">
          <p className="font-jakarta text-[11px] text-[#454545] mb-1">Average year value</p>
          <p className="font-jakarta font-semibold text-[14px] text-[#2A2A2A]">
            ${formatNumber(payload[0]?.value || 0)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const SalesChart = ({ data }: SalesChartProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-[320px] md:h-[382px] bg-white dark:bg-[#1A1A1A] rounded-3xl border border-[#E7E7E7] dark:border-[#2A2A2A] p-4 md:p-5 flex flex-col gap-4 md:gap-6">
      <div className="flex justify-between items-center">
        <h2 className="font-jakarta font-semibold text-[16px] leading-[130%] text-[#2A2A2A] dark:text-white">
          Your Sales this year
        </h2>
        <button 
          className="flex items-center gap-1 font-jakarta text-sm transition-colors duration-200"
          style={{ color: isHovered ? '#1A71F6' : '#2A2A2A' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="hidden sm:inline">Show All</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-4 md:gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#BCF328]"></div>
          <span className="font-jakarta text-xs md:text-sm text-[#888888] dark:text-gray-400">Average Sale Value</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#1A71F6]"></div>
          <span className="font-jakarta text-xs md:text-sm text-[#888888] dark:text-gray-400">Average item persale</span>
        </div>
      </div>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F0F0F0" className="dark:stroke-[#2A2A2A]" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, fill: '#888888' }} dy={10} padding={{ left: 5, right: 5 }} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1A71F6', strokeWidth: 2, strokeDasharray: '4 4' }} />
            <Line type="monotone" dataKey="avg_sale_value" stroke="#BCF328" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#BCF328', stroke: '#fff', strokeWidth: 2 }} />
            <Line type="monotone" dataKey="avg_item_per_sale" stroke="#1A71F6" strokeWidth={3} strokeDasharray="8 4" dot={false} activeDot={{ r: 6, fill: '#1A71F6', stroke: '#fff', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;