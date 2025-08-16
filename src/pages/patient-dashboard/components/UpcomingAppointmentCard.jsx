import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingAppointmentCard = () => {
  const [appointment, setAppointment] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [queuePosition, setQueuePosition] = useState(3);

  useEffect(() => {
    // Mock upcoming appointment data
    const mockAppointment = {
      id: 'APT-2025-001',
      date: '2025-08-17',
      time: '10:00 AM',
      doctor: 'Dr. Rajesh Kumar',
      machine: 'Machine A-01',
      type: 'Regular Dialysis',
      duration: '4 hours',
      status: 'confirmed'
    };
    setAppointment(mockAppointment);

    // Calculate time remaining until appointment
    const calculateTimeRemaining = () => {
      const appointmentDateTime = new Date('2025-08-17 10:00:00');
      const now = new Date();
      const diff = appointmentDateTime - now;

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${hours}h ${minutes}m`);
      } else {
        setTimeRemaining('Now');
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 60000);

    // Simulate real-time queue updates
    const queueTimer = setInterval(() => {
      setQueuePosition(prev => Math.max(1, prev - Math.floor(Math.random() * 2)));
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(queueTimer);
    };
  }, []);

  const handleReschedule = () => {
    console.log('Reschedule appointment:', appointment?.id);
  };

  const handleCancel = () => {
    console.log('Cancel appointment:', appointment?.id);
  };

  if (!appointment) {
    return (
      <div className="bg-card rounded-lg border border-border clinical-shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border clinical-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Next Appointment</h3>
          <div className="flex items-center space-x-2 text-success">
            <Icon name="Clock" size={16} />
            <span className="text-sm font-medium">{timeRemaining}</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={18} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">{appointment?.date} at {appointment?.time}</p>
              <p className="text-sm text-muted-foreground">{appointment?.type}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="User" size={18} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">{appointment?.doctor}</p>
              <p className="text-sm text-muted-foreground">Nephrologist</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="Monitor" size={18} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">{appointment?.machine}</p>
              <p className="text-sm text-muted-foreground">Duration: {appointment?.duration}</p>
            </div>
          </div>
        </div>

        {/* Queue Position */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Queue Position</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-warning">#{queuePosition}</span>
              <div className="w-2 h-2 bg-warning rounded-full pulse-gentle"></div>
            </div>
          </div>
          <p className="text-xs text-warning/80 mt-1">Estimated wait: {queuePosition * 15} minutes</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            onClick={handleReschedule}
            className="flex-1"
          >
            Reschedule
          </Button>
          <Button
            variant="destructive"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointmentCard;