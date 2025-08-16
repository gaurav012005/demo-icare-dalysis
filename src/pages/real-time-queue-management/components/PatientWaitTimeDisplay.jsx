import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientWaitTimeDisplay = ({ currentUser, queueData, onNotificationToggle }) => {
  const [personalizedData, setPersonalizedData] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Simulate fetching personalized queue data
    const mockPersonalizedData = {
      queuePosition: 3,
      estimatedWaitTime: '45 minutes',
      treatmentStartTime: '14:30',
      machineNumber: 5,
      doctorName: 'Dr. Rajesh Kumar',
      appointmentTime: '14:00',
      treatmentDuration: '4 hours',
      lastUpdated: new Date()?.toLocaleTimeString()
    };

    setPersonalizedData(mockPersonalizedData);
    setNotificationsEnabled(localStorage.getItem('queueNotifications') === 'true');
  }, [currentUser]);

  const handleNotificationToggle = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem('queueNotifications', newState?.toString());
    onNotificationToggle(newState);
  };

  const getWaitTimeColor = (waitTime) => {
    const minutes = parseInt(waitTime);
    if (minutes <= 15) return 'text-green-600';
    if (minutes <= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPositionColor = (position) => {
    if (position <= 2) return 'text-green-600';
    if (position <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!personalizedData) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 clinical-shadow animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg clinical-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Your Queue Status</h2>
              <p className="text-sm text-muted-foreground">
                Last updated: {personalizedData?.lastUpdated}
              </p>
            </div>
          </div>
          <Button
            variant={notificationsEnabled ? "default" : "outline"}
            size="sm"
            onClick={handleNotificationToggle}
            iconName={notificationsEnabled ? "Bell" : "BellOff"}
            iconPosition="left"
          >
            {notificationsEnabled ? "Notifications On" : "Enable Notifications"}
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Hash" size={24} className="text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Queue Position</p>
            <p className={`text-3xl font-bold ${getPositionColor(personalizedData?.queuePosition)}`}>
              #{personalizedData?.queuePosition}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-orange-600" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Estimated Wait</p>
            <p className={`text-3xl font-bold ${getWaitTimeColor(personalizedData?.estimatedWaitTime)}`}>
              {personalizedData?.estimatedWaitTime}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <Icon name="Calendar" size={24} className="text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Treatment Start</p>
            <p className="text-3xl font-bold text-green-600">
              {personalizedData?.treatmentStartTime}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Monitor" size={20} className="text-muted-foreground" />
              <h3 className="font-medium text-foreground">Machine Assignment</h3>
            </div>
            <p className="text-lg font-semibold text-foreground">
              Machine #{personalizedData?.machineNumber}
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="UserCheck" size={20} className="text-muted-foreground" />
              <h3 className="font-medium text-foreground">Attending Doctor</h3>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {personalizedData?.doctorName}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">Appointment Details</h4>
              <div className="text-sm text-blue-600 space-y-1">
                <p>Scheduled Time: {personalizedData?.appointmentTime}</p>
                <p>Treatment Duration: {personalizedData?.treatmentDuration}</p>
                <p>Please arrive 15 minutes before your scheduled time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Queue Progress</h4>
          <div className="relative">
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(10, (10 - personalizedData?.queuePosition) * 10)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Waiting</span>
              <span>Your Turn</span>
            </div>
          </div>
        </div>

        {notificationsEnabled && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-green-600" />
              <div>
                <h4 className="text-sm font-medium text-green-800">Notifications Enabled</h4>
                <p className="text-xs text-green-600">
                  You'll receive SMS updates about queue changes and when it's your turn
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientWaitTimeDisplay;