import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsCard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'book-appointment',
      title: 'Book Appointment',
      description: 'Schedule your next dialysis session',
      icon: 'CalendarPlus',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => navigate('/appointment-booking')
    },
    {
      id: 'medical-records',
      title: 'Medical Records',
      description: 'View test results & prescriptions',
      icon: 'FileText',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: () => navigate('/medical-records')
    },
    {
      id: 'queue-status',
      title: 'Queue Status',
      description: 'Check real-time queue position',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      action: () => navigate('/real-time-queue-management')
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border clinical-shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant="ghost"
              onClick={action?.action}
              className="w-full justify-start p-4 h-auto hover:bg-muted/50"
            >
              <div className="flex items-center space-x-4 w-full">
                <div className={`p-2 rounded-lg ${action?.bgColor}`}>
                  <Icon name={action?.icon} size={20} className={action?.color} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{action?.title}</p>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </Button>
          ))}
        </div>

        {/* Emergency Booking */}
        <div className="mt-6 pt-4 border-t border-border">
          <Button
            variant="destructive"
            fullWidth
            iconName="AlertTriangle"
            iconPosition="left"
            onClick={() => console.log('Emergency booking')}
            className="bg-error hover:bg-error/90"
          >
            Emergency Booking
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            For urgent dialysis requirements
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;