import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EmergencyBookingManager = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const emergencyRequests = [
    {
      id: 'ER001',
      patientName: 'Rajesh Kumar',
      patientId: 'P12345',
      urgency: 'Critical',
      requestTime: '14:15',
      reason: 'Severe fluid overload, requires immediate dialysis',
      preferredTime: '15:00',
      doctor: 'Dr. Sharma',
      status: 'pending'
    },
    {
      id: 'ER002',
      patientName: 'Priya Patel',
      patientId: 'P12346',
      urgency: 'High',
      requestTime: '13:45',
      reason: 'Missed scheduled session due to emergency',
      preferredTime: '16:30',
      doctor: 'Dr. Mehta',
      status: 'pending'
    }
  ];

  const availableSlots = [
    { value: '15:00', label: '3:00 PM - Machine 1 (Dr. Sharma)' },
    { value: '15:30', label: '3:30 PM - Machine 3 (Dr. Verma)' },
    { value: '16:00', label: '4:00 PM - Machine 2 (Dr. Mehta)' },
    { value: '16:30', label: '4:30 PM - Machine 4 (Dr. Singh)' }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-error text-error-foreground';
      case 'High':
        return 'bg-warning text-warning-foreground';
      case 'Medium':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const handleApproveEmergency = (requestId) => {
    console.log('Approving emergency request:', requestId);
    // In real app, this would trigger AI rescheduling and notifications
  };

  const handleRejectEmergency = (requestId) => {
    console.log('Rejecting emergency request:', requestId);
  };

  return (
    <div className="bg-card border border-border rounded-lg clinical-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-error/10 text-error rounded-lg">
              <Icon name="AlertTriangle" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Emergency Booking Manager</h3>
              <p className="text-sm text-muted-foreground">Manage urgent appointment requests</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
            <Button variant="default" size="sm" iconName="Zap">
              AI Optimize
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search by patient name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="flex-1"
          />
          <Select
            options={[
              { value: 'all', label: 'All Urgency Levels' },
              { value: 'critical', label: 'Critical Only' },
              { value: 'high', label: 'High Priority' }
            ]}
            value="all"
            onChange={() => {}}
            placeholder="Filter by urgency"
          />
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {emergencyRequests?.map((request) => (
            <div key={request?.id} className="border border-border rounded-lg p-4 bg-muted/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col">
                    <h4 className="font-semibold text-foreground">{request?.patientName}</h4>
                    <p className="text-sm text-muted-foreground">ID: {request?.patientId}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request?.urgency)}`}>
                    {request?.urgency}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">Requested: {request?.requestTime}</p>
                  <p className="text-xs text-muted-foreground">Preferred: {request?.preferredTime}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-foreground mb-2"><strong>Reason:</strong> {request?.reason}</p>
                <p className="text-sm text-muted-foreground"><strong>Assigned Doctor:</strong> {request?.doctor}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Select
                    options={availableSlots}
                    placeholder="Select alternative slot"
                    className="w-64"
                  />
                  <Button variant="outline" size="sm" iconName="Calendar">
                    View Schedule
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    iconName="X"
                    onClick={() => handleRejectEmergency(request?.id)}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="success" 
                    size="sm" 
                    iconName="Check"
                    onClick={() => handleApproveEmergency(request?.id)}
                  >
                    Approve & Reschedule
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {emergencyRequests?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Emergency Requests</h4>
            <p className="text-muted-foreground">All appointments are running smoothly</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyBookingManager;