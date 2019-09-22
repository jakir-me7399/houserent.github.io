<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;

class TransactionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }
    public function transaction_renter_list($renter_id)
    {
        $transaction_list = DB::table('tbl_rent')
            ->select('tbl_rent.*', 'tbl_renter.renter_name', 'tbl_flat.flat_name')
            ->join('tbl_renter', 'tbl_renter.renter_id', '=', 'tbl_rent.renter_id')
            ->join('tbl_flat', 'tbl_flat.flat_id', '=', 'tbl_rent.flat_id')
            ->where('tbl_rent.renter_id', $renter_id)
            ->get();
        return response()->json($transaction_list);
    }

    public function store_expense(Request $request)
    {
        $expense_data['owner_id'] = 1;
        $expense_data['house_id'] = $house_id = $request->house_id;
        $expense_data['gas_bill'] = $gas_bill = $request->gas_bill;
        $expense_data['electricity_bill'] = $electricity_bill = $request->electricity_bill;
        $expense_data['wasa_bill'] = $wasa_bill = $request->wasa_bill;
        $expense_data['tax'] = $tax = $request->tax;
        $expense_data['others'] = $others = $request->others;
        $expense_data['title'] = $request->title;
        $expense_data['payment_date'] = $request->payment_date;
        $expense_data['created_at'] = date('Y-m-d H:i:s');

        DB::table('tbl_expense')->insert($expense_data);

        $balance_data = DB::table('tbl_balance')->where('house_id', $house_id)->first();
        $total_coast = $gas_bill + $electricity_bill + $wasa_bill + $tax + $others;
        $balance_data_update['total_amount_out'] = $balance_data->total_amount_out + $total_coast;
        $balance_data_update['total_balance'] = $balance_data->total_balance - $total_coast;

        DB::table('tbl_balance')->where('tbl_balance.house_id', $house_id)->update($balance_data_update);

        return 200;
    }

    public function balance_list()
    {
        $owner_id = auth()->user()->owner_id;
        $balance_list = DB::table('tbl_balance')
            ->select('tbl_balance.*', 'tbl_house.house_name')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_balance.house_id')
            ->where('tbl_balance.owner_id', $owner_id)
            ->get();

        return response()->json($balance_list);
    }

    public function expense_list()
    {
        $owner_id = auth()->user()->owner_id;
        $expense_list = DB::table('tbl_expense')
            ->select('tbl_expense.*', 'tbl_house.house_name')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_expense.house_id')
            ->where('tbl_house.owner_id', $owner_id)
            ->get();

        return response()->json($expense_list);
    }

    public function expense_details($expense_id)
    {
        $owner_id = auth()->user()->owner_id;
        $expense_details = DB::table('tbl_expense')
            ->select('tbl_expense.*', 'tbl_house.house_name')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_expense.house_id')
            ->where('expense_id', $expense_id)
            ->where('tbl_house.owner_id', $owner_id)
            ->first();

        return response()->json($expense_details);
    }
}
