"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface SalesTargetProps {
  inProgress: number;
  target: number;
}

const SalesTarget = ({ inProgress: initialInProgress, target }: SalesTargetProps) => {
  const [inProgress, setInProgress] = useState(initialInProgress);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const progressPercentage = (inProgress / target) * 100;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(Math.round(num));
  };

  const calculateValue = useCallback((clientX: number) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = (percentage / 100) * target;
    setInProgress(newValue);
  }, [target]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    calculateValue(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      calculateValue(e.clientX);
    };
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [calculateValue]);

  useEffect(() => {
    setInProgress(initialInProgress);
  }, [initialInProgress]);

  return (
    <div className="w-full h-auto md:h-[155px] bg-white dark:bg-[#1A1A1A] rounded-3xl border border-[#E7E7E7] dark:border-[#2A2A2A] p-4 md:p-5 flex flex-col gap-3 md:gap-4">
      <h2 className="font-jakarta font-semibold text-[16px] leading-[130%] text-[#454545] dark:text-white">
        Sales Target
      </h2>
      <div className="w-full h-auto md:h-[42px] flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-jakarta text-sm text-[#888888] dark:text-gray-400">In Progress</span>
          <span className="font-jakarta font-semibold text-[16px] md:text-[18px] text-[#2A2A2A] dark:text-white">
            ${formatNumber(inProgress)}
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="font-jakarta text-sm text-[#888888] dark:text-gray-400">Sales Target</span>
          <span className="font-jakarta font-semibold text-[16px] md:text-[18px] text-[#2A2A2A] dark:text-white">
            ${formatNumber(target)}
          </span>
        </div>
      </div>
      <div 
        ref={progressBarRef}
        className="w-full h-5 rounded-[30px] bg-[#E7E7E7] dark:bg-[#2A2A2A] relative cursor-pointer"
        onClick={(e) => calculateValue(e.clientX)}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-[30px] bg-[#2F80ED]"
          style={{ width: `${progressPercentage}%` }}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#C4C4C4] dark:bg-gray-400 rounded-full shadow-md border-2 border-white dark:border-[#1A1A1A] ${
            isDragging ? 'scale-110 cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ left: `calc(${progressPercentage}% - 10px)` }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default SalesTarget;