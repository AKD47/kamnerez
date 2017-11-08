if ($('#map').length > 0) {
    var map = new Map();
    map.init({
        selector: '#map',
        center: $('.concreate-adress').html(),
        zoom: 13,
        placemarks: [
            {
                address: $(".concreate-adress").html(),
                options: [
                    {key: 'draggable', value: false},
                    {key: 'iconLayout', value: 'default#image'},
                    {key: 'iconImageHref', value: '/img/icons/map-marker-icon.png'}
                ],
                properties: [
                    {key: 'balloonContentHeader', value: $('.map-placemarks-title').html()}
                ]
            }
        ]
    });
}


$(document).ready(function () {

    /*mobile menu*/
    $(document).on('click', '#mobile-menu', function (event) {
        event.preventDefault();
        var menu = $(this).next('.header__menu');
        $(this).toggleClass('header__trigger--active');
        menu.slideToggle('slow');
        return false;
    });
    /*close*/

    /*header feedback-form*/
    $(document).on('click', '.header__msg', function (event) {
        event.preventDefault();
        var form = $(this).next('.header__callback');
        console.log(form);
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            form.slideUp(400);
        } else {
            $(this).addClass('active');
            form.slideDown(400);
        }
        return false;
    });
    $(document).on('click', '.header__callback--close', function (event) {
        event.preventDefault();
        $('.header__msg').removeClass('active');
        $('.header__callback').slideUp(400);
        return false;
    });
    $(document).on('click', function (e) {
        if ($(e.target).closest('.header__callback').length != 1) {
            $('.header__msg').removeClass('active');
            $('.header__callback').slideUp(400);
        }
    });
    /*close*/

    /*header submenu*/


    $('.header__menu a').mouseover(function () {
       if($(this).next('.header__submenu').length > 0) {
           var submenu = $(this).next('.header__submenu');
           if ($(this).hasClass('show-submenu')) {
               $(this).removeClass('show-submenu');
               submenu.slideUp(400);
           } else {
               $('.header__menu a').removeClass('show-submenu');
               $('.header__submenu').slideUp(400);
               $(this).addClass('show-submenu');
               submenu.slideDown(400);
           }
               
       } 
    });

    /*$(document).on('click', '.header__menu a', function (event) {
        if ($(this).next('.header__submenu').length > 0) {
            event.preventDefault();
            var submenu = $(this).next('.header__submenu');
            if ($(this).hasClass('show-submenu')) {
                $(this).removeClass('show-submenu');
                submenu.slideUp(400);
            } else {
                $('.header__menu a').removeClass('show-submenu');
                $('.header__submenu').slideUp(400);
                $(this).addClass('show-submenu');
                submenu.slideDown(400);
            }
        } else {

        }
    });*/

    $(document).on('click', '.header__submenu--close', function (event) {
        event.preventDefault();
        $(this).parent().prev('.header__menu a').removeClass('show-submenu');
        $(this).closest('.header__submenu').slideUp(400);
        return false;
    });
    $(document).on('click', function (e) {
        if ($(e.target).closest('.header__navigation').length != 1) {
            $('.header__menu a').removeClass('show-submenu');
            $('.header__submenu').slideUp(400);
        }
    });
    /*close*/

    /*top-slider*/
    if ($('#top-slider').length > 0) {
        $('#top-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            arrows: false,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            cssEase: 'linear',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        infinite: true,
                        dots: false
                    }
                }
            ]
        });
    }
    /*close*/

    /*catalog layots tabs*/
    $('.clients__wrapper--box').each(function (i) {
        if (i != 0) {
            $(this).hide(0)
        }
    });
    $(document).on('click', '.clients__tabs a', function (event) {
        event.preventDefault();
        var tabId = $(this).attr('href');
        $('.clients__tabs a').removeClass('active');
        $(this).addClass('active');
        $('.clients__wrapper--box').hide(0);
        $(tabId).fadeIn();
    });
    /*close*/

    $('.catalog__items').slick({
        dots: false,
        infinite: false,
        arrows: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1030,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });

    /*catalog stones tabs*/
    $('.catalog__wrapper--box').each(function (i) {
        if (i != 0) {
            $(this).hide(0)
        }
    });
    $(document).on('click', '.catalog__tabs a', function (event) {
        event.preventDefault();
        var tabId = $(this).attr('href');
        $('.catalog__tabs a').removeClass('active');
        $(this).addClass('active');
        $('.catalog__wrapper--box').hide(0);
        $(tabId).fadeIn(function () {
            $('.catalog__items').slick('refresh');
        });
    });
    /*close*/   
  
    /*go to top*/
    $('#go_top').click(function (event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 1000);
        return false;
    });
    /*close*/
});

;(function ($) {

    var preloader = {
        open: function () {
            $('body').addClass('hidden-overflow');
            $('.js-open').fadeIn('fast');
        },
        close: function () {
            $('body').removeClass('hidden-overflow');
            $('.js-open').fadeOut('fast');
        }
    };

    preloader.open();

    $(window).on('load', function () {
        setTimeout(function () {
            preloader.close();
        }, 400);
    });
})(jQuery);