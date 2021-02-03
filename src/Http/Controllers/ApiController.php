<?php

namespace Selene\Modules\DashboardModule\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Route;

class ApiController extends Controller
{
    public function routes(Request $request): JsonResponse
    {
        return response()->json(Route::getRoutes()->get());
    }
}
