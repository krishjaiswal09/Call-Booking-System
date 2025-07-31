import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarTimeSlot from "./CalendarTimeSlot";
import {convertTimeToMinutes} from "../utils/timeHelpers"

export function DateAndNavigation({ selectedDate, onDateChange }) {
  const [selectedTime, setSelectedTime] = useState(null);

  // Simple date navigation
  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    onDateChange(newDate.toISOString().slice(0, 10));
    setSelectedTime(null); // Reset selection on date change
  };

  const handleDateInput = (e) => {
    onDateChange(e.target.value);
    setSelectedTime(null);
  };

  // Clear selected time if it becomes booked
  const handleBookingUpdate = (bookings) => {
    if (selectedTime && isTimeBooked(selectedTime, bookings)) {
      setSelectedTime(null);
    }
  };

  // Simple time booking check
  const isTimeBooked = (timeSlot, bookings) => {
    const slotMinutes = convertTimeToMinutes(timeSlot);
    return bookings.some(booking => {
      const startMinutes = convertTimeToMinutes(booking.startTime);
      const endMinutes = startMinutes + booking.callDuration;
      return slotMinutes >= startMinutes && slotMinutes < endMinutes;
    });
  };

  return (
    <div className="w-full">
      {/* Date Navigation */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded hover:bg-gray-200 transition"
            onClick={() => changeDate(-1)}
          >
            <ChevronLeft size={20} />
          </button>

          <input
            type="date"
            className="border px-4 py-1 rounded-md text-sm text-center"
            value={selectedDate}
            onChange={handleDateInput}
          />

          <button
            className="p-2 rounded hover:bg-gray-200 transition"
            onClick={() => changeDate(1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <CalendarTimeSlot 
        date={selectedDate} 
        selectedTime={selectedTime}
        onTimeSelect={setSelectedTime}
        onBookingUpdate={handleBookingUpdate}
      />
    </div>
  );
}