<b-button v-b-toggle.sidebar-1 variant="primary" class="mr-3">Sidebar</b-button>
<b-sidebar id="sidebar-1" title="Sidebar" bg-variant="secondary" text-variant="light">
    <b-list-group>
        @foreach($menu as $modulesMenu)
            @if(count($modulesMenu->GetChildren()) > 0)
                @include('DashboardModule::sidebar.menu-items', ['menuItems' => $modulesMenu->getChildren()])
            @endif
        @endforeach
    </b-list-group>
</b-sidebar>