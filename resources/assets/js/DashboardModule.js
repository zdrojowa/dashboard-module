window.$ = window.jQuery = jQuery = $ = require('jquery');

require('jquery-ui');

window.select2 = require('select2');

require('select2/dist/js/i18n/pl');
require('bootstrap');
require('nouislider');
require('chosen-js');
require('dropify');

window.Swal = require('sweetalert2');

require('./components/ZdrojowaTable/ZdrojowaTable');
require('./components/CircleBar/script');

$(function () {


    $.fn.collapseLink = function (siblingsEl) {
        if ($(this)[0] !== siblingsEl.siblings('.collapse')[0]) {
            $(this).slideUp(150, 'swing').removeClass('show');
            $(this).siblings('.nav-link').addClass('collapsed');
        }
    };


    $('.nav-link.active').each(function () {
        const closest = $(this).closest('div.collapse');
        closest.slideDown(150, 'swing').addClass('show');
        closest.siblings('a.nav-link.collapsed').removeClass('collapsed').addClass('active');
    });

    $('.nav-link').click(function () {
        $('.collapse.show').collapseLink($(this));

        if ($(this).hasClass('collapsed')) {
            $(this).siblings('.collapse').slideDown(150, 'swing').addClass('show');
            $(this).removeClass('collapsed');
        } else {
            $(this).siblings('.collapse.show').slideUp(150, 'swing').removeClass('show');
            $(this).addClass('collapsed');
        }
    });


    $(".nav-link").hover(function () {
        const parent = $(this).parent().parent().parent().parent();

        if (parent.hasClass('nav-item')) {
            parent.find(".nav-link").eq(0).addClass("hover-active");
        }
    }, function () {
        const parent = $(this).parent().parent().parent().parent();

        if (parent.hasClass('nav-item')) {
            parent.find(".nav-link").eq(0).removeClass("hover-active");
        }
    });

});
(function($) {
    $.fn.button = function(action) {
        if (action === 'loading' && this.data('loading-text')) {
            this.data('original-text', this.html()).html(this.data('loading-text')).prop('disabled', true);
        }
        if (action === 'reset' && this.data('original-text')) {
            this.html(this.data('original-text')).prop('disabled', false);
        }
    };
}(jQuery));
