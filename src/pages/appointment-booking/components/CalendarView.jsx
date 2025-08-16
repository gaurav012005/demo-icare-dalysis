import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ selectedDate, onDateSelect, availableDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth, availableDates]);

  const generateCalendarDays = () => {
    const year = currentMonth?.getFullYear();
    const month = currentMonth?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());

    const days = [];
    const today = new Date();
    today?.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate?.setDate(startDate?.getDate() + i);
      
      const dateString = currentDate?.toISOString()?.split('T')?.[0];
      const isCurrentMonth = currentDate?.getMonth() === month;
      const isToday = currentDate?.getTime() === today?.getTime();
      const isPast = currentDate < today;
      const isAvailable = availableDates?.some(d => d?.date === dateString);
      const availabilityInfo = availableDates?.find(d => d?.date === dateString);

      days?.push({
        date: currentDate,
        dateString,
        day: currentDate?.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isAvailable,
        machineCount: availabilityInfo?.machineCount || 0,
        doctorCount: availabilityInfo?.doctorCount || 0,
        isSelected: selectedDate === dateString
      });
    }

    setCalendarDays(days);
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card rounded-lg border border-border p-6 clinical-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Select Date</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth(-1)}
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <div className="text-center min-w-[140px]">
            <p className="font-medium text-foreground">
              {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth(1)}
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>
      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays?.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays?.map((day, index) => (
          <button
            key={index}
            onClick={() => day?.isAvailable && !day?.isPast && onDateSelect(day?.dateString)}
            disabled={!day?.isAvailable || day?.isPast}
            className={`
              relative p-2 h-16 rounded-md text-sm transition-all duration-200
              ${!day?.isCurrentMonth ? 'text-muted-foreground/50' : ''}
              ${day?.isToday ? 'ring-2 ring-primary ring-offset-2' : ''}
              ${day?.isSelected ? 'bg-primary text-primary-foreground' : ''}
              ${day?.isAvailable && !day?.isPast && !day?.isSelected ? 'bg-accent/10 hover:bg-accent/20 text-foreground' : ''}
              ${day?.isPast ? 'text-muted-foreground/30 cursor-not-allowed' : ''}
              ${!day?.isAvailable && !day?.isPast ? 'text-muted-foreground/50 cursor-not-allowed' : ''}
              ${day?.isAvailable && !day?.isPast ? 'cursor-pointer' : ''}
            `}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className="font-medium">{day?.day}</span>
              {day?.isAvailable && (
                <div className="flex items-center space-x-1 mt-1">
                  <div className="flex items-center">
                    <Icon name="Stethoscope" size={10} className="text-accent" />
                    <span className="text-xs ml-0.5">{day?.doctorCount}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Monitor" size={10} className="text-primary" />
                    <span className="text-xs ml-0.5">{day?.machineCount}</span>
                  </div>
                </div>
              )}
            </div>
            {day?.isToday && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>
            )}
          </button>
        ))}
      </div>
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent/20 rounded"></div>
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-muted-foreground">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Stethoscope" size={12} className="text-accent" />
            <span className="text-muted-foreground">Doctors</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Monitor" size={12} className="text-primary" />
            <span className="text-muted-foreground">Machines</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;