<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        return Transaction::with('user')->orderBy('id', 'desc')->get();
    }

    public function store(Request $request)
    {
        $category = $request->category;

        if ($category === 'Kas Masuk') {
            $request->merge(['category' => 'kas_masuk']);
        }

        if ($category === 'Kas Keluar') {
            $request->merge(['category' => 'kas_keluar']);
        }
        
        $validated = $request->validate([
            'name' => 'required|string',
            'date' => 'required|date',
            'category' => 'required|in:kas_masuk,kas_keluar',
            'description' => 'nullable|string',
            'amount' => 'required|integer',
        ]);

        $validated['created_by'] = $request->user()->id;

        $transaction = Transaction::create($validated);

        return response()->json($transaction);
    }

}
