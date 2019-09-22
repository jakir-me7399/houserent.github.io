<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;

class RenterController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function renter_house_id()
    {
        $owner_id = auth()->user()->owner_id;
        $house_list = DB::table('tbl_house')
            ->select('house_name', 'house_id')
            ->where('owner_id', $owner_id)
            ->get();

        return response()->json($house_list);
    }

    public function renter_flat_id($house_id)
    {
        $flat_list = DB::table('tbl_flat')->select('flat_name', 'flat_id')->where('house_id', $house_id)->where('renter_id', 0)->get();

        return response()->json($flat_list);
    }
    public function flat_id($house_id)
    {
        $flat_list = DB::table('tbl_flat')->select('flat_name', 'flat_id')->where('house_id', $house_id)->get();

        return response()->json($flat_list);
    }

    public function renter_list()
    {
        $owner_id = auth()->user()->owner_id;
        $renter_list = DB::table('tbl_renter')
            ->select('tbl_house.house_name', 'tbl_flat.renter_id', 'tbl_renter.renter_id', 'tbl_renter.renter_name', 'tbl_renter.phone_number', 'tbl_renter.permanent_address', 'tbl_flat.flat_name')
            ->join('tbl_flat', 'tbl_flat.flat_id', '=', 'tbl_renter.flat_id')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_renter.house_id')
            ->where('tbl_house.owner_id', $owner_id)
            ->where('tbl_flat.renter_id', '>', 0)
            ->get();

        return response()->json($renter_list);
    }

    public function renter_details($renter_id)
    {
        $renter_details = DB::table('tbl_renter')
            ->select('tbl_renter.*', 'tbl_flat.flat_name')
            ->join('tbl_flat', 'tbl_flat.flat_id', '=', 'tbl_renter.flat_id')
            ->where('tbl_renter.renter_id', $renter_id)
            ->first();

        return response()->json($renter_details);
    }

    public function store_renter_info(Request $request)
    {
        $renter_image_path = $request->file('renter_photo')->move('upload/image/renter', $request->file('renter_photo')->getClientOriginalName());
        $renter_photo = 'upload/image/renter/' . $request->file('renter_photo')->getClientOriginalName();
        $nid_scan = $request->file('nid_scan')->move('upload/image/renter', $request->file('nid_scan')->getClientOriginalName());
        $nid_scan_copy = 'upload/image/renter/' . $request->file('nid_scan')->getClientOriginalName();
        $renter_data['flat_id'] = $request->flat_id;
        $renter_data['house_id'] = $request->house_id;
        $renter_data['renter_name'] = $request->renter_name;
        $renter_data['renter_photo'] = $renter_photo;
        $renter_data['nid_scan'] = $nid_scan_copy;
        $renter_data['members'] = $request->members;
        $renter_data['members_description'] = $request->members_description;
        $renter_data['nid'] = $request->nid;
        $renter_data['permanent_address'] = $request->permanent_address;
        $renter_data['old_address'] = $request->old_address;
        $renter_data['renter_profession'] = $request->renter_profession;
        $renter_data['phone_number'] = $request->phone_number;
        $renter_data['enter_date'] = $request->enter_date;
        $renter_data['left_date'] = $request->left_date;
        $renter_data['created_at'] = date('Y-m-d H:i:s');

        $renter_id = DB::table('tbl_renter')->insertGetId($renter_data);

        DB::table('tbl_flat')->where('flat_id', $request->flat_id)->update(['renter_id' =>  $renter_id]);

        return 200;
    }

    public function edit_renter($renter_id)
    {
        $edit_renter = DB::table('tbl_renter')
            ->select('tbl_flat.flat_name', 'tbl_renter.*')
            ->join('tbl_flat', 'tbl_renter.renter_id', '=', 'tbl_flat.renter_id')
            ->where('tbl_renter.renter_id', $renter_id)
            ->first();

        return response()->json($edit_renter);
    }

    public function update_renter(Request $request)
    {
        $old_renter_info = DB::table('tbl_renter')->where('renter_id', $request->renter_id)->first();

        $renter_image_path = $request->file('renter_photo')->move('upload/image/renter', $request->file('renter_photo')->getClientOriginalName());
        $renter_photo = 'upload/image/renter/' . $request->file('renter_photo')->getClientOriginalName();
        if ($renter_photo) {
            $old_renter_photo = $old_renter_info->renter_photo;
            unlink($old_renter_photo);
            $renter_data['renter_photo'] = $renter_photo;
        }
        $nid_scan = $request->file('nid_scan')->move('upload/image/renter', $request->file('nid_scan')->getClientOriginalName());
        $nid_scan_copy = 'upload/image/renter/' . $request->file('nid_scan')->getClientOriginalName();
        if ($nid_scan_copy) {
            $old_nid_scan_copy = $old_renter_info->nid_scan;
            unlink($old_nid_scan_copy);
            $renter_data['nid_scan'] = $nid_scan_copy;
        }
        $renter_data['flat_id'] = $request->flat_id;
        $renter_data['renter_name'] = $request->renter_name;
        $renter_data['members'] = $request->members;
        $renter_data['members_description'] = $request->members_description;
        $renter_data['nid'] = $request->nid;
        $renter_data['permanent_address'] = $request->permanent_address;
        $renter_data['old_address'] = $request->old_address;
        $renter_data['renter_profession'] = $request->renter_profession;
        $renter_data['phone_number'] = $request->phone_number;
        $renter_data['enter_date'] = $request->enter_date;
        $renter_data['left_date'] = $request->left_date;
        $renter_data['created_at'] = date('Y-m-d H:i:s');

        DB::table('tbl_renter')->where('renter_id', $request->renter_id)->update($renter_data);

        return 200;
    }

    public function destroy($renter_id)
    {
        $archive_renter = DB::table('tbl_renter')->where('renter_id', $renter_id)->first();
        DB::table('tbl_renter')->where('renter_id', $renter_id)->update(['status' => 0]);

        $data['flat_id'] = $archive_renter->flat_id;
        $data['renter_id'] = $archive_renter->renter_id;
        $data['enter_date'] = $archive_renter->created_at;
        $data['enter_date'] = $archive_renter->created_at;
        $data['left_date'] = date('Y-m-d H:i:s');
        $data['feedback'] = 0;

        DB::table('tbl_renter_archive')->insert($data);

        DB::table('tbl_flat')->where('renter_id', $archive_renter->renter_id)->update(['renter_id' => 0]);

        return 200;
    }

    public function renter_from_flat($flat_id)
    {
        $house_info = DB::table('tbl_flat')
            ->select('tbl_house.house_id', 'tbl_house.house_name', 'tbl_flat.flat_id', 'tbl_flat.flat_name')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_flat.house_id')
            ->where('flat_id', $flat_id)
            ->first();

        return response()->json($house_info);
    }
}
