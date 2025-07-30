// components/Date.jsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarTimeSlot } from "./CalendarTimeSlot";

export function DateAndNavigation() {
  const [selectedDate, setSelectedDate] = useState("2025-07-30");

  const handleDateChange = (direction) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + direction);
    setSelectedDate(current.toISOString().slice(0, 10));
  };

  const onInputChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="w-full">
      {/* Date Navigation */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded hover:bg-gray-200 transition"
            onClick={() => handleDateChange(-1)}
            aria-label="Previous Day"
          >
            <ChevronLeft size={20} />
          </button>

          <input
            type="date"
            className="border px-4 py-1 rounded-md text-sm text-center"
            value={selectedDate}
            onChange={onInputChange}
          />

          <button
            className="p-2 rounded hover:bg-gray-200 transition"
            onClick={() => handleDateChange(1)}
            aria-label="Next Day"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Time Slots for Selected Date */}
      <CalendarTimeSlot date={selectedDate} />
    </div>
  );
}
