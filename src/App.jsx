// App.jsx
import React, { useState } from "react";
import { Navigator } from "./components/Navigator.jsx";
import { DateAndNavigation } from "./components/Date.jsx";

function App() {
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);
  
  // Simple refresh mechanism
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl space-y-6">
        <Navigator
          selectedDate={selectedDate}
          onBookingCreated={triggerRefresh}
        />
        
        <DateAndNavigation
          key={refreshTrigger}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
    </div>
  );
}

export default App;