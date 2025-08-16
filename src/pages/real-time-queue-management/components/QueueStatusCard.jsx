import React from 'react';
import Icon from '../../../components/AppIcon';

const QueueStatusCard = ({ patient, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'checked-in':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-treatment':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'emergency':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'checked-in':
        return 'UserCheck';
      case 'in-treatment':
        return 'Activity';
      case 'waiting':
        return 'Clock';
      case 'completed':
        return 'CheckCircle';
      case 'emergency':
        return 'AlertTriangle';
      default:
        return 'User';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'emergency':
        return 'text-red-600';
      case 'urgent':
        return 'text-orange-600';
      case 'normal':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 clinical-shadow hover:clinical-shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{patient?.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {patient?.id}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient?.status)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon(patient?.status)} size={12} />
            <span className="capitalize">{patient?.status?.replace('-', ' ')}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-xs text-muted-foreground">Appointment Time</p>
          <p className="text-sm font-medium text-foreground">{patient?.appointmentTime}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Machine</p>
          <p className="text-sm font-medium text-foreground">#{patient?.machineNumber}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Duration</p>
          <p className="text-sm font-medium text-foreground">{patient?.estimatedDuration}h</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Wait Time</p>
          <p className="text-sm font-medium text-foreground">{patient?.waitTime}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Flag" size={14} className={getPriorityColor(patient?.priority)} />
          <span className={`text-xs font-medium capitalize ${getPriorityColor(patient?.priority)}`}>
            {patient?.priority}
          </span>
        </div>
        <button
          onClick={() => onViewDetails(patient)}
          className="text-xs text-primary hover:text-primary/80 font-medium"
        >
          View Details
        </button>
      </div>
      {patient?.status === 'in-treatment' && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Treatment Progress</span>
            <span className="text-foreground font-medium">{patient?.treatmentProgress}%</span>
          </div>
          <div className="mt-1 w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${patient?.treatmentProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QueueStatusCard;