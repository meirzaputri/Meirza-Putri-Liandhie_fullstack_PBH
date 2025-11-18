import React from "react";

export default function DetailModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        
        <h2 className="text-lg font-semibold mb-4">Detail Transaksi</h2>

        <div className="space-y-3">

          <div>
            <p className="text-sm text-gray-500">Nama Transaksi</p>
            <p className="font-medium">{data.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Tanggal</p>
            <p className="font-medium">{data.date}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Kategori</p>
            <p className="font-medium">{data.category}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Nominal</p>
            <p className="font-medium">{data.amount}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Deskripsi</p>
            <p className="font-medium">{data.description || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Dibuat Oleh</p>
            <p className="font-medium">{data.createdBy}</p>
          </div>

        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
