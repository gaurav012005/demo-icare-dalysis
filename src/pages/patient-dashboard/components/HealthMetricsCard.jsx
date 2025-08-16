import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthMetricsCard = () => {
  const [metrics] = useState({
    lastDialysis: {
      date: '2025-08-15',
      duration: '4 hours',
      fluidRemoved: '2.5L',
      status: 'completed'
    },
    vitals: {
      bloodPressure: '140/90',
      heartRate: '78 bpm',
      weight: '68.5 kg',
      temperature: '98.6°F'
    },
    labResults: {
      creatinine: '8.2 mg/dL',
      urea: '120 mg/dL',
      hemoglobin: '10.2 g/dL',
      lastUpdated: '2025-08-15'
    }
  });

  const getMetricStatus = (value, type) => {
    // Simplified status logic for demo
    switch (type) {
      case 'creatinine':
        return parseFloat(value) > 10 ? 'high' : 'normal';
      case 'hemoglobin':
        return parseFloat(value) < 11 ? 'low' : 'normal';
      default:
        return 'normal';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'high':
        return 'text-error';
      case 'low':
        return 'text-warning';
      case 'normal':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'high':
        return 'TrendingUp';
      case 'low':
        return 'TrendingDown';
      case 'normal':
        return 'CheckCircle';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border clinical-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Health Metrics</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => console.log('Refresh metrics')}
          >
            Refresh
          </Button>
        </div>

        {/* Last Dialysis Session */}
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Activity" size={16} className="text-primary" />
            <span>Last Dialysis Session</span>
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">{metrics?.lastDialysis?.date}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-medium text-foreground">{metrics?.lastDialysis?.duration}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Fluid Removed</p>
              <p className="font-medium text-foreground">{metrics?.lastDialysis?.fluidRemoved}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Status</p>
              <div className="flex items-center space-x-1">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <p className="font-medium text-success capitalize">{metrics?.lastDialysis?.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Vitals */}
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Heart" size={16} className="text-error" />
            <span>Current Vitals</span>
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(metrics?.vitals)?.map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground capitalize">{key?.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="font-medium text-foreground">{value}</p>
                </div>
                <Icon name="Activity" size={16} className="text-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Lab Results */}
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="TestTube" size={16} className="text-accent" />
            <span>Recent Lab Results</span>
          </h4>
          <div className="space-y-3">
            {Object.entries(metrics?.labResults)?.filter(([key]) => key !== 'lastUpdated')?.map(([key, value]) => {
              const status = getMetricStatus(value, key);
              return (
                <div key={key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">{key}</p>
                    <p className="text-xs text-muted-foreground">Last updated: {metrics?.labResults?.lastUpdated}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground">{value}</span>
                    <Icon 
                      name={getStatusIcon(status)} 
                      size={16} 
                      className={getStatusColor(status)} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            iconName="TrendingUp"
            iconPosition="left"
            onClick={() => console.log('View detailed health trends')}
          >
            View Health Trends
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthMetricsCard;