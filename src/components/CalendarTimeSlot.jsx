import { timeSlots } from "../data/timeSlot";

export function CalendarTimeSlot({ date, onTimeSelect, selectedTime }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow">
      {/* Date Header */}
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl font-medium text-center">
        {formattedDate}
      </div>

      {/* Time Slots */}
      <div className="divide-y">
        {timeSlots.map((time) => {
          const isSelected = selectedTime === time;
          return (
            <button
              key={time}
              onClick={() => onTimeSelect(time)}
              className={`w-full text-left px-4 py-3 text-sm flex justify-between items-center transition-colors duration-150 ${
                isSelected ? "bg-blue-100 font-semibold" : "hover:bg-gray-50"
              }`}
            >
              <span>{time}</span>
              <span className="text-green-600">Available</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
