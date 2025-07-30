
export function CalendarTimeSlot() {
  const timeSlots = [
    "10:50 AM",
    "11:10 AM",
    "11:30 AM",
    "11:50 AM",
    "12:10 PM",
    "12:30 PM",
    "12:50 PM",
    "1:10 PM",
  ];

  return (
    <div className="bg-white rounded-xl shadow">
      {/* Date Header */}
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl font-medium">
        7/30/2025
      </div>

      {/* Time Slots */}
      <div className="divide-y">
        {/* Booked Slot */}
        <div className="px-4 py-3 bg-blue-50">
          <p className="text-sm font-semibold text-blue-700">
            10:30 AM <span className="text-gray-500 ml-2">40 min</span>
          </p>
          <p className="text-sm font-medium text-gray-800">John Smith</p>
          <p className="text-sm text-gray-600">+1-555-0101</p>
        </div>

        {/* Available Slots */}
        {timeSlots.map((time) => (
          <div
            key={time}
            className="px-4 py-3 text-sm flex justify-between items-center"
          >
            <span>{time}</span>
            <span className="text-green-600">Available</span>
          </div>
        ))}
      </div>
    </div>
  );
}
