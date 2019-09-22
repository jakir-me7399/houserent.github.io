<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;

class RentController extends Controller
{    
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function flat_rentinfo($owner_id)
    {
        $owner_id = auth()->user()->owner_id;
        $renter_list = DB::table('tbl_renter')
            ->select('tbl_renter.renter_id', 'tbl_renter.renter_name')
            ->join('tbl_house', 'tbl_renter.house_id', '=', 'tbl_house.house_id')
            ->where('tbl_house.owner_id', $owner_id)
            ->where('status', '=', 1)
            ->get();
        return response()->json(['renter_list' => $renter_list]);
    }

    public function rent_list()
    {
        $owner_id = auth()->user()->owner_id;
        
        $rent_list = DB::table('tbl_rent')
            ->select('tbl_rent.rent_id', 'tbl_rent.rent_month', 'tbl_rent.accepted_at', 'tbl_rent.total_rent', 'tbl_renter.renter_name', 'tbl_flat.flat_name', 'tbl_house.house_name')
            ->join('tbl_renter', 'tbl_renter.renter_id', '=', 'tbl_rent.renter_id')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_rent.house_id')
            ->join('tbl_flat', 'tbl_flat.flat_id', '=', 'tbl_rent.flat_id')
            ->where('tbl_house.owner_id', $owner_id)
            ->get();

        return response()->json($rent_list);
    }

    public function house_rent_list($house_id)
    {
        $rent_list = DB::table('tbl_rent')
            ->select('tbl_rent.rent_id', 'tbl_rent.rent_month', 'tbl_rent.accepted_at', 'tbl_rent.total_rent', 'tbl_renter.renter_name', 'tbl_flat.flat_name', 'tbl_house.house_name')
            ->join('tbl_renter', 'tbl_renter.renter_id', '=', 'tbl_rent.renter_id')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_rent.house_id')
            ->join('tbl_flat', 'tbl_flat.flat_id', '=', 'tbl_rent.flat_id')
            ->where('tbl_rent.house_id', $house_id)
            ->get();

        return response()->json($rent_list);
    }

    public function flat_rent_list($flat_id)
    {
        $rent_list = DB::table('tbl_rent')
            ->select('tbl_rent.rent_id', 'tbl_rent.rent_month', 'tbl_rent.accepted_at', 'tbl_rent.total_rent', 'tbl_renter.renter_name', 'tbl_flat.flat_name', 'tbl_house.house_name')
            ->join('tbl_renter', 'tbl_renter.renter_id', '=', 'tbl_rent.renter_id')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_rent.house_id')
            ->join('tbl_flat', 'tbl_flat.flat_id', '=', 'tbl_rent.flat_id')
            ->where('tbl_rent.flat_id', $flat_id)
            ->get();

        return response()->json($rent_list);
    }

    public function monthly_rent_list($month, $year)
    {
        $owner_id = auth()->user()->owner_id;
        $rent_list = DB::table('tbl_rent')
            ->select('tbl_rent.rent_id', 'tbl_rent.rent_month', 'tbl_rent.accepted_at', 'tbl_rent.total_rent', 'tbl_renter.renter_name', 'tbl_flat.flat_name', 'tbl_house.house_name')
            ->join('tbl_renter', 'tbl_renter.renter_id', '=', 'tbl_rent.renter_id')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_rent.house_id')
            ->join('tbl_flat', 'tbl_flat.flat_id', '=', 'tbl_rent.flat_id')
            ->where('tbl_house.owner_id', $owner_id)
            ->whereMonth('tbl_rent.rent_month', $month)
            ->whereYear('tbl_rent.rent_month', $year)
            ->get();

        return response()->json($rent_list);
    }

