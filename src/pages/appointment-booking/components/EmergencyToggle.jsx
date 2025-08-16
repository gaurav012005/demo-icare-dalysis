import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyToggle = ({ isEmergency, onToggle, disabled }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 clinical-shadow mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isEmergency ? 'bg-error/10' : 'bg-muted'
          }`}>
            <Icon 
              name="AlertTriangle" 
              size={20} 
              className={isEmergency ? 'text-error' : 'text-muted-foreground'} 
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Emergency Booking</h3>
            <p className="text-sm text-muted-foreground">
              {isEmergency 
                ? 'Priority scheduling enabled - Additional ₹500 fee applies' :'Enable for urgent medical situations requiring immediate attention'
              }
            </p>
          </div>
        </div>
        
        <Button
          variant={isEmergency ? "destructive" : "outline"}
          onClick={onToggle}
          disabled={disabled}
          iconName={isEmergency ? "X" : "AlertTriangle"}
          iconPosition="left"
        >
          {isEmergency ? 'Disable Emergency' : 'Enable Emergency'}
        </Button>
      </div>
      
      {isEmergency && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-start space-x-2 text-sm">
            <Icon name="Info" size={16} className="text-warning mt-0.5" />
            <div className="text-muted-foreground">
              <p className="font-medium text-warning mb-1">Emergency Booking Benefits:</p>
              <ul className="space-y-1">
                <li>• Priority slot allocation with AI rescheduling</li>
                <li>• Admin notification for immediate attention</li>
                <li>• Flexible cancellation policy</li>
                <li>• Direct doctor consultation line</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyToggle;