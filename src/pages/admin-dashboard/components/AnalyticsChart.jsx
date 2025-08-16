import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsChart = () => {
  const [activeChart, setActiveChart] = useState('appointments');
  const [timeRange, setTimeRange] = useState('7days');

  const appointmentData = [
    { name: 'Mon', appointments: 24, revenue: 48000 },
    { name: 'Tue', appointments: 28, revenue: 56000 },
    { name: 'Wed', appointments: 22, revenue: 44000 },
    { name: 'Thu', appointments: 26, revenue: 52000 },
    { name: 'Fri', appointments: 30, revenue: 60000 },
    { name: 'Sat', appointments: 18, revenue: 36000 },
    { name: 'Sun', appointments: 16, revenue: 32000 }
  ];

  const revenueData = [
    { name: 'Week 1', revenue: 280000, target: 300000 },
    { name: 'Week 2', revenue: 320000, target: 300000 },
    { name: 'Week 3', revenue: 295000, target: 300000 },
    { name: 'Week 4', revenue: 340000, target: 300000 }
  ];

  const machineUtilizationData = [
    { name: 'Machine 1', value: 85, color: '#2563EB' },
    { name: 'Machine 2', value: 92, color: '#059669' },
    { name: 'Machine 3', value: 78, color: '#F59E0B' },
    { name: 'Machine 4', value: 88, color: '#EF4444' }
  ];

  const chartOptions = [
    { value: 'appointments', label: 'Daily Appointments' },
    { value: 'revenue', label: 'Revenue Trends' },
    { value: 'utilization', label: 'Machine Utilization' }
  ];

  const timeRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(value);
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'appointments':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="appointments" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'revenue':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" />
              <YAxis stroke="#64748B" tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Revenue']}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} />
              <Line type="monotone" dataKey="target" stroke="#F59E0B" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'utilization':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={machineUtilizationData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {machineUtilizationData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg clinical-shadow h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 text-accent rounded-lg">
              <Icon name="BarChart3" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Analytics Dashboard</h3>
              <p className="text-sm text-muted-foreground">Performance metrics and trends</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Select
            options={chartOptions}
            value={activeChart}
            onChange={setActiveChart}
            className="w-48"
          />
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
        </div>
      </div>

      <div className="p-6">
        {renderChart()}
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <h4 className="text-lg font-semibold text-foreground">164</h4>
            <p className="text-sm text-muted-foreground">Total Appointments</p>
            <div className="flex items-center justify-center mt-1">
              <Icon name="TrendingUp" size={14} className="text-success mr-1" />
              <span className="text-xs text-success">+12%</span>
            </div>
          </div>
          
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <h4 className="text-lg font-semibold text-foreground">₹3,28,000</h4>
            <p className="text-sm text-muted-foreground">Weekly Revenue</p>
            <div className="flex items-center justify-center mt-1">
              <Icon name="TrendingUp" size={14} className="text-success mr-1" />
              <span className="text-xs text-success">+8%</span>
            </div>
          </div>
          
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <h4 className="text-lg font-semibold text-foreground">86%</h4>
            <p className="text-sm text-muted-foreground">Avg. Utilization</p>
            <div className="flex items-center justify-center mt-1">
              <Icon name="TrendingUp" size={14} className="text-success mr-1" />
              <span className="text-xs text-success">+3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;