<b-navbar toggleable="lg" type="dark" variant="info">
    @include('DashboardModule::sidebar.index', ['menu' => Selene\Support\Facades\MenuRepository::getPresences()])
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item active>{{ $title ?? '' }}</b-nav-item>
            @yield('navbar-links')
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
            @yield('navbar-actions')
            <b-nav-item>
                <b-avatar text="{{ Auth::user()->name[0] }}" class="mr-3" variant="primary"></b-avatar>
                <span class="mr-auto">{{ Auth::user()->name }}</span>
            </b-nav-item>
        </b-navbar-nav>
    </b-collapse>
</b-navbar>