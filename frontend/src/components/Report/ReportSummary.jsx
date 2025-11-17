import React from "react";
import { FaMoneyBillWave, FaArrowUp, FaArrowDown, FaCalendarAlt } from "react-icons/fa";
import LaporanCard from "./LaporanCard";

export default function ReportSummary({
  loading,
  reportSummary,
  filteredTransactions,
  tanggalLaporan,
  formatDate,
  formatRupiah,
}) {
  if (loading)
    return (
      <div className="p-8 text-center text-gray-500 rounded-lg mt-6">
        Memuat Laporan...
      </div>
    );

  if (!reportSummary)
    return (
      <div className="p-8 text-center text-gray-500 rounded-lg mt-6">
        Silakan pilih tanggal untuk memuat laporan.
      </div>
    );

  if (filteredTransactions.length === 0)
    return (
      <div className="pb-4 text-gray-400 text-center font-normal mt-6">
        Tidak ada transaksi pada tanggal {formatDate(tanggalLaporan)}.
      </div>
    );

  const saldoHarian =
    reportSummary.total_kas_masuk - reportSummary.total_kas_keluar;

  return (
    <div className="mt-2 mb-6">
      <div className="flex items-center mb-4">
        <FaCalendarAlt className="mr-2 text-gray-600" size={18} />
        <h3 className="text-[15px] md:text-xl font-semibold text-gray-800">
          Transaksi Tanggal: {formatDate(tanggalLaporan)}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <LaporanCard
          title="Total Kas Masuk"
          value={formatRupiah(reportSummary.total_kas_masuk)}
          icon={<FaArrowUp size={20} />}
          bgColor="bg-green-100"
          textColor="text-green-700"
        />
        <LaporanCard
          title="Total Kas Keluar"
          value={formatRupiah(reportSummary.total_kas_keluar)}
          icon={<FaArrowDown size={20} />}
          bgColor="bg-red-100"
          textColor="text-red-700"
        />
        <LaporanCard
          title="Saldo Harian"
          value={formatRupiah(saldoHarian)}
          icon={<FaMoneyBillWave size={20} />}
          bgColor="bg-blue-100"
          textColor="text-blue-700"
        />
      </div>
    </div>
  );
}
