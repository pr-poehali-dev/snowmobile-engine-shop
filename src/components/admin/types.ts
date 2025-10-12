export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  fullName: string;
  phone: string;
  city: string;
  totalPrice: number;
  totalItems: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  createdAt: string;
  status: string;
}

export interface Stats {
  overview: {
    totalOrders: number;
    totalRevenue: number;
    totalItems: number;
    avgOrderValue: number;
  };
  statusBreakdown: Array<{ status: string; count: number }>;
  topCities: Array<{ city: string; orders: number; revenue: number }>;
  topProducts: Array<{ name: string; quantity: number; revenue: number }>;
  dailyStats: Array<{ date: string; orders: number; revenue: number }>;
}
