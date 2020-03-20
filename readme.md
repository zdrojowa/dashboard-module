# DashboardModule

[![Latest Version on Packagist][ico-version]][link-packagist]
[![Total Downloads][ico-downloads]][link-downloads]
[![Build Status][ico-travis]][link-travis]
[![StyleCI][ico-styleci]][link-styleci]

This is where your description should go. Take a look at [contributing.md](contributing.md) to see a to do list.

## Installation

Via Composer

``` bash
$ composer require zdrojowa/dashboardmodule
```

## Usage
1. Add \Selene\Modules\DashboardModule\Providers\DashboardModuleServiceProvider::class in config/app.php 'providers'
2. Add mix.module('DashboardModule', 'vendor/zdrojowa/dashboardmodule'); in webpack.mix.js
3. php artisan vendor:publish --tag=public --force
3. npm run dev

## Change log

Please see the [changelog](changelog.md) for more information on what has changed recently.

## Testing

``` bash
$ composer test
```

## Contributing

Please see [contributing.md](contributing.md) for details and a todolist.

## Security

If you discover any security related issues, please email author email instead of using the issue tracker.

## Credits

- [author name][link-author]
- [All Contributors][link-contributors]

## License

license. Please see the [license file](license.md) for more information.

[ico-version]: https://img.shields.io/packagist/v/zdrojowa/dashboardmodule.svg?style=flat-square
[ico-downloads]: https://img.shields.io/packagist/dt/zdrojowa/dashboardmodule.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/zdrojowa/dashboardmodule/master.svg?style=flat-square
[ico-styleci]: https://styleci.io/repos/12345678/shield

[link-packagist]: https://packagist.org/packages/zdrojowa/dashboardmodule
[link-downloads]: https://packagist.org/packages/zdrojowa/dashboardmodule
[link-travis]: https://travis-ci.org/zdrojowa/dashboardmodule
[link-styleci]: https://styleci.io/repos/12345678
[link-author]: https://github.com/zdrojowa
[link-contributors]: ../../contributors