    public function rent_store(Request $request)
    {
        $owner_id = auth()->user()->owner_id;
        $data['owner_id'] = $owner_id;
        $data['renter_id'] = $request->renter_id;
        $data['house_id'] = $request->house_id;
        $data['flat_id'] = $request->flat_id;
        $data['basic_rent'] = $basic_rent = $request->basic_rent;
        $data['gas_bill'] = $gas_bill = $request->gas_bill;
        $data['water_bill'] = $water_bill = $request->water_bill;
        $data['rent_type'] = $request->rent_type;
        $data['rent_month'] = date('Y-m-d', strtotime($request->rent_month));
        $data['accepted_at'] = $request->accepted_at;
        $data['electricity_bill'] = $electricity_bill = $request->electricity_bill;
        $data['others_charge'] = $other_bill = $request->others_charge;
        $total_rent = ($basic_rent + $gas_bill + $water_bill + $electricity_bill + $other_bill);
        $data['total_rent'] = $total_rent;
        $data['created_at'] = date('Y-m-d H:i:s');

        $rent_id = DB::table('tbl_rent')->insertGetId($data);

        $transaction_data['rent_id'] = $rent_id;
        $transaction_data['amount_in'] = $total_rent;
        $transaction_data['amount_out'] = $amount_out = 0;
        $transaction_data['old_balance'] = $total_rent - $amount_out;

        DB::table('tbl_transaction')->insert($transaction_data);

        $balance_data = DB::table('tbl_balance')->where('house_id', $request->house_id)->first();

        $update_data['total_amount_in'] = $balance_data->total_amount_in + $total_rent;
        $update_data['total_balance'] = $balance_data->total_balance + $total_rent;

        DB::table('tbl_balance')->where('house_id', $request->house_id)->update($update_data);
        return response()->json($rent_id);
    }

    public function edit_rent($rent_id)
    {
        $edit_rent = DB::table('tbl_rent')->where('rent_id', $rent_id)->first();
        return response()->json($edit_rent);
    }

    public function update_rent(Request $request)
    {
        $data['owner_id'] = 1;
        $data['renter_id'] = $request->renter_id;
        $data['house_id'] = $request->house_id;
        $data['flat_id'] = $request->flat_id;
        $data['basic_rent'] = $basic_rent = $request->basic_rent;
        $data['gas_bill'] = $gas_bill = $request->gas_bill;
        $data['water_bill'] = $water_bill = $request->water_bill;
        $data['rent_type'] = $request->rent_type;
        $data['rent_month'] = $request->rent_month;
        $data['accepted_at'] = $request->accepted_at;
        $data['electricity_bill'] = $electricity_bill = $request->electricity_bill;
        $data['others_charge'] = $other_bill = $request->others_charge;
        $total_rent = ($basic_rent + $gas_bill + $water_bill + $electricity_bill + $other_bill);
        $data['total_rent'] = $total_rent;
        $data['created_at'] = date('Y-m-d H:i:s');

        DB::table('tbl_rent')->where('rent_id', $request->rent_id)->update($data);
        return 200;
    }

    public function destroy($rent_id)
    {
        DB::table('tbl_rent')->where('rent_id', $rent_id)->delete();

        return 200;
    }

    public function renter_rent_info($renter_id)
    {
        $renter_rent_info = DB::table('tbl_flat')
            ->select('tbl_house.house_name', 'tbl_flat.house_id', 'tbl_flat.flat_id', 'tbl_flat.flat_name', 'tbl_flat.flat_rent')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_flat.house_id')
            ->where('renter_id', $renter_id)
            ->first();

        return response()->json($renter_rent_info);
    }

    public function month_value_check(Request $request)
    {
        $count = DB::table('tbl_rent')
                    ->whereMonth('rent_month', date('m', strtotime($request->rent_month)))
                    ->whereYear('rent_month', date('Y', strtotime($request->rent_month)))
                    ->where('renter_id', $request->renter_id)
                    ->count();

        return response()->json($count);
    }

    public function rent_details($rent_id)
    {
        $owner_id = auth()->user()->owner_id;
        $rent_details = DB::table('tbl_rent')
            ->select('tbl_rent.*', 'tbl_house.house_name', 'tbl_flat.flat_name', 'tbl_renter.renter_name')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_rent.house_id')
            ->join('tbl_flat', 'tbl_flat.flat_id', '=', 'tbl_rent.flat_id')
            ->join('tbl_renter', 'tbl_renter.renter_id', '=', 'tbl_rent.renter_id')
            ->where('tbl_house.owner_id', $owner_id)
            ->where('rent_id', $rent_id)
            ->first();
        return response()->json($rent_details);
    }

}
