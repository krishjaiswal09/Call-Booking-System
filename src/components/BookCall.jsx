// components/BookCall.jsx
import React, { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";

import { dummyClients } from "../data/client.js";
import { timeSlots } from "../data/timeSlot";

export function BookCall() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClients, setShowClients] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md font-medium"
      >
        + Book Call
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Book a Call
            </h2>

            {/* Client Dropdown */}
            <label className="mb-1 text-sm font-medium block text-gray-700">
              Client
            </label>
            <div className="relative mb-4">
              <div
                onClick={() => setShowClients(!showClients)}
                className="border px-3 py-2 rounded-md cursor-pointer bg-white flex justify-between items-center text-sm text-gray-800 shadow-sm"
              >
                <span>
                  {selectedClient
                    ? `${selectedClient.name} (${selectedClient.phone})`
                    : "Select a client"}
                </span>
                <IoIosArrowDropdown className="text-gray-500 text-lg" />
              </div>

              {showClients && (
                <div className="absolute bg-white border mt-1 w-full rounded-md max-h-60 overflow-y-auto z-10 shadow-md">
                  {dummyClients.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => {
                        setSelectedClient(client);
                        setShowClients(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="text-sm font-medium text-gray-800">
                        {client.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {client.phone}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Call Type */}
            <div className="mb-2 text-sm font-medium text-gray-700">Call Type</div>
            <div className="flex gap-2 mb-4">
              {["Onboarding", "Follow-up"].map((type, index) => (
                <button
                  key={type}
                  className="w-1/2 px-3 py-1 bg-gray-100 hover:bg-gray-200 transition rounded text-sm text-gray-800 border"
                >
                  {type}
                  <p className="text-xs text-gray-600">
                    {index === 0 ? "40min" : "20min"}
                  </p>
                </button>
              ))}
            </div>

            {/* Date Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <CiCalendar size={20} />
                <span className="px-3 py-1 bg-gray-100 rounded">Date</span>
              </div>
              <div className="border rounded-md px-3 py-2 text-sm bg-white text-gray-800 shadow-sm">
                7/30/2025
              </div>
            </div>

            {/* Time Slots */}
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <MdOutlineWatchLater size={20} />
                <span className="px-3 py-1 bg-gray-100 rounded">Time</span>
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-2 py-1 rounded text-sm transition border ${
                      selectedTime === time
                        ? "bg-blue-100 border-blue-400 font-medium text-blue-700"
                        : "bg-white border-gray-300 text-gray-800 hover:bg-blue-50"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Time Display */}
            {selectedTime && (
              <div className="text-sm mt-2 text-gray-600">
                Selected Time:{" "}
                <span className="font-medium text-blue-700">{selectedTime}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-1/2 px-4 py-2 rounded border border-gray-300 text-sm text-gray-700 bg-white hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button className="w-1/2 px-4 py-2 rounded text-sm text-white bg-blue-600 hover:bg-blue-700 transition">
                Book Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
