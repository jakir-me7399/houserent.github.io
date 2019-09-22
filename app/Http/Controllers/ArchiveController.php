<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ArchiveController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function archive_list()
    {
        $owner_id = auth()->user()->owner_id;
        $archive_list = DB::table('tbl_renter')
            ->select('tbl_renter_archive.*', 'tbl_house.house_name', 'tbl_flat.flat_name', 'tbl_renter.renter_name', 'tbl_renter.renter_profession', 'tbl_renter.phone_number')
            ->join('tbl_renter_archive', 'tbl_renter_archive.renter_id', '=', 'tbl_renter.renter_id')
            ->join('tbl_flat', 'tbl_renter_archive.flat_id', '=', 'tbl_flat.flat_id')
            ->join('tbl_house', 'tbl_renter.house_id', '=', 'tbl_house.house_id')
            ->where('tbl_house.owner_id', $owner_id)
            ->get();
        return response()->json($archive_list);
    }
}
