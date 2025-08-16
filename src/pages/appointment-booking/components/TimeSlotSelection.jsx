import React from 'react';
import Icon from '../../../components/AppIcon';


const TimeSlotSelection = ({ selectedDate, selectedSlot, onSlotSelect, timeSlots, isEmergency }) => {
  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getSlotStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-accent';
      case 'limited': return 'text-warning';
      case 'busy': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getSlotStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'limited': return 'AlertCircle';
      case 'busy': return 'XCircle';
      default: return 'Clock';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!selectedDate) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 clinical-shadow">
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Date First</h3>
          <p className="text-muted-foreground">Please choose a date from the calendar to view available time slots.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 clinical-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Available Time Slots</h3>
          <p className="text-sm text-muted-foreground mt-1">{formatDate(selectedDate)}</p>
        </div>
        {isEmergency && (
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-error/10 text-error rounded-md">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">Emergency Booking</span>
          </div>
        )}
      </div>
      {timeSlots?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Slots Available</h4>
          <p className="text-muted-foreground">Please select a different date or enable emergency booking.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {timeSlots?.map((slot) => (
            <div
              key={slot?.id}
              onClick={() => slot?.status === 'available' && onSlotSelect(slot)}
              className={`
                p-4 rounded-lg border transition-all duration-200 cursor-pointer
                ${selectedSlot?.id === slot?.id 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/50'
                }
                ${slot?.status !== 'available' ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">
                      {formatTime(slot?.startTime)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {slot?.duration} mins
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getSlotStatusIcon(slot?.status)} 
                      size={16} 
                      className={getSlotStatusColor(slot?.status)} 
                    />
                    <span className={`text-sm font-medium ${getSlotStatusColor(slot?.status)}`}>
                      {slot?.status === 'available' ? 'Available' : 
                       slot?.status === 'limited' ? 'Limited' : 'Busy'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>~{slot?.estimatedWaitTime} min wait</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Monitor" size={14} />
                      <span>Machine #{slot?.machineNumber}</span>
                    </div>
                  </div>
                  {slot?.isAiSuggested && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Icon name="Sparkles" size={12} className="text-accent" />
                      <span className="text-xs text-accent font-medium">AI Recommended</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={14} className="text-muted-foreground" />
                    <span className="text-foreground font-medium">{slot?.doctorName}</span>
                    <span className="text-muted-foreground">• {slot?.doctorSpecialization}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning" />
                    <span className="text-foreground font-medium">{slot?.doctorRating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {timeSlots?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Sparkles" size={12} className="text-accent" />
                <span>AI Recommended slots based on optimal scheduling</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="RefreshCw" size={12} />
              <span>Updated in real-time</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelection;