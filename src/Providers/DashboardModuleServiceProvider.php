<?php

namespace Selene\Modules\DashboardModule\Providers;

use Illuminate\Support\ServiceProvider;

class DashboardModuleServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([
            __DIR__.'/../../resources/assets/js/dist' => public_path('vendor/js'),
        ], 'public');
    }
}
