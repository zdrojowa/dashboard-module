<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <title>@yield('title')</title>

    <link rel="stylesheet" href="{{ mix('vendor/css/DashboardModule.css','') }}">

    @yield('stylesheets')
</head>
<body>

<div class="dashboard-container">
    @yield('sidebar')
    <div class="dashboard-content">
        @yield('content')
    </div>
</div>

<script src="{{ asset('vendor/js/jquery.js') }}"></script>
<script src="{{ asset('vendor/js/jquery-ui.min.js') }}"></script>
<script src="{{ asset('vendor/js/select2.full.min.js') }}"></script>
<script src="{{ asset('vendor/js/select2.pl.js') }}"></script>
<script src="{{ mix('vendor/js/DashboardModule.js', '') }}"></script>

@yield('javascripts')
</body>
</html>
