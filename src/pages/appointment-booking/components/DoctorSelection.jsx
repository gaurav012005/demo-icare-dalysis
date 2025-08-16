import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const DoctorSelection = ({ selectedDoctor, onDoctorSelect, doctors, selectedDate, selectedSlot }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? 'text-warning' : 'text-muted-foreground/30'}
      />
    ));
  };

  const getAvailabilityStatus = (doctor) => {
    if (!selectedDate || !selectedSlot) return 'unknown';
    
    const availability = doctor?.availability?.find(a => a?.date === selectedDate);
    if (!availability) return 'unavailable';
    
    const slotTime = selectedSlot?.startTime;
    const isAvailable = availability?.slots?.some(slot => 
      slot?.time === slotTime && slot?.status === 'available'
    );
    
    return isAvailable ? 'available' : 'busy';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-accent';
      case 'busy': return 'text-warning';
      case 'unavailable': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'busy': return 'Clock';
      case 'unavailable': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'unavailable': return 'Unavailable';
      default: return 'Unknown';
    }
  };

  if (!selectedDate || !selectedSlot) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 clinical-shadow">
        <div className="text-center py-8">
          <Icon name="UserCheck" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select Date & Time First</h3>
          <p className="text-muted-foreground">Please choose a date and time slot to view available doctors.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 clinical-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Select Doctor</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Available for {new Date(`2000-01-01T${selectedSlot.startTime}`)?.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })} on {new Date(selectedDate)?.toLocaleDateString('en-IN', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {doctors?.map((doctor) => {
          const availabilityStatus = getAvailabilityStatus(doctor);
          const isSelectable = availabilityStatus === 'available';
          
          return (
            <div
              key={doctor?.id}
              onClick={() => isSelectable && onDoctorSelect(doctor)}
              className={`
                p-4 rounded-lg border transition-all duration-200
                ${selectedDoctor?.id === doctor?.id 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/50'
                }
                ${isSelectable ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}
              `}
            >
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Image
                    src={doctor?.profileImage}
                    alt={doctor?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card flex items-center justify-center ${
                    availabilityStatus === 'available' ? 'bg-accent' : 
                    availabilityStatus === 'busy' ? 'bg-warning' : 'bg-error'
                  }`}>
                    <Icon 
                      name={getStatusIcon(availabilityStatus)} 
                      size={12} 
                      className="text-white" 
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{doctor?.name}</h4>
                      <p className="text-sm text-primary font-medium">{doctor?.specialization}</p>
                      <p className="text-sm text-muted-foreground">{doctor?.qualification}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className={`flex items-center space-x-1 ${getStatusColor(availabilityStatus)}`}>
                        <Icon name={getStatusIcon(availabilityStatus)} size={14} />
                        <span className="text-sm font-medium">{getStatusText(availabilityStatus)}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStars(doctor?.rating)}
                        <span className="text-sm text-foreground font-medium ml-1">
                          {doctor?.rating} ({doctor?.reviewCount})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{doctor?.experience} years experience</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{doctor?.patientsToday} patients today</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{doctor?.location}</span>
                    </div>
                  </div>

                  {doctor?.specialNotes && (
                    <div className="mt-2 p-2 bg-muted/50 rounded text-sm text-muted-foreground">
                      <Icon name="Info" size={14} className="inline mr-1" />
                      {doctor?.specialNotes}
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {doctor?.languages?.map((lang, index) => (
                        <span key={index} className="px-2 py-1 bg-muted text-xs rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">₹{doctor?.consultationFee?.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-muted-foreground">Consultation Fee</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Busy</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span>Unavailable</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>All doctors are verified and licensed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSelection;