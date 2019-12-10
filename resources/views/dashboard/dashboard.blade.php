@extends('DashboardModule::base')

@section('title','Dashboard')

@section('stylesheets')
    @parent
@endsection

@section('sidebar')
    @include('DashboardModule::sidebar.index', ['menu' => Selene\Support\Facades\MenuRepository::getPresences()])
@endsection

@section('content')
    <div class="content-wrapper">
        <div class="row">
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Core status</h4>

                        <div id="currentBalanceCircle"></div>
                        <div class="bg-gray-dark d-flex px-3 py-3 mt-3 justify-content-between">
                            <div>
                                <h6 class="font-weight-bold mb-0">Loaded Modules</h6>
                            </div>
                            <div>
                                <h6 class="font-weight-bold mb-0">{{$modules->count()}}/{{count($loadingModules)}}</h6>
                            </div>
                        </div>
                        @foreach($booter->getErrors() as $error)
                            <div class="errors bg-gray-dark d-flex px-3 py-3 mt-3 justify-content-between">
                                <div>
                                    <p class="error-item mb-0">
                                        <i class="mdi mdi-alert-box text-danger"></i>
                                        {{$error}}
                                    </p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card loaded-modules">
                    <div class="card-body">
                        <h4 class="card-title">Availavle Modules</h4>
                        @foreach($modules as $module)
                            <div class="errors bg-gray-dark d-flex px-3 py-3 mt-3 justify-content-between">
                                <div>
                                    <p class="error-item mb-0">
                                        <i class="mdi mdi-bookmark-check text-success"></i>
                                        {{$module->getName()}}
                                    </p>
                                </div>
                                <div>
                                    <p class="error-item mb-0">
                                        Version: {{$module->getVersion()}}
                                    </p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4>Routes list</h4>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Methods</td>
                                    <td>Uri</td>
                                    <td>Controller</td>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($routesNames as $route)
                                    <tr>
                                        <td>{{$route->action['as']}}</td>
                                        <td><code>{{implode(', ', $route->methods)}}</code></td>
                                        <td>{{$route->uri}}</td>
                                        <td><code>{{$route->action['controller']}}</code></td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @javascript('externalModule', $externalModule)
@endsection
