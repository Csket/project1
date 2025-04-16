import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarViewProps {
  onDateSelect: (date: Date) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    onDateSelect(newDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + (direction === 'next' ? 1 : -1),
      1
    ));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-4">
        {weekdays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {days.map(day => {
          const isSelected = selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === currentDate.getMonth() &&
            selectedDate?.getFullYear() === currentDate.getFullYear();

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`
                aspect-square rounded-lg p-2 relative group transition-all
                ${isSelected
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-indigo-50 text-gray-700'
                }
              `}
            >
              <span className="absolute top-1 left-1">{day}</span>
              <div className="w-full h-full flex items-center justify-center">
                <div className={`
                  w-2 h-2 rounded-full
                  ${Math.random() > 0.7 ? 'bg-green-400' : 'hidden'}
                  ${isSelected ? 'bg-white' : ''}
                `} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarView;