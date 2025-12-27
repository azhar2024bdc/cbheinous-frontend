"use client";

import { DatePicker } from 'antd';
import React, { JSX, useState } from 'react';
import { useGetRevenueStatQuery } from '@/redux/features/auth/authApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import dayjs from 'dayjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ChartDataPoint {
  month: string;
  sponsor: number;
  individual: number;
  quickSupport: number;
}

interface ApiGraphData {
  month: string;
  sponsor: number;
  individual: number;
  quickSupport: number;
}

interface ApiResponse {
  totalRevenue: number;
  newSupporter: number;
  newBrand: number;
  graph: ApiGraphData[];
}

export default function RealChart(): JSX.Element {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const { isLoading, data: chartData } = useGetRevenueStatQuery(selectedYear);
  
  // Fake data for demonstration
  const fakeData: ChartDataPoint[] = [
    { month: 'Jan', sponsor: 12, individual: 18, quickSupport: 8 },
    { month: 'Feb', sponsor: 15, individual: 12, quickSupport: 10 },
    { month: 'Mar', sponsor: 18, individual: 15, quickSupport: 12 },
    { month: 'Apr', sponsor: 14, individual: 20, quickSupport: 9 },
    { month: 'May', sponsor: 20, individual: 18, quickSupport: 15 },
    { month: 'Jun', sponsor: 22, individual: 30, quickSupport: 17 },
    { month: 'Jul', sponsor: 25, individual: 32, quickSupport: 18 },
    { month: 'Aug', sponsor: 23, individual: 19, quickSupport: 16 },
    { month: 'Sep', sponsor: 26, individual: 33, quickSupport: 19 },
    { month: 'Oct', sponsor: 28, individual: 35, quickSupport: 20 },
    { month: 'Nov', sponsor: 30, individual: 38, quickSupport: 22 },
    { month: 'Dec', sponsor: 32, individual: 100, quickSupport: 24 },
  ];

  const apiData: ApiResponse | undefined = chartData?.data;
  const data: ChartDataPoint[] =fakeData || apiData?.graph ;
  const totalRevenue: number = apiData?.totalRevenue || 125847.50;
  const newSupporter: number = apiData?.newSupporter || 342;
  const newBrand: number = apiData?.newBrand || 28;

  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const maxValue = Math.max(
    ...data.map(item => Math.max(item.sponsor, item.individual, item.quickSupport)),
    0
  );
  const yAxisMax = Math.ceil(maxValue / 10) * 10 || 30;

  // Handle year change
  const handleYearChange = (date: any, dateString: string | string[]) => {
    const year = typeof dateString === 'string' ? Number(dateString) : Number(dateString[0]);
    if (!isNaN(year)) {
      setSelectedYear(year);
    }
  };

  // Chart.js data configuration
  const chartJsData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Sponsor',
        data: data.map(item => item.sponsor),
        borderColor: '#3B82F6',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#3B82F6',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Individual',
        data: data.map(item => item.individual),
        borderColor: '#F59E0B',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(245, 158, 11, 0.3)');
          gradient.addColorStop(1, 'rgba(245, 158, 11, 0.05)');
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#F59E0B',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Quick Support',
        data: data.map(item => item.quickSupport),
        borderColor: '#10B981',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#10B981',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  // Chart.js options
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}k`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        min: 0,
        max: yAxisMax,
        grid: {
          color: '#E5E7EB',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: function(value) {
            return `${value}k`;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  // Error state
  // if (error) {
  //   return (
  //     <div className="bg-gray-50 p-6 rounded-2xl">
  //       <div className="text-center py-12">
  //         <p className="text-red-600">Error loading revenue data. Please try again.</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton width={200} height={30} className="mb-2" />
            <Skeleton width={150} height={20} />
          </div>
          <Skeleton width={120} height={40} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          {/* Left Stats */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <Skeleton width={150} height={40} className="mb-1" />
              <Skeleton width={100} height={20} />
            </div>
            <div>
              <Skeleton width={100} height={32} className="mb-1" />
              <Skeleton width={120} height={20} />
            </div>
            <div>
              <Skeleton width={80} height={32} className="mb-1" />
              <Skeleton width={110} height={20} />
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-3">
            <div className="h-96">
              <Skeleton height="100%" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <div className="">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard</h1>
            <p className="text-gray-500 text-sm">Overview of Latest Month</p>
          </div>
          
          <DatePicker 
            onChange={handleYearChange} 
            picker="year" 
            defaultValue={dayjs().year(selectedYear)}
            className="w-32 h-10"
          />
        </div>

        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
            {/* Left Stats */}
            <div className="lg:col-span-1 space-y-8">
              {/* Total Revenue */}
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {formatCurrency(totalRevenue)}
                </div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>

              {/* New Supporter Join */}
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {newSupporter}
                </div>
                <div className="text-sm text-gray-500">New Supporter Join</div>
              </div>

              {/* New Brand Join */}
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {String(newBrand).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-500">New Brand Join</div>
              </div>
            </div>

            {/* Chart */}
            <div className="lg:col-span-3">
              <div className="h-96">
                <Line data={chartJsData} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}