<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


use DB;

class HouseOwnerSingupController extends Controller
{

    public function index()
    {
        return view('houserent');
    }

    public function store_admin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'owner_name' => 'required',
            'owner_email' => 'required|email',
            'owner_phone' => 'required',
            'owner_nid' => 'required',
            'owner_nid_copy' => 'required|file',
            'owner_address' => 'required',
            'password' => 'required|confirmed',
        ]);

        // return response()->json($validator->errors());

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $owner_photo_path = $request->file('owner_photo')->move('upload/image/houseowner', $request->file('owner_photo')->getClientOriginalName());
        $owner_photo = 'upload/image/houseowner/' . $request->file('owner_photo')->getClientOriginalName();

        $nid_folder_path = $request->file('owner_nid_copy')->move('upload/image/houseowner', $request->file('owner_nid_copy')->getClientOriginalName());
        $nid_copy = 'upload/image/houseowner/' . $request->file('owner_nid_copy')->getClientOriginalName();

        $owner_data['owner_photo'] = $owner_photo;
        $owner_data['nid_scan'] = $nid_copy;
        $owner_data['full_name'] = $request->owner_name;
        $owner_data['email'] = $request->owner_email;
        $owner_data['mobile'] = $request->owner_phone;
        $owner_data['nid'] = $request->owner_nid;
        $owner_data['address'] = $request->owner_address;
        $owner_data['password']  = bcrypt($request->password);
        $owner_data['is_active'] = 1;
        $owner_data['created_at'] = date('Y-m-d H:i:s');

        DB::table('tbl_owner')->insert($owner_data);
        return 200;
    }

    public function dashboard_info()
    {
        $owner_id = auth()->user()->owner_id;

        $count_house = DB::table('tbl_house')->where('owner_id', $owner_id)->count();
        $count_flat = DB::table('tbl_flat')->where('owner_id', $owner_id)->count();
        $empty_flat = DB::table('tbl_flat')->where('owner_id', $owner_id)->where('renter_id', 0)->count();
        $total_balance = DB::table('tbl_balance')->where('owner_id', $owner_id)->get();
        // $total_renter = DB::table('tbl_renter')->where('owner_id', $owner_id)->count();

        return response()->json(['count_house' => $count_house, 'count_flat' => $count_flat, 'empty_flat'=> $empty_flat, 'total_balance' => $total_balance]);
    }
}
