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

<div id="app">
    @yield('navbar')
    <div class="dashboard-content">
        @yield('content')
    </div>
</div>

@yield('javascripts')
</body>
</html>
