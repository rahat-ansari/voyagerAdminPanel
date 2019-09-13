<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
   // return view('welcome');
    if(Auth::check())
    {
        return View::make('auth.login');
    }

    return redirect('/user/login')->with('message', 'Please Login to access restricted area.');
});
Route::get('/user/login', function () {
        return View::make('auth.login');
});
Route::get('/user/register', function () {
    return View::make('auth.login');
});

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
    Route::resource('user', 'GenralUserController');
    Route::get('/user-exist/{email}', 'GenralUserController@userExist');
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
