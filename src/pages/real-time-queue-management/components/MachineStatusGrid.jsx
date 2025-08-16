import React from 'react';
import Icon from '../../../components/AppIcon';

const MachineStatusGrid = ({ machines, onMachineClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-use':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'in-use':
        return 'Activity';
      case 'maintenance':
        return 'Wrench';
      case 'offline':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 clinical-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Machine Status</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-muted-foreground">In Use</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-muted-foreground">Maintenance</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {machines?.map((machine) => (
          <div
            key={machine?.id}
            onClick={() => onMachineClick(machine)}
            className="cursor-pointer group"
          >
            <div className={`border rounded-lg p-4 text-center transition-all duration-200 hover:clinical-shadow-md ${getStatusColor(machine?.status)}`}>
              <div className="flex flex-col items-center space-y-2">
                <Icon name={getStatusIcon(machine?.status)} size={24} />
                <div>
                  <p className="font-semibold text-sm">Machine {machine?.number}</p>
                  <p className="text-xs capitalize">{machine?.status?.replace('-', ' ')}</p>
                </div>
              </div>

              {machine?.status === 'in-use' && machine?.currentPatient && (
                <div className="mt-3 pt-3 border-t border-current/20">
                  <p className="text-xs font-medium">{machine?.currentPatient}</p>
                  <p className="text-xs opacity-80">
                    {machine?.timeRemaining} remaining
                  </p>
                </div>
              )}

              {machine?.status === 'maintenance' && machine?.maintenanceUntil && (
                <div className="mt-3 pt-3 border-t border-current/20">
                  <p className="text-xs">Until {machine?.maintenanceUntil}</p>
                </div>
              )}

              {machine?.status === 'available' && machine?.nextAppointment && (
                <div className="mt-3 pt-3 border-t border-current/20">
                  <p className="text-xs">Next: {machine?.nextAppointment}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} className="text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Available Machines</p>
              <p className="text-lg font-bold text-green-600">
                {machines?.filter(m => m?.status === 'available')?.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-800">In Treatment</p>
              <p className="text-lg font-bold text-blue-600">
                {machines?.filter(m => m?.status === 'in-use')?.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Wrench" size={20} className="text-orange-600" />
            <div>
              <p className="text-sm font-medium text-orange-800">Maintenance</p>
              <p className="text-lg font-bold text-orange-600">
                {machines?.filter(m => m?.status === 'maintenance')?.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineStatusGrid;