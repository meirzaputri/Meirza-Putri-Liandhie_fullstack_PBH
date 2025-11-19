<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function daily(Request $request)
{
    $tanggal = $request->query('tanggal');

    if ($tanggal === null || $tanggal === '') {
        $tanggal = now()->toDateString();
    }

    $transaksi = \App\Models\Transaction::with('user')->whereDate('date', $tanggal)->get();

    $totalMasuk = $transaksi->where('category', 'kas_masuk')->sum('amount');
    $totalKeluar = $transaksi->where('category', 'kas_keluar')->sum('amount');
    $saldo = $totalMasuk - $totalKeluar;

    return response()->json([
        'tanggal' => $tanggal,
        'total_kas_masuk' => $totalMasuk,
        'total_kas_keluar' => $totalKeluar,
        'saldo' => $saldo,
        'transaksi' => $transaksi,
    ]);
}

public function dailyPdf(Request $request)
{
    $tanggal = $request->query('tanggal');
    if ($tanggal === null || $tanggal === '') {
        $tanggal = now()->toDateString();
    }

    $transaksi = \App\Models\Transaction::whereDate('date', $tanggal)->get();

    $totalMasuk = $transaksi->where('category', 'kas_masuk')->sum('amount');
    $totalKeluar = $transaksi->where('category', 'kas_keluar')->sum('amount');
    $saldo = $totalMasuk - $totalKeluar;

    $data = [
        'tanggal' => $tanggal,
        'transaksi' => $transaksi,
        'totalMasuk' => $totalMasuk,
        'totalKeluar' => $totalKeluar,
        'saldo' => $saldo
    ];

    $pdf = Pdf::loadView('laporan_harian_pdf', $data)->setPaper('a4', 'portrait');

    return $pdf->download("laporan-harian-$tanggal.pdf");
}


}
