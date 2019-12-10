<?php

namespace Selene\Modules\DashboardModule\Http\Controller;

use Illuminate\Routing\Controller;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Selene\Contracts\Booter\Booter;
use Selene\Support\Config\Config;
use Selene\Support\Enums\Core\Core;
use Selene\Support\Facades\ModuleManager;

class DashboardController extends Controller
{
    public function index(Booter $booter)
    {
        $modules = ModuleManager::getModules();
        $loadingModule = Config::get(Core::MODULES);
        $externalModule = $modules->count() / count($loadingModule);
        /** @var RouteCollection $routeNameList */
        $routeNameList = Route::getRoutes();

        return view('DashboardModule::dashboard.dashboard', [
            'modules' => $modules,
            'externalModule' => $externalModule,
            'loadingModules' => $loadingModule,
            'routesNames' => $routeNameList->getRoutesByName(),
            'booter' => $booter,
        ]);
    }
}
