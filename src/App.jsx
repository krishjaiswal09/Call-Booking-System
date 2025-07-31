// App.jsx
import React, { useState } from "react";
import { Navigator } from "./components/Navigator.jsx";
import { DateAndNavigation } from "./components/Date.jsx";

function App() {
  // Lifted state: This date is now shared between components
  const [selectedDate, setSelectedDate] = useState("2025-07-30");

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl space-y-6">
        {/* Top Navigation - Pass selectedDate down */}
        <Navigator selectedDate={selectedDate} />

        {/* Date Navigation & Time Slots - Pass selectedDate and change handler */}
        <DateAndNavigation 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />
      </div>
    </div>
  );
}

export default App;