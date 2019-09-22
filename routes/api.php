<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/store-admin', 'HouseOwnerSingupController@store_admin');

Route::get('/my-house/{owner_id}', 'HouseController@my_house');
Route::post('/create-house', 'HouseController@create_house');
Route::delete('/delete-house/{house_id}', 'HouseController@destroy_house');
Route::get('/edit-house/{house_id}', 'HouseController@edit_house');
Route::post('/update-house-info', 'HouseController@update_house');
Route::get('/flat-basic-information', 'HouseController@flat_basic');
Route::get('/flat-basic-rent-info/{owner_id}', 'RentController@flat_rentinfo');
Route::get('/renter-info/{renter_id}', 'RentController@renter_rent_info');
Route::post('/rent-month', 'RentController@month_value_check');
Route::get('/my-flat/{owner_id}', 'HouseController@my_all_flat');
Route::get('/house-flat/{house_name_slug}', 'HouseController@flat_list');
Route::get('/edit-flat/{flat_id}', 'HouseController@edit_flat');
Route::post('/update-flat-info', 'HouseController@update_flat');
Route::get('/flat-details/{flat_id}', 'HouseController@flat_details');
Route::post('/create-flat-info', 'HouseController@create_flat');
Route::delete('/delete-flat/{flat_id}', 'HouseController@destroy_flat');
Route::get('/rent-list', 'RentController@rent_list');
Route::get('/house-rent-list/{house_id}', 'RentController@house_rent_list');
Route::get('/flat-rent-list/{flat_id}', 'RentController@flat_rent_list');
Route::get('/monthly-rent-list/{month}/{year}', 'RentController@monthly_rent_list');
Route::get('/rent-details/{rent_id}', 'RentController@rent_details');
Route::post('/flat-rent-store', 'RentController@rent_store');
Route::get('/rent-edit/{rent_id}', 'RentController@edit_rent');
Route::post('/flat-rent-update', 'RentController@update_rent');
Route::delete('/delete-rent-item/{rent_id}', 'RentController@destroy');
Route::get('/renter-house-id', 'RenterController@renter_house_id');
Route::get('/renter-house-id/{flat_id}', 'RenterController@renter_from_flat');
Route::get('/renter-flat-id/{house_id}', 'RenterController@renter_flat_id');
Route::get('/renter-flat-id/{house_id}', 'RenterController@flat_id');
Route::get('/renter-list', 'RenterController@renter_list');
Route::get('/renter-details/{renter_id}', 'RenterController@renter_details');
Route::post('/store-renter', 'RenterController@store_renter_info');
Route::get('/edit-renter/{renter_id}', 'RenterController@edit_renter');
Route::post('/update-renter', 'RenterController@update_renter');
Route::delete('/delete-renter/{renter_id}', 'RenterController@destroy');
Route::get('/renter-transaction/{renter_id}', 'TransactionController@transaction_renter_list');
Route::post('/store-balance', 'TransactionController@store_balance');
Route::post('/store-expense', 'TransactionController@store_expense');
Route::get('/house-balance-list', 'TransactionController@balance_list');
Route::get('/expense-list', 'TransactionController@expense_list');
Route::get('/expense-details/{expense_id}', 'TransactionController@expense_details');
Route::get('/archive-list', 'ArchiveController@archive_list');
Route::get('/invoice/{invoice_id}', 'InvoiceController@invoice');
Route::get('/dashboard-info', 'HouseOwnerSingupController@dashboard_info');

Route::group([
    'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('register', 'AuthController@register');

});
