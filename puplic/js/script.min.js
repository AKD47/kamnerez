if ($('#map').length > 0) {
    ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [56.002819, 37.802068],
            zoom: 13
        });
        myPlacemark = new ymaps.Placemark([56.002819, 37.802068], {});
        myMap.geoObjects.add(myPlacemark);
    }
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


    if (window.innerWidth > 1024) {
        $('.header__menu > li > a').mouseover(function () {
            var submenu = $(this).next('.header__submenu');
            $('.header__menu > li > a').removeClass('show-submenu');
            $('.header__submenu').slideUp(400);
            $(this).addClass('show-submenu');
            submenu.slideDown(400);
        });
    }
    $(document).on('click', '.mobile-submenu', function (event) {
        event.preventDefault();
        var submenu = $(this).closest('a').next('.header__submenu');
        if ($(this).hasClass('show-mobile-submenu')) {
            $(this).removeClass('show-mobile-submenu');
            submenu.slideUp(400);
        } else {
            $(this).addClass('show-mobile-submenu');
            submenu.slideDown(400);
        }
    });

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
            zIndex: 1,
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

    /*offer mobile slider and works slider*/
    $(window).on('load resize', function () {
        offerSlider();
        worksSlider();
    });
    /*close*/


    /*sliders in tabs*/
    $(window).on('load', function () {
        /*clients slider*/
        $('.clients__items').slick({
            dots: false,
            infinite: false,
            arrows: true,
            speed: 300,
            zIndex: 1,
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

        /*catalog items slider*/
        $('.catalog__items').slick({
            dots: false,
            infinite: false,
            arrows: true,
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 1,
            zIndex: 1,
            responsive: [
                {
                    breakpoint: 1030,
                    settings: {
                        arrows: false
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
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
    });
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
        $(tabId).fadeIn(function () {
            $('.clients__items').slick('refresh');
        });
    });
    /*close*/

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

    /*---forms---*/
    /*header form*/
    $('#header-form-name, #header-form-email, #header-form-text').unbind().blur(function () {

        var id = $(this).attr('id');
        var val = $(this).val();

        switch (id) {
            case 'header-form-name':
                var rv_name = /^[a-zA-Zа-яА-Я]+$/;
                if (val.length > 2 && val != '' && rv_name.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'header-form-email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (val != '' && rv_email.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'header-form-text':
                if (val != '' && val.length < 5000) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

        } // end switch(...)

    }); // end blur()
    $('#header-form').submit(function (event) {
        event.preventDefault();
        var name = $('#header-form-name').val(),
            mail = $('#header-form-email').val(),
            message = $('#header-form-text').val();
            $.ajax({
                url: myajax.url,
                type: "POST",
                data: {
                    action: 'headfeedback',
                    name: name,
                    mail: mail,
                    message: message
                },
                success: function (data) {
                    $('#header-form input:text, textarea').val('').removeClass('error, not_error').text('');
                    $('.header__msg').removeClass('active');
                    $('.header__callback').slideUp(400);
                }
            }); // end ajax({...})
            return false;  
    }); // end submit()
    /*close*/
    
    /*main page feedback*/
    $('#feedback-main-name, #feedback-main-email, #feedback-main-text').unbind().blur(function () {

        var id = $(this).attr('id');
        var val = $(this).val();

        switch (id) {
            case 'feedback-main-name':
                var rv_name = /^[a-zA-Zа-яА-Я]+$/;
                if (val.length > 2 && val != '' && rv_name.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'feedback-main-email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (val != '' && rv_email.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'feedback-main-text':
                if (val != '' && val.length < 5000) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

        } // end switch(...)

    }); // end blur()
    $('#feedback-main').submit(function (event) {
        event.preventDefault();
        var name = $('#feedback-main-name').val(),
            mail = $('#feedback-main-email').val(),
            message = $('#feedback-main-text').val();
        $.ajax({
            url: myajax.url,
            type: "POST",
            data: {
                action: 'mainfeedback',
                name: name,
                mail: mail,
                message: message
            },
            success: function (data) {
                $('#feedback-main input:text, textarea').val('').removeClass('error, not_error').text('');               
            }
        }); // end ajax({...})
        return false;
    }); // end submit()
    /*close*/
    
    /*contacts-form*/
    $('#contacts-form-name, #contacts-form-email, #contacts-form-text').unbind().blur(function () {

        var id = $(this).attr('id');
        var val = $(this).val();

        switch (id) {
            case 'contacts-form-name':
                var rv_name = /^[a-zA-Zа-яА-Я]+$/;
                if (val.length > 2 && val != '' && rv_name.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'contacts-form-email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (val != '' && rv_email.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'contacts-form-text':
                if (val != '' && val.length < 5000) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

        } // end switch(...)

    }); // end blur()
    $('#contacts-form').submit(function (event) {
        event.preventDefault();
        var name = $('#contacts-form-name').val(),
            mail = $('#contacts-form-email').val(),
            message = $('#contacts-form-text').val();
        $.ajax({
            url: myajax.url,
            type: "POST",
            data: {
                action: 'contacts',
                name: name,
                mail: mail,
                message: message
            },
            success: function (data) {
                $('#contacts-form input:text, textarea').val('').removeClass('error, not_error').text('');
            }
        }); // end ajax({...})
        return false;
    }); // end submit()
    /*close*/
});

//preloader
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

//offer slider for mobile
function offerSlider() {
    if ($(document).width() < 679) {
        $('#offer-mobile-slider').slick({
            dots: true,
            infinite: true,
            arrows: true,
            speed: 300,
            zIndex: 1,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }
};

//our works slider for mobile
function worksSlider() {
    if ($(document).width() < 679) {
        $('#works-slider').slick({
            dots: true,
            infinite: true,
            arrows: true,
            speed: 300,
            zIndex: 1,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }
};