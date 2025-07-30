import { Navigator } from "./components/navigator.jsx";
import { DateAndNavigation } from "./components/Date.jsx";
import { CalendarTimeSlot } from "./components/CalendarTimeSlot";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl">
    
        <Navigator />
        
        {/* Date & Navigation */}
        <DateAndNavigation />

        {/* Calendar */}
        <CalendarTimeSlot />
      </div>
    </div>
  );
}

export default App;
