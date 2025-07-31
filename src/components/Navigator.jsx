// components/Navigator.jsx
import { CiCalendar } from "react-icons/ci";
import { BookCall } from "./BookCall.jsx";

export function Navigator({ selectedDate, onBookingCreated }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <CiCalendar size={28} />
        Call Booking System
      </h1>
      <BookCall 
        selectedDate={selectedDate} 
        onBookingCreated={onBookingCreated}
      />
    </div>
  );
}