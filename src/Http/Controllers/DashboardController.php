<?php

namespace Selene\Modules\DashboardModule\Http\Controllers;

use Illuminate\Routing\Controller;
use Selene\Support\Facades\ModuleManager;

class DashboardController extends Controller
{
    public function index()
    {
        return view('DashboardModule::dashboard.dashboard', [
            'modules' => ModuleManager::getModules()
        ]);
    }
}
