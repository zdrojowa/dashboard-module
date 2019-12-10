<div class="flash-message">
    @foreach (['danger', 'warning', 'success', 'info'] as $msg)
        @if(Session::has('alert-' . $msg))
            <div class="alert alert-fill-{{ $msg }}">
                <i class="mdi mdi-alert-circle"></i>
                {{ Session::get('alert-' . $msg) }}
            </div>
        @endif
    @endforeach
</div>
