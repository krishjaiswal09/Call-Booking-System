import React, { useState } from "react";
import { CiCalendar, } from "react-icons/ci";
import { MdOutlineWatchLater , } from "react-icons/md";

import { dummyClients } from "../data/client.js";
import { IoIosArrowDropdown } from "react-icons/io";

export function BookCall() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClients, setShowClients] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        + Book Call
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-xl text-gray-600 hover:text-black"
            >
              ×
            </button>

            <h2 className="text-lg font-semibold mb-4">Book a Call</h2>

            <label className="mb-1 text-sm font-medium block text-gray-700">
              Client
            </label>
            <div className="relative mb-4">
              <div
                onClick={() => setShowClients(!showClients)}
                className="border px-3 py-2 rounded-md cursor-pointer bg-white flex justify-between items-center text-sm text-gray-800"
              >
                <span>
                  {selectedClient
                    ? `${selectedClient.name} (${selectedClient.phone})`
                    : "Select a client"}
                </span>
                <span className="text-gray-500">
                  <IoIosArrowDropdown />
                </span>
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

            <div className="mb-2 text-sm font-medium text-gray-700">
              Call Type
            </div>
            <div className="flex gap-2 mb-4">
              <button className="px-3 py-1 bg-gray-200 rounded text-sm text-gray-800">
                Onboarding
                <p className="text-xs text-gray-600">40min</p>
              </button>
              <button className="px-3 py-1 bg-gray-200 rounded text-sm text-gray-800">
                Follow-up
                <p className="text-xs text-gray-600">20min</p>
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <CiCalendar size={20} />
                <span className="px-3 py-1 bg-gray-200 rounded">Date</span>
              </div>
              <div className="border rounded-md px-3 py-2 text-sm bg-white text-gray-800">
                7/30/2025
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <MdOutlineWatchLater size = {20}/>
                <span className="px-3 py-1 bg-gray-200 rounded">Time</span>
              </div>
              <div className="border rounded-md px-3 py-2 text-sm bg-white text-gray-800">
                7/30/2025
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
