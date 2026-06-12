const mockDashboardData = {
  salesTarget: { inProgress: 231032444, target: 500000000 },
  salesChart: [
    { month: 'Jan', avg_sale_value: 180000000, avg_item_per_sale: 200000000 },
    { month: 'Feb', avg_sale_value: 220000000, avg_item_per_sale: 210000000 },
    { month: 'Mar', avg_sale_value: 280000000, avg_item_per_sale: 240000000 },
    { month: 'Apr', avg_sale_value: 260000000, avg_item_per_sale: 250000000 },
    { month: 'May', avg_sale_value: 300000000, avg_item_per_sale: 270000000 },
    { month: 'Jun', avg_sale_value: 290000000, avg_item_per_sale: 280000000 },
    { month: 'Jul', avg_sale_value: 339091888, avg_item_per_sale: 310000000 },
    { month: 'Aug', avg_sale_value: 320000000, avg_item_per_sale: 330000000 },
    { month: 'Sep', avg_sale_value: 350000000, avg_item_per_sale: 340000000 },
    { month: 'Oct', avg_sale_value: 340000000, avg_item_per_sale: 360000000 },
    { month: 'Nov', avg_sale_value: 370000000, avg_item_per_sale: 355000000 },
    { month: 'Dec', avg_sale_value: 380000000, avg_item_per_sale: 370000000 },
  ],
  stats: {
    totalRevenue: { value: 81000, change: 10.6, direction: 'up' as const },
    totalCustomer: { value: 5000, change: 1.5, direction: 'up' as const },
    totalTransactions: { value: 12000, change: 3.6, direction: 'up' as const },
    totalProduct: { value: 5000, change: 1.5, direction: 'down' as const },
  },
  customerGrowth: {
    provinces: [
      { name: 'East Java', percentage: 50, color: '#BCF328', coordinates: { top: '72%', left: '32%' } },
      { name: 'Kalimantan', percentage: 50, color: '#1A71F6', coordinates: { top: '42%', left: '42%' } },
      { name: 'Bali', percentage: 65, color: '#184190', coordinates: { top: '78%', left: '42%' } },
    ],
  },
  products: [
    { id: '021231', name: 'Kanky Kitadakate (Green)', price: 20.00, sales: 3000, status: 'Success', image: '/assets/shoes.png' },
    { id: '021232', name: 'Kanky Kitadakate (Blue)', price: 22.00, sales: 2311, status: 'Success', image: '/assets/shoes.png' },
    { id: '021233', name: 'Kanky Kitadakate (Red)', price: 19.00, sales: 2111, status: 'Success', image: '/assets/shoes.png' },
    { id: '021234', name: 'Kanky Kitadakate (Black)', price: 25.00, sales: 1661, status: 'Success', image: '/assets/shoes.png' },
  ],
};

const mockMessages = [
  { id: 1, title: 'Special Product Discount', description: '20% discount on new Kanky Kitadakate shoes', time: '5 minutes ago', isRead: false },
  { id: 2, title: 'Product Discount', description: '15% discount on new season backpacks', time: '1 hour ago', isRead: false },
];

const mockNotifications = [
  { id: 1, name: 'Sarah Johnson', action: 'started following you', time: '2 minutes ago', isRead: false },
  { id: 2, name: 'Michael Chen', action: 'started following you', time: '15 minutes ago', isRead: false },
  { id: 3, name: 'Emma Wilson', action: 'started following you', time: '1 hour ago', isRead: false },
  { id: 4, name: 'James Rodriguez', action: 'started following you', time: '2 hours ago', isRead: false },
  { id: 5, name: 'Olivia Martinez', action: 'started following you', time: '3 hours ago', isRead: false },
  { id: 6, name: 'William Brown', action: 'started following you', time: '5 hours ago', isRead: false },
  { id: 7, name: 'Sophia Taylor', action: 'started following you', time: '8 hours ago', isRead: false },
  { id: 8, name: 'Benjamin Lee', action: 'started following you', time: '1 day ago', isRead: false },
];

export const api = {
  getDashboardData: async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockDashboardData;
  },

  getSalesTarget: async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return { inProgress: mockDashboardData.salesTarget.inProgress, target: mockDashboardData.salesTarget.target };
  },
  updateSalesTarget: async (data: Partial<SalesTargetData>) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return { ...mockDashboardData.salesTarget, ...data };
  },

  getSalesChart: async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return mockDashboardData.salesChart;
  },

  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return mockDashboardData.stats;
  },

  getCustomerGrowth: async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return mockDashboardData.customerGrowth;
  },

  getProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return mockDashboardData.products;
  },

  getMessages: async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return mockMessages;
  },
  markMessageAsRead: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return mockMessages.find(m => m.id === id) || mockMessages[0];
  },

  getNotifications: async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return mockNotifications;
  },
  markNotificationAsRead: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return mockNotifications.find(n => n.id === id) || mockNotifications[0];
  },
};

export interface DashboardData {
  salesTarget: { inProgress: number; target: number };
  salesChart: Array<{ month: string; avg_sale_value: number; avg_item_per_sale: number }>;
  stats: {
    totalRevenue: { value: number; change: number; direction: 'up' | 'down' };
    totalCustomer: { value: number; change: number; direction: 'up' | 'down' };
    totalTransactions: { value: number; change: number; direction: 'up' | 'down' };
    totalProduct: { value: number; change: number; direction: 'up' | 'down' };
  };
  customerGrowth: {
    provinces: Array<{ name: string; percentage: number; color: string; coordinates: { top: string; left: string } }>;
  };
  products: Array<{ id: string; name: string; price: number; sales: number; status: string; image: string }>;
}

export interface SalesTargetData {
  inProgress: number;
  target: number;
}

export interface SalesChartData {
  month: string;
  avg_sale_value: number;
  avg_item_per_sale: number;
}

export interface StatsData {
  totalRevenue: { value: number; change: number; direction: 'up' | 'down' };
  totalCustomer: { value: number; change: number; direction: 'up' | 'down' };
  totalTransactions: { value: number; change: number; direction: 'up' | 'down' };
  totalProduct: { value: number; change: number; direction: 'up' | 'down' };
}

export interface CustomerGrowthData {
  provinces: Array<{ name: string; percentage: number; color: string; coordinates: { top: string; left: string } }>;
}

export interface ProductData {
  id: string;
  name: string;
  price: number;
  sales: number;
  status: string;
  image: string;
}

export interface MessageData {
  id: number;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

export interface NotificationData {
  id: number;
  name: string;
  action: string;
  time: string;
  isRead: boolean;
}