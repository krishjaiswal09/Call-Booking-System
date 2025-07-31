// components/CalendarTimeSlot.jsx
import React, { useState, useEffect } from "react";
import { timeSlots } from "../data/timeSlot";
import { subscribeToBookingsByDate, deleteBooking } from "../services/bookingService";
import {convertTimeToMinutes} from "../utils/timeHelpers"
export default function CalendarTimeSlot({ date, onTimeSelect, selectedTime, onBookingUpdate }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Subscribe to bookings for this date
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToBookingsByDate(date, (bookingsData) => {
      setBookings(bookingsData);
      setLoading(false);
      onBookingUpdate?.(bookingsData);
    });
    return unsubscribe;
  }, [date, onBookingUpdate]);

  // Check if time slot is booked and return booking info
  const getTimeSlotInfo = (timeSlot) => {
    const slotMinutes = convertTimeToMinutes(timeSlot);
    
    const booking = bookings.find(booking => {
      const startMinutes = convertTimeToMinutes(booking.startTime);
      const endMinutes = startMinutes + booking.callDuration;
      return slotMinutes >= startMinutes && slotMinutes < endMinutes;
    });
    
    return booking ? { isBooked: true, booking } : { isBooked: false };
  };

  // Handle booking deletion
  const handleDeleteBooking = async (bookingId, e) => {
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      await deleteBooking(bookingId);
    } catch (error) {
      alert('Error deleting booking: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl font-medium text-center">
          {formattedDate}
        </div>
        <div className="p-4 text-center text-gray-500">Loading time slots...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl font-medium text-center">
        {formattedDate}
      </div>

      <div className="divide-y">
        {timeSlots.map((time) => {
          const isSelected = selectedTime === time;
          const { isBooked, booking } = getTimeSlotInfo(time);
          
          return (
            <div
              key={time}
              className={`w-full text-left px-4 py-3 text-sm flex justify-between items-center transition-colors ${
                isSelected ? "bg-blue-100 font-semibold" : 
                isBooked ? "bg-red-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex-1">
                <button
                  onClick={() => !isBooked && onTimeSelect(time)}
                  className={`text-left w-full ${isBooked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  disabled={isBooked}
                >
                  <span className={isBooked ? 'text-gray-500' : ''}>{time}</span>
                  {isBooked && (
                    <div className="text-xs text-gray-600 mt-1">
                      {booking.clientName} - {booking.callType}
                      {booking.isRecurring && " (Recurring)"}
                    </div>
                  )}
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                {isBooked ? (
                  <>
                    <span className="text-red-600 text-xs">Booked</span>
                    <button
                      onClick={(e) => handleDeleteBooking(booking.id, e)}
                      className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <span className="text-green-600">Available</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}