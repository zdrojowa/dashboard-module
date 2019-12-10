@foreach($menuItems as $menuItem)
    @permission($menuItem->getPermission())
    <li class="nav-item menu-items">
        @if($menuItem->hasChildren())
            <a href="javascript:;" class="nav-link collapsed">
                <span class="menu-icon">
                    <i class="{{ $menuItem->getIcon() }}"></i>
                </span>
                <span class="link-title">{{ $menuItem->getName() }}</span>
                <i class="mdi mdi-chevron-up"></i>
            </a>
            <div class="collapse">
                <ul>
                    @include('DashboardModule::sidebar.menu-items', ['menuItems' => $menuItem->getChildren()])
                </ul>
            </div>
        @else
            <a href="{{ route($menuItem->getRoute()) }}" class="nav-link @if(url()->current() === route($menuItem->getRoute())) active @endif">
                @if($menuItem->getIcon())
                    <span class="menu-icon">
                       <i class="{{ $menuItem->getIcon() }}"></i>
                    </span>
                @endif
                <span class="link-title">{{ $menuItem->getName() }}</span>
            </a>
        @endif
    </li>
    @endpermission
@endforeach
