"use client";

import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, ArrowUpDown, Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  sales: number;
  status: string;
  image?: string;
}

interface ProductPopularProps {
  products: Product[];
}

const ProductPopular = ({ products }: ProductPopularProps) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-auto md:h-[396px] bg-white dark:bg-[#1A1A1A] rounded-3xl border border-[#E7E7E7] dark:border-[#2A2A2A] p-4 md:p-5 flex flex-col" style={{ gap: '20px' }}>
      <div className="flex justify-between items-center">
        <h2 className="font-jakarta font-semibold text-[16px] leading-[130%] text-[#2A2A2A] dark:text-white">
          Product Popular
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

      <div className="flex-1 rounded-2xl border border-[#E7E7E7] dark:border-[#2A2A2A] overflow-hidden flex flex-col">
        <div className="w-full h-[46px] bg-[#F6F6F6] dark:bg-[#2A2A2A] border-b border-[#E7E7E7] dark:border-[#3A3A3A] flex items-center px-4 shrink-0">
          <div className="flex-1 flex flex-col items-start justify-center">
            <span className="font-jakarta text-xs md:text-sm font-semibold text-[#2A2A2A] dark:text-white">Product</span>
            <ArrowUpDown className="w-3 h-3 text-gray-400 mt-0.5" />
          </div>
          <div className="w-[80px] md:w-[100px] flex flex-col items-center justify-center">
            <span className="font-jakarta text-xs md:text-sm font-semibold text-[#2A2A2A] dark:text-white">Price</span>
            <ArrowUpDown className="w-3 h-3 text-gray-400 mt-0.5" />
          </div>
          <div className="w-[60px] md:w-[100px] flex flex-col items-center justify-center">
            <span className="font-jakarta text-xs md:text-sm font-semibold text-[#2A2A2A] dark:text-white">Sales</span>
            <Filter className="w-3 h-3 text-gray-400 mt-0.5" />
          </div>
          <div className="w-[70px] md:w-[100px] flex flex-col items-center justify-center">
            <span className="font-jakarta text-xs md:text-sm font-semibold text-[#2A2A2A] dark:text-white">Status</span>
            <Filter className="w-3 h-3 text-gray-400 mt-0.5" />
          </div>
          <div className="w-[40px]"></div>
        </div>

        <div className="flex-1 overflow-y-auto custom-table-scrollbar">
          {products.map((product, index) => (
            <div key={product.id || index} className="w-full border-b border-[#E7E7E7] dark:border-[#2A2A2A] last:border-b-0">
              <div 
                className="w-full h-[60px] flex items-center px-4 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] cursor-pointer transition"
                onClick={() => setExpandedRow(expandedRow === index ? null : index)}
              >
                <div className="flex-1 flex items-center gap-2 md:gap-3">
                  <img 
                    src={product.image || "/assets/shoes.png"} 
                    alt={product.name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover bg-gray-100 dark:bg-[#2A2A2A]"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-jakarta text-[10px] md:text-xs text-[#1A71F6]">{product.id}</span>
                    <span className="font-jakarta text-xs md:text-sm text-[#2A2A2A] dark:text-white truncate">{product.name}</span>
                  </div>
                </div>
                <div className="w-[80px] md:w-[100px] flex justify-center">
                  <span className="font-jakarta text-xs md:text-sm text-[#2A2A2A] dark:text-white">${product.price.toFixed(2)}</span>
                </div>
                <div className="w-[60px] md:w-[100px] flex justify-center">
                  <span className="font-jakarta text-xs md:text-sm text-[#2A2A2A] dark:text-white">{product.sales}</span>
                </div>
                <div className="w-[70px] md:w-[100px] flex justify-center">
                  <span className="inline-block px-2 md:px-3 py-1 bg-[#BCF328]/30 dark:bg-[#BCF328]/20 text-[#2A2A2A] dark:text-white text-[10px] md:text-xs font-medium rounded-full">
                    {product.status}
                  </span>
                </div>
                <div className="w-[40px] flex justify-center">
                  {expandedRow === index ? <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
                </div>
              </div>
              {expandedRow === index && (
                <div className="w-full bg-gray-50 dark:bg-[#2A2A2A] px-4 py-3 border-t border-[#E7E7E7] dark:border-[#3A3A3A]">
                  <div className="flex gap-4 md:gap-8 flex-wrap">
                    <div className="flex flex-col gap-1">
                      <span className="font-jakarta text-xs text-gray-500 dark:text-gray-400">Price</span>
                      <span className="font-jakarta text-sm font-semibold text-[#2A2A2A] dark:text-white">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-jakarta text-xs text-gray-500 dark:text-gray-400">Sales</span>
                      <span className="font-jakarta text-sm font-semibold text-[#2A2A2A] dark:text-white">{product.sales}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-jakarta text-xs text-gray-500 dark:text-gray-400">Status</span>
                      <span className="inline-block px-3 py-1 bg-[#BCF328]/30 dark:bg-[#BCF328]/20 text-[#2A2A2A] dark:text-white text-xs font-medium rounded-full w-fit">
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPopular;