@extends('DashboardModule::base')

@section('title','Dashboard')

@section('stylesheets')
    @parent
@endsection

@section('navbar')
    @include('DashboardModule::navbar.index', ['title' => 'Dashboard'])
@endsection

@section('content')
    <b-container fluid>
        <b-card header="Availavle Modules" class="mb-2">
            <b-card-text>
                @foreach($modules as $module)
                    <p>
                        <b-icon-check variant="success"></b-icon-check> {{ $module->getName() }}: {{ $module->getVersion() }}
                    </p>
                @endforeach
            </b-card-text>
        </b-card>
        <routes route="{{ route('DashboardModule::api.routes') }}"></routes>
    </b-container>
@endsection

@section('javascripts')
    <script src="{{ mix('vendor/js/DashboardModule.js') }}"></script>
@endsection
