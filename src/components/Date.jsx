import { ChevronLeft, ChevronRight } from "lucide-react";

export function DateAndNavigation() {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="flex items-center gap-2">
        <button className="p-2 rounded hover:bg-gray-200">
          <ChevronLeft size={20} />
        </button>
        <input
          type="date"
          className="border px-4 py-1 rounded-md text-sm text-center"
          value="2025-07-30"
        />
        <button className="p-2 rounded hover:bg-gray-200">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
