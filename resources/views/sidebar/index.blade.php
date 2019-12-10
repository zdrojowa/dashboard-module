<nav class="sidebar">
    <div class="sidebar--content">
        <div class="sidebar--logo">
            <img src="{{ asset('/vendor/img/DashboardModule/zdrojowa-invest-hotels.svg') }}" alt="">
        </div>

        <ul class="nav">
            <li class="nav-item account">
                <img src="{{ asset('/vendor/img/DashboardModule/icons/user.svg') }}" alt="avatar">
                <p>{{Auth::user()->name}}</p>
            </li>
            <li class="nav-item nav-category">
                <p class="navigation--title">Nawigacja</p>
            </li>
            @foreach($menu as $modulesMenu)
                @include('DashboardModule::sidebar.modules-menu', ['modulesMenu' => $modulesMenu])
            @endforeach
        </ul>
    </div>
</nav>
