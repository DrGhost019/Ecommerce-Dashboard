// components/dashboard/StatCard.tsx
"use client";

import React from 'react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  changePercentage: number;
  changeDirection: 'up' | 'down';
  period: string;
  bgColor: string;
  textColor: string;
  valueColor: string;
  darkBgColor?: string;
  darkTextColor?: string;
  darkValueColor?: string;
}

const StatCard = ({
  title,
  value,
  changePercentage,
  changeDirection,
  period,
  bgColor,
  textColor,
  valueColor,
  darkBgColor = '#1A1A1B',
  darkTextColor = '#FFFFFF',
  darkValueColor = '#1A71F6',
}: StatCardProps) => {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);
  
  const isUp = changeDirection === 'up';
  const trendColor = isUp ? '#4ADE80' : '#EF4444';

  return (
    <div
      className="w-full h-[120px] md:h-[140px] rounded-[20px] border border-[#E7E7E7] dark:border-[#2A2A2A] p-3 md:p-4 flex flex-col justify-between cursor-pointer"
      style={{ backgroundColor: isDark ? darkBgColor : bgColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <span
          className="font-jakarta font-semibold text-[14px] md:text-[16px] leading-[130%]"
          style={{ color: isDark ? darkTextColor : textColor }}
        >
          {title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isHovered ? '#1A71F6' : (isDark ? darkTextColor : textColor)}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-200"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-end">
        <span
          className="font-jakarta font-bold text-[20px] md:text-[24px]"
          style={{ color: isDark ? darkValueColor : valueColor }}
        >
          {value}
        </span>
        <div className="flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={trendColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isUp ? (
                <>
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </>
              ) : (
                <>
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                  <polyline points="17 18 23 18 23 12" />
                </>
              )}
            </svg>
            <span
              className="font-jakarta text-xs md:text-sm font-semibold"
              style={{ color: trendColor }}
            >
              {changePercentage}%
            </span>
          </div>
          <span
            className="font-jakarta text-[10px]"
            style={{ color: isDark ? darkTextColor : textColor, opacity: 0.7 }}
          >
            {period}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;