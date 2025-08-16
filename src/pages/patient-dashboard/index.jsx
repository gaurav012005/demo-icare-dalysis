import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UpcomingAppointmentCard from './components/UpcomingAppointmentCard';
import QuickActionsCard from './components/QuickActionsCard';
import MedicalSummaryCard from './components/MedicalSummaryCard';
import PaymentHistoryCard from './components/PaymentHistoryCard';
import HealthMetricsCard from './components/HealthMetricsCard';
import NotificationCenter from './components/NotificationCenter';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [patientInfo, setPatientInfo] = useState({
    name: 'John Doe',
    id: 'PAT-2025-001',
    nextAppointment: '2025-08-17 10:00 AM',
    treatmentPlan: 'Regular Dialysis - 3x/week'
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'patient') {
      navigate('/login-registration');
      return;
    }

    // Update current time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timeInterval);
  }, [navigate]);

  const formatCurrentTime = () => {
    return currentTime?.toLocaleString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  const handleEmergencyCall = () => {
    console.log('Emergency call initiated');
    // In real app, this would initiate emergency protocols
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumb />
      <main className="pt-4 pb-8 px-4 lg:px-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {patientInfo?.name}
              </h1>
              <p className="text-muted-foreground">
                Patient ID: {patientInfo?.id} • {formatCurrentTime()}
              </p>
            </div>
            
            {/* Emergency Button */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm text-muted-foreground">Next Appointment</p>
                <p className="font-medium text-foreground">{patientInfo?.nextAppointment}</p>
              </div>
              <Button
                variant="destructive"
                iconName="Phone"
                iconPosition="left"
                onClick={handleEmergencyCall}
                className="bg-error hover:bg-error/90"
              >
                Emergency
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Upcoming Appointment */}
            <UpcomingAppointmentCard />
            
            {/* Health Metrics */}
            <HealthMetricsCard />
            
            {/* Medical Records Summary */}
            <MedicalSummaryCard />
            
            {/* Payment History */}
            <PaymentHistoryCard />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions */}
            <QuickActionsCard />
            
            {/* Notifications */}
            <NotificationCenter />
            
            {/* Treatment Plan Summary */}
            <div className="bg-card rounded-lg border border-border clinical-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Treatment Plan</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="Calendar" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Regular Dialysis</p>
                      <p className="text-sm text-muted-foreground">3 sessions per week</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon name="Clock" size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Session Duration</p>
                      <p className="text-sm text-muted-foreground">4 hours each</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Icon name="User" size={16} className="text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Primary Doctor</p>
                      <p className="text-sm text-muted-foreground">Dr. Rajesh Kumar</p>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="FileText"
                  iconPosition="left"
                  onClick={() => console.log('View full treatment plan')}
                  className="mt-4"
                >
                  View Full Plan
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card rounded-lg border border-border clinical-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Center</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Phone"
                    iconPosition="left"
                    onClick={() => console.log('Call center')}
                  >
                    Call Center
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => console.log('Chat support')}
                  >
                    Chat Support
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Mail"
                    iconPosition="left"
                    onClick={() => console.log('Email support')}
                  >
                    Email Support
                  </Button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Emergency Hotline: +91-9876543210
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    Available 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Mobile Navigation (Mobile Only) */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border lg:hidden">
          <div className="grid grid-cols-4 gap-1 p-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Home"
              onClick={() => navigate('/patient-dashboard')}
              className="flex-col h-auto py-2 text-primary"
            >
              <span className="text-xs mt-1">Home</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Calendar"
              onClick={() => navigate('/appointment-booking')}
              className="flex-col h-auto py-2"
            >
              <span className="text-xs mt-1">Appointments</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="FileText"
              onClick={() => navigate('/medical-records')}
              className="flex-col h-auto py-2"
            >
              <span className="text-xs mt-1">Records</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Clock"
              onClick={() => navigate('/real-time-queue-management')}
              className="flex-col h-auto py-2"
            >
              <span className="text-xs mt-1">Queue</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;