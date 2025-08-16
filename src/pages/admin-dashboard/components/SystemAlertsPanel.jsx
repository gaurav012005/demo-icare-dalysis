import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemAlertsPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 'ALT001',
      type: 'maintenance',
      severity: 'high',
      title: 'Machine 2 Maintenance Due',
      message: 'Dialysis Machine 2 requires scheduled maintenance. Last service: 45 days ago.',
      timestamp: '2025-08-16 13:30',
      status: 'active',
      actionRequired: true
    },
    {
      id: 'ALT002',
      type: 'payment',
      severity: 'medium',
      title: 'Payment Gateway Issue',
      message: 'Razorpay integration showing intermittent connection issues. 3 failed transactions in last hour.',
      timestamp: '2025-08-16 14:15',
      status: 'active',
      actionRequired: true
    },
    {
      id: 'ALT003',
      type: 'access',
      severity: 'low',
      title: 'New User Access Request',
      message: 'Dr. Anita Sharma (Nephrologist) has requested system access. Verification pending.',
      timestamp: '2025-08-16 12:45',
      status: 'pending',
      actionRequired: true
    },
    {
      id: 'ALT004',
      type: 'system',
      severity: 'medium',
      title: 'High Server Load',
      message: 'Server CPU usage at 85%. Consider scaling resources during peak hours.',
      timestamp: '2025-08-16 14:00',
      status: 'monitoring',
      actionRequired: false
    }
  ]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return 'Wrench';
      case 'payment':
        return 'CreditCard';
      case 'access':
        return 'UserPlus';
      case 'system':
        return 'Server';
      default:
        return 'AlertCircle';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const handleResolveAlert = (alertId) => {
    setAlerts(alerts?.map(alert => 
      alert?.id === alertId 
        ? { ...alert, status: 'resolved', actionRequired: false }
        : alert
    ));
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  const activeAlerts = alerts?.filter(alert => alert?.status !== 'resolved');
  const criticalCount = activeAlerts?.filter(alert => alert?.severity === 'high')?.length;

  return (
    <div className="bg-card border border-border rounded-lg clinical-shadow h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 text-warning rounded-lg">
              <Icon name="AlertTriangle" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">System Alerts</h3>
              <p className="text-sm text-muted-foreground">
                {activeAlerts?.length} active alerts
                {criticalCount > 0 && (
                  <span className="text-error font-medium"> • {criticalCount} critical</span>
                )}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
      </div>
      <div className="p-6 max-h-96 overflow-y-auto">
        <div className="space-y-4">
          {activeAlerts?.map((alert) => (
            <div key={alert?.id} className={`border rounded-lg p-4 ${getSeverityColor(alert?.severity)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon name={getAlertIcon(alert?.type)} size={20} />
                  <div>
                    <h4 className="font-semibold text-foreground">{alert?.title}</h4>
                    <p className="text-xs text-muted-foreground">{alert?.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {alert?.actionRequired && (
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      Action Required
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-foreground mb-3">{alert?.message}</p>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                  ${alert?.status === 'active' ? 'bg-error/20 text-error' : 
                    alert?.status === 'pending'? 'bg-warning/20 text-warning' : 'bg-accent/20 text-accent'}`}>
                  {alert?.status}
                </span>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    iconName="X"
                    onClick={() => handleDismissAlert(alert?.id)}
                  >
                    Dismiss
                  </Button>
                  {alert?.actionRequired && (
                    <Button 
                      variant="default" 
                      size="sm" 
                      iconName="Check"
                      onClick={() => handleResolveAlert(alert?.id)}
                    >
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeAlerts?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <h4 className="text-lg font-medium text-foreground mb-2">All Clear</h4>
            <p className="text-muted-foreground">No active system alerts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemAlertsPanel;