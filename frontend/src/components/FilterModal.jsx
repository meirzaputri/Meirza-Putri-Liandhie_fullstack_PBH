import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default function FilterModal({
  isFilterModalOpen,
  tanggalPilih,
  setTanggalPilih,
  today,
  handleResetDate,
  handleApplyDate,
  onClose,
}) {
  if (!isFilterModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
          <FaCalendarAlt className="inline mr-2" /> Pilih Tanggal Laporan
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal Laporan
          </label>
          <input
            type="date"
            value={tanggalPilih}
            onChange={(e) => setTanggalPilih(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            max={today}
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleResetDate}
            className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Reset
          </button>

          <button
            onClick={handleApplyDate}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
}
