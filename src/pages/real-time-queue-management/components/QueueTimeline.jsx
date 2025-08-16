import React from 'react';
import Icon from '../../../components/AppIcon';

const QueueTimeline = ({ timeSlots, currentTime }) => {
  const getCurrentHour = () => {
    return new Date()?.getHours();
  };

  const isCurrentHour = (hour) => {
    return hour === getCurrentHour();
  };

  const getCapacityColor = (utilization) => {
    if (utilization >= 90) return 'bg-red-500';
    if (utilization >= 70) return 'bg-orange-500';
    if (utilization >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getCapacityText = (utilization) => {
    if (utilization >= 90) return 'Overbooked';
    if (utilization >= 70) return 'High';
    if (utilization >= 50) return 'Moderate';
    return 'Low';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 clinical-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Queue Timeline</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Current Time: {currentTime}</span>
        </div>
      </div>
      <div className="space-y-4">
        {timeSlots?.map((slot) => (
          <div
            key={slot?.hour}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              isCurrentHour(slot?.hour)
                ? 'border-primary bg-primary/5 clinical-shadow-md'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${isCurrentHour(slot?.hour) ? 'bg-primary' : 'bg-muted-foreground'}`} />
                <h3 className="font-semibold text-foreground">
                  {slot?.hour}:00 - {slot?.hour + 1}:00
                  {isCurrentHour(slot?.hour) && (
                    <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {slot?.scheduledPatients}/{slot?.capacity}
                  </p>
                  <p className="text-xs text-muted-foreground">Capacity</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCapacityColor(slot?.utilization)}`}>
                  {getCapacityText(slot?.utilization)}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Utilization</span>
                <span className="text-foreground font-medium">{slot?.utilization}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getCapacityColor(slot?.utilization)}`}
                  style={{ width: `${Math.min(slot?.utilization, 100)}%` }}
                />
              </div>
            </div>

            {slot?.patients && slot?.patients?.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Scheduled Patients:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {slot?.patients?.map((patient, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-muted/50 rounded-md p-2"
                    >
                      <Icon name="User" size={14} className="text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {patient?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Machine #{patient?.machine}
                        </p>
                      </div>
                      {patient?.status === 'emergency' && (
                        <Icon name="AlertTriangle" size={12} className="text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slot?.bottleneck && (
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-orange-800">Bottleneck Detected</p>
                    <p className="text-xs text-orange-600">{slot?.bottleneck}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <Icon name="TrendingUp" size={20} className="text-green-600 mx-auto mb-1" />
          <p className="text-sm font-medium text-green-800">Peak Hours</p>
          <p className="text-xs text-green-600">10:00 - 14:00</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <Icon name="Users" size={20} className="text-blue-600 mx-auto mb-1" />
          <p className="text-sm font-medium text-blue-800">Total Today</p>
          <p className="text-xs text-blue-600">
            {timeSlots?.reduce((sum, slot) => sum + slot?.scheduledPatients, 0)} patients
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
          <Icon name="Clock" size={20} className="text-orange-600 mx-auto mb-1" />
          <p className="text-sm font-medium text-orange-800">Avg Wait</p>
          <p className="text-xs text-orange-600">15 minutes</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
          <Icon name="Zap" size={20} className="text-purple-600 mx-auto mb-1" />
          <p className="text-sm font-medium text-purple-800">Efficiency</p>
          <p className="text-xs text-purple-600">87%</p>
        </div>
      </div>
    </div>
  );
};

export default QueueTimeline;