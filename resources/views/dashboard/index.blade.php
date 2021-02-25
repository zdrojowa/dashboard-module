@extends('DashboardModule::base')

@section('title', $title ?? '')

@section('stylesheets')
    @parent
@endsection

@section('navbar')
    @include('DashboardModule::navbar.index', ['menu' => Selene\Support\Facades\MenuRepository::getPresences()])
@endsection

@section('content')

@endsection
