<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
         return view('home');
        // if (Auth::user()->hasRole('admin'))
        /*$isAdmin = Auth::user()->hasRole('admin');
        if ($isAdmin) {
            return view('home');
        } else {
            return view('home');
        }*/
    }
}
