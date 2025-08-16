import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KPICard from './components/KPICard';
import EmergencyBookingManager from './components/EmergencyBookingManager';
import SystemAlertsPanel from './components/SystemAlertsPanel';
import AnalyticsChart from './components/AnalyticsChart';
import UserManagementSection from './components/UserManagementSection';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('operational');

  useEffect(() => {
    // Check admin authentication
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/login-registration');
      return;
    }

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  const kpiData = [
    {
      title: 'Daily Appointments',
      value: '28',
      change: '+12%',
      changeType: 'positive',
      icon: 'Calendar',
      color: 'primary'
    },
    {
      title: 'Machine Utilization',
      value: '86%',
      change: '+3%',
      changeType: 'positive',
      icon: 'Activity',
      color: 'success'
    },
    {
      title: 'Daily Revenue',
      value: '₹56,000',
      change: '+8%',
      changeType: 'positive',
      icon: 'IndianRupee',
      color: 'success'
    },
    {
      title: 'Patient Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      changeType: 'positive',
      icon: 'Star',
      color: 'warning'
    }
  ];

  const quickActions = [
    {
      title: 'Emergency Booking',
      description: 'Handle urgent appointment requests',
      icon: 'AlertTriangle',
      color: 'error',
      action: () => console.log('Emergency booking')
    },
    {
      title: 'System Backup',
      description: 'Initiate data backup process',
      icon: 'Database',
      color: 'primary',
      action: () => console.log('System backup')
    },
    {
      title: 'Generate Reports',
      description: 'Create operational reports',
      icon: 'FileText',
      color: 'accent',
      action: () => console.log('Generate reports')
    },
    {
      title: 'Broadcast Alert',
      description: 'Send system-wide notifications',
      icon: 'Megaphone',
      color: 'warning',
      action: () => console.log('Broadcast alert')
    }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumb />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">System Operational</span>
                </div>
                <Button variant="default" iconName="RefreshCw">
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                color={kpi?.color}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions?.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={action?.action}
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-muted/50"
                >
                  <div className={`p-3 rounded-lg ${
                    action?.color === 'error' ? 'bg-error/10 text-error' :
                    action?.color === 'primary' ? 'bg-primary/10 text-primary' :
                    action?.color === 'accent'? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'
                  }`}>
                    <Icon name={action?.icon} size={24} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-foreground">{action?.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{action?.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Emergency Booking Manager - Full Width on Mobile, 2 columns on Desktop */}
            <div className="lg:col-span-2">
              <EmergencyBookingManager />
            </div>
            
            {/* System Alerts Panel */}
            <div className="lg:col-span-1">
              <SystemAlertsPanel />
            </div>
          </div>

          {/* Analytics and User Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <AnalyticsChart />
            <UserManagementSection />
          </div>

          {/* System Information Footer */}
          <div className="bg-card border border-border rounded-lg p-6 clinical-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon name="Server" size={20} className="text-primary mr-2" />
                  <h3 className="font-semibold text-foreground">System Health</h3>
                </div>
                <p className="text-2xl font-bold text-success">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon name="Users" size={20} className="text-accent mr-2" />
                  <h3 className="font-semibold text-foreground">Active Users</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">247</p>
                <p className="text-sm text-muted-foreground">Currently Online</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon name="Database" size={20} className="text-warning mr-2" />
                  <h3 className="font-semibold text-foreground">Data Storage</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">2.4TB</p>
                <p className="text-sm text-muted-foreground">Used of 5TB</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;