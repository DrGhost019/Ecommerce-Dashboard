export interface SalesTarget {
  in_progress: number;
  target: number;
  progress_percentage: number;
}

export interface StatItem {
  value: number;
  change_percentage: number;
  change_direction: "up" | "down";
  period: string;
}

export interface Stats {
  total_revenue: StatItem;
  total_customers: StatItem;
  total_transactions: StatItem;
  total_products: StatItem;
}

export interface ChartDataPoint {
  month: string;
  avg_sale_value: number;
  avg_item_per_sale: number;
}

export interface SalesChart {
  title: string;
  summary: {
    average_item_per_sale: number;
    average_sale_value: number;
  };
  series: {
    label: string;
    color: string;
  }[];
  data: ChartDataPoint[];
}

export interface CustomerGrowth {
  province: string;
  growth_percentage: number;
}

export interface PopularProduct {
  id: string;
  name: string;
  price: number;
  sales: number;
  status: string;
}

export interface DashboardData {
  dashboard: {
    sales_target: SalesTarget;
    stats: Stats;
    sales_chart: SalesChart;
    customer_growth_by_province: CustomerGrowth[];
    popular_products: PopularProduct[];
  };
}