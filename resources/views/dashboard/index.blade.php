@extends('DashboardModule::base')

@section('title','Dashboard')

@section('stylesheets')
    @parent
@endsection

@section('sidebar')
    @include('DashboardModule::sidebar.index', ['menu' => Selene\Support\Facades\MenuRepository::getPresences()])
@endsection

@section('content')

@endsection
