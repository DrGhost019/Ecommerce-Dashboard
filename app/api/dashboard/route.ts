import { NextResponse } from 'next/server';

const mockDashboardData = {
  salesTarget: { inProgress: 231032444, target: 500000000 },
  salesChart: [ /* ... Same as previous data... */ ],
  stats: {
    totalRevenue: { value: 81000, change: 10.6, direction: 'up' },
    totalCustomer: { value: 5000, change: 1.5, direction: 'up' },
    totalTransactions: { value: 12000, change: 3.6, direction: 'up' },
    totalProduct: { value: 5000, change: 1.5, direction: 'down' },
  },
  customerGrowth: { provinces: [ /* ... */ ] },
  products: [ /* ... */ ],
};

export async function GET() {
  console.log('✅ GET /api/dashboard called');
  await new Promise(resolve => setTimeout(resolve, 100)); 
  return NextResponse.json(mockDashboardData);
}