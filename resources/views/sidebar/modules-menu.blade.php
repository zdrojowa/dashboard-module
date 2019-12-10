@if(count($modulesMenu->GetChildren()) > 0)
    @include('DashboardModule::sidebar.menu-items', ['menuItems' => $modulesMenu->getChildren()])
@endif
