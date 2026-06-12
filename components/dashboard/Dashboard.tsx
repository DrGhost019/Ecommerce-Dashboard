"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import SalesTarget from './SalesTarget';
import TotalRevenue from './TotalRevenue';
import StatCard from './StatCard';
import SalesChart from './SalesChart';
import IncreaseSalesBanner from './IncreaseSalesBanner';
import CustomerGrowth from './CustomerGrowth';
import ProductPopular from './ProductPopular';

interface DashboardData {
  salesTarget: {
    inProgress: number;
    target: number;
  };
  salesChart: Array<{
    month: string;
    avg_sale_value: number;
    avg_item_per_sale: number;
  }>;
  stats: {
    totalRevenue: {
      value: number;
      change: number;
      direction: 'up' | 'down';
    };
    totalCustomer: {
      value: number;
      change: number;
      direction: 'up' | 'down';
    };
    totalTransactions: {
      value: number;
      change: number;
      direction: 'up' | 'down';
    };
    totalProduct: {
      value: number;
      change: number;
      direction: 'up' | 'down';
    };
  };
  customerGrowth: {
    provinces: Array<{
      name: string;
      percentage: number;
      color: string;
      coordinates: { top: string; left: string };
    }>;
  };
  products: Array<{
    id: string;
    name: string;
    price: number;
    sales: number;
    status: string;
    image: string;
  }>;
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching dashboard data...');
        const dashboardData = await api.getDashboardData();
        setData(dashboardData as DashboardData);
        console.log('Dashboard data received:', dashboardData);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A71F6]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold mb-2">Error</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#1A71F6] text-white rounded-lg hover:bg-[#1565D8] transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full p-4 md:p-8 bg-gray-50/80 dark:bg-[#0F0F0F]/80 min-h-screen backdrop-blur-[1px]">
      <div className="flex flex-col gap-2 mb-6 md:mb-8">
        <h1 className="font-jakarta font-semibold text-[24px] leading-[130%] text-[#2A2A2A] dark:text-white">Dashboard</h1>
        <p className="font-jakarta font-normal text-[14px] leading-[150%] text-[#888888] dark:text-gray-400">Dashboard</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-1 md:col-span-7">
          <SalesTarget inProgress={data.salesTarget.inProgress} target={data.salesTarget.target} />
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-3 md:gap-4 md:col-span-5">
          <TotalRevenue value={data.stats.totalRevenue.value} change={data.stats.totalRevenue.change} direction={data.stats.totalRevenue.direction} />
          <StatCard
            title="Total Customer"
            value={data.stats.totalCustomer.value.toLocaleString()}
            changePercentage={data.stats.totalCustomer.change}
            changeDirection={data.stats.totalCustomer.direction}
            period="From last week"
            bgColor="#FFFFFF"
            textColor="#454545"
            valueColor="#1A71F6"
            darkBgColor="#1A1A1B"
            darkTextColor="#FFFFFF"
            darkValueColor="#1A71F6"
          />
        </div>
        <div className="col-span-1 md:col-span-7">
          <SalesChart data={data.salesChart} />
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-3 md:gap-4 md:col-span-5">
          <StatCard
            title="Total Transactions"
            value={data.stats.totalTransactions.value.toLocaleString()}
            changePercentage={data.stats.totalTransactions.change}
            changeDirection={data.stats.totalTransactions.direction}
            period="From last week"
            bgColor="#FFFFFF"
            textColor="#454545"
            valueColor="#1A71F6"
            darkBgColor="#1A1A1B"
            darkTextColor="#FFFFFF"
            darkValueColor="#1A71F6"
          />
          <StatCard
            title="Total Product"
            value={data.stats.totalProduct.value.toLocaleString()}
            changePercentage={data.stats.totalProduct.change}
            changeDirection={data.stats.totalProduct.direction}
            period="From last week"
            bgColor="#FFFFFF"
            textColor="#454545"
            valueColor="#1A71F6"
            darkBgColor="#1A1A1B"
            darkTextColor="#FFFFFF"
            darkValueColor="#1A71F6"
          />
          <div className="col-span-2"><IncreaseSalesBanner /></div>
        </div>
        <div className="col-span-1 md:col-span-5">
          <CustomerGrowth data={data.customerGrowth} />
        </div>
        <div className="col-span-1 md:col-span-7">
          <ProductPopular products={data.products} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;