<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; }
        .header { text-align: center; margin-bottom: 20px; }
        .logo { width: 70px; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 8px; font-size: 12px; }
        th { background: #f4f4f4; }
        .summary { margin-top: 25px; font-size: 14px; }
    </style>
</head>

<body>

    <div class="header">
        <img src="{{ public_path('logo.png') }}" class="logo">
        <h2>LAPORAN TRANSAKSI HARIAN</h2>
        <p>Tanggal: {{ $tanggal }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Nama Transaksi</th>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Nominal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transaksi as $t)
            <tr>
                <td>{{ $t->name }}</td>
                <td>{{ \Carbon\Carbon::parse($t->date)->format('d M Y') }}</td>
                <td>{{ $t->category == 'kas_masuk' ? 'Kas Masuk' : 'Kas Keluar' }}</td>
                <td>Rp {{ number_format($t->amount, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary">
        <p><strong>Total Kas Masuk:</strong> Rp {{ number_format($totalMasuk, 0, ',', '.') }}</p>
        <p><strong>Total Kas Keluar:</strong> Rp {{ number_format($totalKeluar, 0, ',', '.') }}</p>
        <p><strong>Saldo:</strong> Rp {{ number_format($saldo, 0, ',', '.') }}</p>
    </div>

</body>
</html>
