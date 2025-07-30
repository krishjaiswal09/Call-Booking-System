// App.jsx
import { Navigator } from "./components/Navigator.jsx";
import { DateAndNavigation } from "./components/Date.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl space-y-6">
        {/* Top Navigation */}
        <Navigator />

        {/* Date Navigation & Time Slots */}
        <DateAndNavigation />
      </div>
    </div>
  );
}

export default App;
