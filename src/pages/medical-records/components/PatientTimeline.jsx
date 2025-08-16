import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientTimeline = ({ timelineData, onEventClick }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const periods = [
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
    { value: 'all', label: 'All Time' }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'dialysis': return 'Activity';
      case 'test': return 'TestTube';
      case 'prescription': return 'Pill';
      case 'appointment': return 'Calendar';
      case 'emergency': return 'AlertTriangle';
      case 'surgery': return 'Scissors';
      default: return 'Circle';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'dialysis': return 'text-blue-600 bg-blue-100';
      case 'test': return 'text-green-600 bg-green-100';
      case 'prescription': return 'text-purple-600 bg-purple-100';
      case 'appointment': return 'text-orange-600 bg-orange-100';
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'surgery': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date?.getDate(),
      month: date?.toLocaleDateString('en-IN', { month: 'short' }),
      year: date?.getFullYear(),
      time: date?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const groupEventsByDate = (events) => {
    const grouped = {};
    events?.forEach(event => {
      const date = event?.date?.split('T')?.[0];
      if (!grouped?.[date]) {
        grouped[date] = [];
      }
      grouped?.[date]?.push(event);
    });
    return grouped;
  };

  const filteredEvents = timelineData?.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    
    switch (selectedPeriod) {
      case '1month':
        return eventDate >= new Date(now.setMonth(now.getMonth() - 1));
      case '3months':
        return eventDate >= new Date(now.setMonth(now.getMonth() - 3));
      case '6months':
        return eventDate >= new Date(now.setMonth(now.getMonth() - 6));
      case '1year':
        return eventDate >= new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return true;
    }
  });

  const groupedEvents = groupEventsByDate(filteredEvents);
  const sortedDates = Object.keys(groupedEvents)?.sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="bg-card border border-border rounded-lg clinical-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Treatment Timeline</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive view of your medical journey
            </p>
          </div>
          
          {/* Period Filter */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {periods?.map((period) => (
              <Button
                key={period?.value}
                variant={selectedPeriod === period?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period?.value)}
                className="text-xs"
              >
                {period?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        {sortedDates?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Events Found</h4>
            <p className="text-sm text-muted-foreground">
              No medical events found for the selected time period.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates?.map((date, dateIndex) => {
              const dateObj = formatDate(date);
              const dayEvents = groupedEvents?.[date];
              
              return (
                <div key={date} className="relative">
                  {/* Date Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0 text-center">
                      <div className="text-2xl font-bold text-foreground">{dateObj?.day}</div>
                      <div className="text-xs text-muted-foreground uppercase">
                        {dateObj?.month} {dateObj?.year}
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>
                  {/* Events for this date */}
                  <div className="ml-16 space-y-4">
                    {dayEvents?.map((event, eventIndex) => {
                      const eventDate = formatDate(event?.date);
                      const colorClasses = getEventColor(event?.type);
                      
                      return (
                        <div
                          key={event?.id}
                          className="relative flex items-start space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => onEventClick(event)}
                        >
                          {/* Timeline connector */}
                          {eventIndex < dayEvents?.length - 1 && (
                            <div className="absolute left-6 top-12 w-px h-8 bg-border"></div>
                          )}
                          {/* Event Icon */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${colorClasses}`}>
                            <Icon name={getEventIcon(event?.type)} size={20} />
                          </div>
                          {/* Event Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-foreground">
                                  {event?.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {eventDate?.time}
                                </p>
                                {event?.description && (
                                  <p className="text-sm text-muted-foreground mt-2">
                                    {event?.description}
                                  </p>
                                )}
                                {event?.doctor && (
                                  <p className="text-xs text-primary mt-1">
                                    Dr. {event?.doctor}
                                  </p>
                                )}
                              </div>
                              
                              {/* Event Status/Value */}
                              {event?.value && (
                                <div className="flex-shrink-0 text-right">
                                  <div className="text-sm font-medium text-foreground">
                                    {event?.value}
                                  </div>
                                  {event?.unit && (
                                    <div className="text-xs text-muted-foreground">
                                      {event?.unit}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Event Tags */}
                            {event?.tags && event?.tags?.length > 0 && (
                              <div className="flex items-center space-x-2 mt-3">
                                {event?.tags?.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* Action Button */}
                          <div className="flex-shrink-0">
                            <Button variant="ghost" size="icon">
                              <Icon name="ChevronRight" size={16} />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientTimeline;