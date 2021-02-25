@foreach($menuItems as $menuItem)
    @permission($menuItem->getPermission())
        <b-list-group-item variant="secondary"
            @if(!$menuItem->hasChildren())
                @if(url()->current() === route($menuItem->getRoute())) active @endif
                href="{{ route($menuItem->getRoute()) }}"
            @else
                v-b-toggle="'{{ $menuItem->getName() }}'"
            @endif
        >
            @if ($menuItem->getIcon())
                <b-icon-{{ $menuItem->getIcon() }}></b-icon-{{ $menuItem->getIcon() }}>
            @endif
            {{ $menuItem->getName() }}
        </b-list-group-item>
        @if($menuItem->hasChildren())
            <b-collapse id="{{ $menuItem->getName() }}">
                <b-list-group>
                    @include('DashboardModule::sidebar.menu-items', ['menuItems' => $menuItem->getChildren()])
                </b-list-group>
            </b-collapse>
        @endif
    @endpermission
@endforeach
