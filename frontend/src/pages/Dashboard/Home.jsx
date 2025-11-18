import React, { useEffect, useState } from "react";
import { getTransactions } from "../../services/transaction";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiCalendar,
  FiList,
} from "react-icons/fi";

const SummaryCard = ({ title, value, icon: Icon, color, iconBg }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-full ${iconBg}`}>
          <Icon className={`${color}`} size={24} />
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {title}
          </p>
          <h2
            className={`text-2xl font-bold mt-1 ${color
              .replace("-600", "-700")
              .replace("-500", "-700")}`}
          >
            {value}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [summary, setSummary] = useState({
    total_kas_masuk: 0,
    total_kas_keluar: 0,
    saldo: 0,
  });

  const [latestTransactions, setLatestTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const formatRupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(n);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true);
      try {
        const res = await getTransactions(token);
        const all = res.data;

        const totalMasuk = all
          .filter((t) => t.category === "kas_masuk")
          .reduce((a, b) => a + Number(b.amount), 0);

        const totalKeluar = all
          .filter((t) => t.category === "kas_keluar")
          .reduce((a, b) => a + Number(b.amount), 0);

        const saldo = totalMasuk - totalKeluar;

        setSummary({
          total_kas_masuk: totalMasuk,
          total_kas_keluar: totalKeluar,
          saldo,
        });

        const sortedLatest = [...all]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        setLatestTransactions(sortedLatest);
      } catch (error) {
        console.error("Gagal memuat dashboard", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, [token]);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium text-gray-600">
          Memuat data dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FiCalendar className="mr-3 text-blue-500" />
          Dashboard Keuangan
        </h1>
        <p className="text-gray-500 mt-1">
          Ringkasan total dan transaksi terbaru Anda.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <SummaryCard
          title="Total Kas Masuk"
          value={formatRupiah(summary.total_kas_masuk)}
          icon={FiTrendingUp}
          color="text-green-600"
          iconBg="bg-green-100"
        />

        <SummaryCard
          title="Total Kas Keluar"
          value={formatRupiah(summary.total_kas_keluar)}
          icon={FiTrendingDown}
          color="text-red-600"
          iconBg="bg-red-100"
        />

        <SummaryCard
          title="Saldo Total"
          value={formatRupiah(summary.saldo)}
          icon={FiDollarSign}
          color="text-blue-600"
          iconBg="bg-blue-100"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center">
          <FiList className="mr-2 text-gray-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-800">
            5 Transaksi Terbaru
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nama Transaksi
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                  Tanggal
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nominal
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {latestTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500 italic"
                  >
                    Tidak ada transaksi yang tersedia.
                  </td>
                </tr>
              ) : (
                latestTransactions.map((t) => {
                  const isMasuk = t.category === "kas_masuk";
                  const categoryColor = isMasuk
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700";

                  return (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="p-4 text-sm font-medium text-gray-900">
                        {t.name}
                      </td>
                      <td className="p-4 text-sm text-gray-500 hidden sm:table-cell">
                        {formatDate(t.date)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColor}`}
                        >
                          {isMasuk ? "Kas Masuk" : "Kas Keluar"}
                        </span>
                      </td>
                      <td
                        className={`p-4 text-sm font-bold ${
                          isMasuk ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {formatRupiah(t.amount)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
