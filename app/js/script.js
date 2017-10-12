/*if ($('#map').length > 0) {
    /!*yandex map*!/
    var map = new Map();
    map.init({
        selector: '#map2',
        center: 'г. Донецк, ул. Артема 75',
        zoom: 12,
        placemarks: [
            {
                address: 'г. Донецк, ул. Артема 75',
                options: [
                    {key: 'draggable', value: true}
                ],
                properties: [
                    {key: 'hintContent', value: 'Тыц'},
                    {key: 'balloonContentHeader', value: "Предприятия Донецка"},
                    {key: 'balloonContentBody', value: "<h1>ArtCraft</h1>"}
                ]
            },
            {
                address: 'г. Донецк, ул. Артема 100',
                options: [
                    {key: 'draggable', value: true}
                ],
                properties: [
                    {key: 'hintContent', value: 'Пока'}
                ]
            }
        ]
    });
    /!*close yandex map*!/
}*/


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

    /*top-slider*/
    if($('#top-slider').length > 0){
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
    
});