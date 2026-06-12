import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CustomerGrowthProps {
  data?: any; 
}

const CustomerGrowth = ({ data }: CustomerGrowthProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-auto md:h-[396px] bg-white dark:bg-[#1A1A1A] rounded-3xl border border-[#E7E7E7] dark:border-[#2A2A2A] p-4 md:p-5 flex flex-col" style={{ gap: '20px' }}>
      <div className="w-full flex flex-col" style={{ gap: '16px' }}>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="font-jakarta font-semibold text-[16px] leading-[130%] text-[#2A2A2A] dark:text-white">
              Customer Growth
            </h2>
            <p className="font-jakarta font-semibold text-[16px] leading-[130%] text-[#2A2A2A] dark:text-white">
              3 Province
            </p>
          </div>
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
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#BCF328] dark:bg-[#9DD909]"></div>
            <span className="font-jakarta text-[11px] md:text-[12px] text-[#888888] dark:text-gray-400">
              East Java <span className="font-semibold text-[#2A2A2A] dark:text-white">(50%)</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1A71F6] dark:bg-[#FF1F1F]"></div>
            <span className="font-jakarta text-[11px] md:text-[12px] text-[#888888] dark:text-gray-400">
              Kalimantan <span className="font-semibold text-[#2A2A2A] dark:text-white">(50%)</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#184190] dark:bg-[#FAA300]"></div>
            <span className="font-jakarta text-[11px] md:text-[12px] text-[#888888] dark:text-gray-400">
              Bali <span className="font-semibold text-[#2A2A2A] dark:text-white">(65%)</span>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-[220px] md:h-[249px] relative rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-100">
        <img src="/assets/map.png" alt="Indonesia Map" className="w-full h-full object-cover" />
        <div className="absolute w-3 md:w-4 h-3 md:h-4 bg-[#BCF328] dark:bg-[#9DD909] rounded-full border-2 border-white shadow-lg" style={{ top: '72%', left: '32%' }}></div>
        <div className="absolute w-3 md:w-4 h-3 md:h-4 bg-[#1A71F6] dark:bg-[#FF1F1F] rounded-full border-2 border-white shadow-lg" style={{ top: '42%', left: '42%' }}></div>
        <div className="absolute w-3 md:w-4 h-3 md:h-4 bg-[#184190] dark:bg-[#FAA300] rounded-full border-2 border-white shadow-lg" style={{ top: '78%', left: '42%' }}></div>
      </div>
    </div>
  );
};

export default CustomerGrowth;