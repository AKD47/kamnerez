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

    /*top-slider*/
    if($('#top-slider').length > 0){
        $('#top-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            arrows: true,
            cssEase: 'linear'
        });  
    }    
    /*close*/
    
});