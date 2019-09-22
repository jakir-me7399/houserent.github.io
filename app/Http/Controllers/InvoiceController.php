<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class InvoiceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function invoice($invoice_id)
    {
        $owner_id = auth()->user()->owner_id;
        $invoice_data = DB::table('tbl_rent')
            ->select('tbl_rent.*', 'tbl_owner.full_name', 'tbl_owner.mobile', 'tbl_house.house_name', 'tbl_house.house_address', 'tbl_flat.flat_name', 'tbl_renter.renter_name', 'tbl_renter.phone_number')
            ->join('tbl_owner', 'tbl_owner.owner_id', '=', 'tbl_rent.owner_id')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_rent.house_id')
            ->join('tbl_flat', 'tbl_flat.flat_id', '=', 'tbl_rent.flat_id')
            ->join('tbl_renter', 'tbl_renter.renter_id', '=', 'tbl_rent.renter_id')
            ->where('tbl_rent.rent_id', $invoice_id)
            ->where('tbl_rent.owner_id', $owner_id)
            ->first();

        return response()->json($invoice_data);
    }
}
