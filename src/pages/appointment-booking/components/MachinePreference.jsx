import React from 'react';
import Icon from '../../../components/AppIcon';


const MachinePreference = ({ selectedMachine, onMachineSelect, machines, selectedSlot }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-accent';
      case 'in-use': return 'text-warning';
      case 'maintenance': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'in-use': return 'Clock';
      case 'maintenance': return 'AlertTriangle';
      default: return 'HelpCircle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'in-use': return 'In Use';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'available': return 'bg-accent/10 text-accent';
      case 'in-use': return 'bg-warning/10 text-warning';
      case 'maintenance': return 'bg-error/10 text-error';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (!selectedSlot) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 clinical-shadow">
        <div className="text-center py-8">
          <Icon name="Monitor" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select Time Slot First</h3>
          <p className="text-muted-foreground">Please choose a time slot to view available machines.</p>
        </div>
      </div>
    );
  }

  const availableMachines = machines?.filter(machine => 
    machine?.status === 'available' || machine?.id === selectedSlot?.machineNumber
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 clinical-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Machine Preference</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Choose your preferred dialysis machine for the appointment
          </p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-primary/10 text-primary rounded-md">
          <Icon name="Zap" size={16} />
          <span className="text-sm font-medium">Real-time Status</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableMachines?.map((machine) => {
          const isRecommended = machine?.id === selectedSlot?.machineNumber;
          const isSelectable = machine?.status === 'available';
          
          return (
            <div
              key={machine?.id}
              onClick={() => isSelectable && onMachineSelect(machine)}
              className={`
                p-4 rounded-lg border transition-all duration-200 relative
                ${selectedMachine?.id === machine?.id 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/50'
                }
                ${isSelectable ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}
                ${isRecommended ? 'ring-2 ring-accent/30' : ''}
              `}
            >
              {isRecommended && (
                <div className="absolute -top-2 left-4 px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md">
                  <Icon name="Sparkles" size={12} className="inline mr-1" />
                  Recommended
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Machine #{machine?.id}</h4>
                  <p className="text-sm text-muted-foreground">{machine?.model}</p>
                </div>
                <div className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeColor(machine?.status)}`}>
                  <Icon name={getStatusIcon(machine?.status)} size={12} className="inline mr-1" />
                  {getStatusText(machine?.status)}
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{machine?.location}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Service</p>
                    <p className="font-medium text-foreground">{machine?.lastService}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Performance</span>
                    <span className="font-medium text-foreground">{machine?.performance}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        machine?.performance >= 90 ? 'bg-accent' : 
                        machine?.performance >= 70 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${machine?.performance}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{machine?.sessionsToday} sessions today</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">~{machine?.avgSessionTime} min avg</span>
                  </div>
                </div>

                {machine?.features && machine?.features?.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Special Features</p>
                    <div className="flex flex-wrap gap-1">
                      {machine?.features?.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-muted text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {machine?.nextAvailable && machine?.status !== 'available' && (
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>Next available: {machine?.nextAvailable}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {availableMachines?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Machines Available</h4>
          <p className="text-muted-foreground">All machines are currently in use or under maintenance for the selected time slot.</p>
        </div>
      )}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>In Use</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span>Maintenance</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>All machines are regularly serviced and certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachinePreference;