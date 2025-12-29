"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const InfoChart: React.FC = () => {
  const [selectedYear,] = useState('2025');
  const [selectedPeriod,] = useState('Today');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(6); // Default to July (index 6)

  // Sample data for the chart
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const earningsData = [3200, 3500, 3800, 4200, 4500, 4300, 4000, 4800, 4200, 3900, 4400, 4600];
  
  const maxValue = Math.max(...earningsData);
  const minValue = Math.min(...earningsData);
  
  // Normalize data for SVG path (0-100 scale)
  const normalizeValue = (value: number) => {
    const range = maxValue - minValue;
    return 100 - ((value - minValue) / range) * 100;
  };

  // Create SVG path for the area chart
  const createPath = () => {
    const width = 100;
    const step = width / (earningsData.length - 1);
    
    let path = `M 0,${normalizeValue(earningsData[0])}`;
    
    for (let i = 1; i < earningsData.length; i++) {
      const x = i * step;
      const y = normalizeValue(earningsData[i]);
      
      // Create smooth curve
      const prevX = (i - 1) * step;
      const prevY = normalizeValue(earningsData[i - 1]);
      const cpX1 = prevX + step / 3;
      const cpX2 = x - step / 3;
      
      path += ` C ${cpX1},${prevY} ${cpX2},${y} ${x},${y}`;
    }
    
    // Close the path to create area
    path += ` L 100,100 L 0,100 Z`;
    
    return path;
  };

  // Avatar colors
  const avatarColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-yellow-500'
  ];

  return (
    <div className="min-h-screen  ">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-all-side border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Subscription Earnings</h2>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <span>{selectedYear}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Chart Area */}
            <div className="relative">
              {/* Y-axis labels */}
              <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 font-medium">
                <span>5k</span>
                <span>4k</span>
                <span>3k</span>
                <span>2k</span>
                <span>1k</span>
                <span>0</span>
              </div>

              {/* Chart */}
              <div className="ml-8 relative h-64">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  {/* Area gradient */}
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area fill */}
                  <path
                    d={createPath()}
                    fill="url(#areaGradient)"
                    className="transition-all duration-500"
                  />
                  
                  {/* Line stroke */}
                  <path
                    d={createPath().split('L 100,100')[0]}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="0.5"
                    className="transition-all duration-500"
                  />
                </svg>

                {/* Interactive hover areas */}
                {months.map((_, idx) => {
          
                  
                  return (
                    <div
                      key={idx}
                      className="absolute top-0 bottom-0 cursor-pointer"
                      style={{
                        left: `${(idx / (months.length - 1)) * 100}%`,
                        width: `${100 / months.length}%`,
                        transform: 'translateX(-50%)'
                      }}
                      onMouseEnter={() => setHoveredMonth(idx)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    />
                  );
                })}

                {/* Tooltip marker */}
                {hoveredMonth !== null && (
                  <div 
                    className="absolute transform -translate-x-1/2 transition-all duration-200"
                    style={{
                      left: `${(hoveredMonth / (months.length - 1)) * 100}%`,
                      top: `${normalizeValue(earningsData[hoveredMonth])}%`
                    }}
                  >
                    <div className="relative">
                      <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap -translate-y-full -mt-2">
                        {earningsData[hoveredMonth].toLocaleString()}
                      </div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-amber-400" style={{ height: `${100 - normalizeValue(earningsData[hoveredMonth])}%` }}></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 bg-amber-400 rounded-full border-2 border-white"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* X-axis labels */}
              <div className="ml-8 mt-4 flex justify-between text-xs text-gray-400 font-medium">
                {months.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-3xl p-8 shadow-all-side border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-600 font-medium">New Join</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <span>{selectedPeriod}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-2">
              <div className="text-5xl font-bold text-gray-800">150</div>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-green-500 text-sm">↑ 10%</span>
                <span className="text-gray-400 text-sm">today</span>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="text-gray-600 font-medium mb-4">Join Today</h4>
              
              {/* Avatar Stack */}
              <div className="flex items-center">
                {avatarColors.slice(0, 7).map((color, idx) => (
                  <div
                    key={idx}
                    className={`w-10 h-10 rounded-full ${color} border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-white text-sm font-semibold shadow-sm`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-white -ml-2 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                  +24
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoChart;