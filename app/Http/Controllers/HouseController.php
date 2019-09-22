<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;

class HouseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function my_house($owner_id)
    {
        $my_house = DB::table('tbl_house')->where('owner_id', $owner_id)->get();

        return response()->json($my_house);
    }
    public function create_house(Request $request)
    {
        $data['house_name'] = $house_slug = $request->house_name;
        $slug = strtolower($house_slug);
        $slug = str_replace(' ', '-', $slug);
        $data['house_name_slug'] = $slug;
        $data['house_number'] = $request->house_number;
        $data['house_address'] = $request->house_address;
        $data['house_information'] = $request->house_information;
        $data['owner_id'] = $owner_id = $request->owner_id;
        $data['lat'] = 0;
        $data['lon'] = 0;
        $data['created_at'] = date('Y-m-d H:i:s');
        $slug_exits = DB::table('tbl_house')->where('house_name_slug', $slug)->exists();
        $do_update = false;
        if ($slug_exits) {
            $do_update = true;
        }
        $house_id = DB::table('tbl_house')->insertGetId($data);
        if ($do_update) {
            DB::table('tbl_house')->where('house_id', $house_id)->update(['house_name_slug' => $slug . '-' . $house_id]);
        }

        $balance_data['owner_id'] = $owner_id;
        $balance_data['house_id'] = $house_id;
        $balance_data['total_amount_in'] = $total_income = 0;
        $balance_data['total_amount_out'] = $total_invest = 0;
        $balance_data['total_balance'] = $total_income - $total_invest;

        DB::table('tbl_balance')->insert($balance_data);

        return 200;
    }
    public function edit_house($house_id)
    {
        $house_old_info = DB::table('tbl_house')->where('house_id', $house_id)->first();
        return response()->json($house_old_info);
    }

    public function update_house(Request $request)
    {
        $data['house_name'] = $request->house_name;
        $data['house_number'] = $request->house_number;
        $data['house_address'] = $request->house_address;
        $data['house_information'] = $request->house_information;
        $data['lat'] = 0;
        $data['lon'] = 0;
        $data['created_at'] = date('Y-m-d H:i:s');

        DB::table('tbl_house')->where('house_id', $request->house_id)->update($data);
        return 200;
    }

    public function destroy_house($house_id)
    {
        DB::table('tbl_house')->where('house_id', $house_id)->delete();
        return 200;
    }

    public function flat_basic()
    {
        $owner_id = auth()->user()->owner_id;
        $house_list = DB::table('tbl_house')->select('house_id', 'house_name')->where('owner_id', $owner_id)->get();

        return response()->json($house_list);
    }

    public function my_all_flat($owner_id)
    {
        $my_all_flat = DB::table('tbl_flat')
            ->select('tbl_renter.renter_name', 'tbl_house.house_name_slug', 'tbl_flat.renter_id', 'tbl_flat.flat_id', 'tbl_flat.flat_name', 'tbl_flat.flat_rent', 'tbl_house.house_name')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_flat.house_id')
            ->leftJoin('tbl_renter', 'tbl_renter.flat_id', '=', 'tbl_flat.flat_id')
            ->where('tbl_flat.owner_id', $owner_id)
            ->get();
        return response()->json($my_all_flat);
    }

    public function flat_list($house_name_slug)
    {
        $owner_id = auth()->user()->owner_id;
        $my_flat = DB::table('tbl_flat')
            ->select('tbl_renter.renter_name', 'tbl_house.house_name_slug', 'tbl_flat.renter_id', 'tbl_flat.flat_id', 'tbl_flat.flat_name', 'tbl_flat.flat_rent', 'tbl_house.house_name')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_flat.house_id')
            ->leftJoin('tbl_renter', 'tbl_renter.flat_id', '=', 'tbl_flat.flat_id')
            ->where('tbl_house.house_name_slug', $house_name_slug)
            ->where('tbl_flat.owner_id', $owner_id)
            ->get();
        return response()->json($my_flat);
    }

    public function create_flat(Request $request)
    {
        $img_name = [];
        if ($request->hasFile('flat_photo')) {
            foreach ($request->file('flat_photo') as $postimg) {
                $post_img = $postimg->move('upload/image/house/flat', $postimg->getClientOriginalName());
                $img_name[] = 'upload/image/house/flat/' . $postimg->getClientOriginalName();
            }
        }

        $data['owner_id'] = $request->owner_id;
        $data['flat_photo'] = json_encode($img_name);
        $data['renter_id'] = 0;
        $data['house_id'] = $request->house_id;
        $data['flat_name'] = $request->flat_name;
        $data['flat_rent'] = $request->flat_rent;
        $data['flat_bed_room'] = $request->flat_bed_room;
        $data['flat_drawing_room'] = $request->flat_drawing_room;
        $data['flat_dining_room'] = $request->flat_dining_room;
        $data['flat_wash_room'] = $request->flat_wash_room;
        $data['flat_kitchen'] = $request->flat_kitchen;
        $data['flat_balcony'] = $request->flat_balcony;
        $data['flat_window'] = $request->flat_window;
        $data['flat_description'] = $request->flat_description;
        $data['created_at'] = date('Y-m-d H:i:s');

        DB::table('tbl_flat')->insert($data);
        return 200;
    }

    public function edit_flat($flat_id)
    {
        $edit_flat = DB::table('tbl_flat')
            ->select('tbl_house.house_name', 'tbl_renter.renter_name', 'tbl_flat.flat_name', 'tbl_flat.renter_id', 'tbl_flat.house_id', 'tbl_flat.flat_name', 'tbl_flat.flat_rent', 'tbl_flat.flat_bed_room', 'tbl_flat.flat_drawing_room', 'tbl_flat.flat_dining_room', 'tbl_flat.flat_kitchen', 'tbl_flat.flat_wash_room', 'tbl_flat.flat_balcony', 'tbl_flat.flat_window', 'tbl_flat.flat_photo', 'tbl_flat.flat_description')
            ->join('tbl_house', 'tbl_flat.house_id', '=', 'tbl_house.house_id')
            ->leftJoin('tbl_renter', 'tbl_flat.renter_id', '=', 'tbl_renter.renter_id')
            ->where('tbl_flat.flat_id', $flat_id)
            ->first();
        return response()->json($edit_flat);
    }

    public function update_flat(Request $request)
    {
        $old_flat_info  = DB::table('tbl_flat')->where('flat_id', $request->flat_id)->first();
        $img_name = [];
        if ($request->hasFile('flat_photo')) {
            foreach ($request->file('flat_photo') as $postimg) {
                $post_img = $postimg->move('upload/image/house/flat', $postimg->getClientOriginalName());
                $img_name[] = 'upload/image/house/flat/' . $postimg->getClientOriginalName();
            }
        }

        if (count($img_name) > 0) {
            $old_images = json_decode($old_flat_info->flat_photo);
            foreach ($old_images as $a) {
                unlink($a);
            }
            $data['flat_photo'] = json_encode($img_name);
        }

        $data['owner_id'] = 1;
        $data['renter_id'] = $request->renter_id;
        $data['house_id'] = $request->house_id;
        $data['flat_name'] = $request->flat_name;
        $data['flat_rent'] = $request->flat_rent;
        $data['flat_bed_room'] = $request->flat_bed_room;
        $data['flat_drawing_room'] = $request->flat_drawing_room;
        $data['flat_dining_room'] = $request->flat_dining_room;
        $data['flat_wash_room'] = $request->flat_wash_room;
        $data['flat_kitchen'] = $request->flat_kitchen;
        $data['flat_balcony'] = $request->flat_balcony;
        $data['flat_window'] = $request->flat_window;
        $data['flat_description'] = $request->flat_description;
        $data['created_at'] = date('Y-m-d H:i:s');

        DB::table('tbl_flat')->where('flat_id', $request->flat_id)->update($data);
        return 200;
    }

    public function my_flat($house_name_slug)
    {
        $house_id = DB::table('tbl_house')->where('house_name_slug', $house_name_slug)->first();

        $my_flat = DB::table('tbl_flat')
            ->select('tbl_renter.renter_name', 'tbl_flat.renter_id', 'tbl_flat.flat_id', 'tbl_flat.flat_name', 'tbl_flat.flat_rent', 'tbl_house.house_name')
            ->join('tbl_house', 'tbl_house.house_id', '=', 'tbl_flat.house_id')
            ->leftJoin('tbl_renter', 'tbl_renter.flat_id', '=', 'tbl_flat.flat_id')
            // ->where('tbl_flat.owner_id', $house_id->owner_id)
            // ->where('tbl_flat.house_id', $house_id->house_id)
            ->get();
        return response()->json($my_flat);
    }

    public function destroy_flat($flat_id)
    {
        DB::table('tbl_flat')->where('flat_id', $flat_id)->delete();
        return 200;
    }

    public function flat_details($flat_id)
    {
        $flat_details = DB::table('tbl_flat')
            ->select('tbl_flat.*', 'tbl_house.house_name', 'tbl_owner.full_name', 'tbl_renter.renter_name', 'tbl_renter.renter_photo', 'tbl_renter.phone_number', 'tbl_renter.members')
            ->join('tbl_owner', 'tbl_flat.owner_id', '=', 'tbl_owner.owner_id')
            ->leftJoin('tbl_renter', 'tbl_flat.renter_id', '=', 'tbl_renter.renter_id')
            ->join('tbl_house', 'tbl_flat.house_id', '=', 'tbl_house.house_id')
            ->where('tbl_flat.flat_id', $flat_id)
            ->first();
        return response()->json($flat_details);
    }
}
