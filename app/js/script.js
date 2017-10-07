if ($('#map').length > 0) {
    /*yandex map*/
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
    /*close yandex map*/
}


$(document).ready(function () {

    /*header mobile menu*/
    $(document).on('click', '#header-burger', function (event) {
        var pull = $('#header-burger'),
            menu = $('.header__nav');
        event.preventDefault();
        if (pull.hasClass('show')) {
            pull.removeClass('show');
            menu.slideUp('fast');
        } else {
            pull.addClass('show');
            menu.slideDown('fast');
        }
    });
    if (window.innerWidth < 670) {
        $(document).on('click', function (e) {
            if ($(e.target).closest('.header__navigation').length != 1) {
                $('.header__nav').slideUp('fast');
                $('#burger').removeClass('show');
            }
        });
    }
    /*close header mobile menu*/

    /*animate scroll menu*/
    $(document).on('click', '.nav-top a', function (event) {/*функция прокрутки на блок страницы при клике по элементам меню */
        event.preventDefault();
        var href = $(this).attr('href');
        var target = $(href);
        var top = target.offset().top;
        $('html,body').animate({scrollTop: top}, 1000);
        return false;
    });
    /*close animate scroll menu*/

    /*block animation*/
    var windowHeight = $(window).height();//переменная для определения высоты окна
    var elements = $('.how'),//блок элементов
        item = $('.how__box--item');//скрытый елемент

    $(window).scroll(function () {//при прокрутке окна
        if (($(this).scrollTop() + windowHeight) >= elements.offset().top) {//до начала блока с классом how
            item.each(function (i) {//функция задержки появления каждого элемента
                $(this).delay((i++) * 500).fadeTo(1000, 1);
            });
        }
    });
    /*close block animation*/   

    /*top-form validation*/
    if (document.getElementById('top-form')) {
        var validation = new Validation();
        validation.init({
            ajax: true,
            ajaxUrl: myajax.url,
            classItem: "main-form__field",//елемент, который нужно провалидировать
            eventElement: '#top-form-submit',//событие по клику кнопки 'Отправить'
            items: [//масив объектов
                {
                    item: 'email', tpl: 'email', tplMsg: 'некорректный e-mail'//объект эл.почта с сообщением о некорректном вводе
                },
                {
                    item: 'name', tpl: 'kir+lat', tplMsg: 'только буквы'//объект имя с сообщением о некорректном вводе
                },
                {
                    item: 'phone', tpl: 'number', tplMsg: 'только цыфры'//объект имя с сообщением о некорректном вводе
                },
                {
                    item: 'obj', tpl: 'kir+lat', tplMsg: 'только буквы'//объект имя с сообщением о некорректном вводе
                },
                {
                    item: 'time', tpl: 'kir+lat', tplMsg: 'только буквы'//объект имя с сообщением о некорректном вводе
                }
            ],
            ajaxSubmitSuccess: function (responseText, err, form) {

                var formData = new FormData(form);//объявляем новую FormData
                formData.append('action', 'getmessage');//задаем действие и значение
                if (!err) {
                    $.ajax({
                        url: myajax.url,
                        type: "POST",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            console.log(data);
                            if (data.result === 'success') {
                                form.reset();
                            } else {
                                alert('Некорректно заполнено!!')
                            }
                        }
                    });
                    return false;
                }
                return false;
            }
        });
    }
    /*top-form validation*/

    /*fileinput script*/
    $('#fileinput-1').fileinput();
    /*close fileinput script*/

    /*scroll block*/
    var element = $('#sidebar');//елемент, который необходимо сделать фиксированным
    if (element.length > 0) {//проверка наличия элемента на странице
        var elementPosition = element.offset().top;//определяем позицию элемента относительно верха документа
        $(window).scroll(function () {//при прокрутке окна браузера
            fixedScroll(element,
                elementPosition, $('#footer'));//вызывается функция с заданными селекторами
        });
    }
    /*close scroll block*/

    /*add form fields in wrapper*/
    $(document).on('click', '.add-field', function (event) {
        event.preventDefault();
        var wrapper = $(this).closest('.cabinet__add-company-form--wrapper').next('.cabinet__add-company-form--hover-wrapper'),//влок в который добовляются поля 
            count = wrapper.attr('data-count');//счетчик 

        if (count < 10) { //условие на максимум 10 полей
            $(this).closest('.cabinet__add-company-form--wrapper').next('.cabinet__add-company-form--hover-wrapper').attr('data-count', parseInt(count) + 1);//увеличиваем счетчик на 1 
            $(wrapper).append('<div class="cabinet__add-company-form--hover-elements">' +
                '<p class="cabinet__add-company-form--title"></p>' +
                '<input class="cabinet__add-company-form--field" type="text" name="mytext[]">' +
                '<a href="#" class="show-more remove-field">удалить</a>' +
                '<p class="cabinet__add-company-form--notice"></p>' +
                '</div>');//добавляем поля            
        }

    });
    $(document).on('click', '.remove-field', function (event) {
        event.preventDefault();
        var wrapper = $(this).closest('.cabinet__add-company-form--hover-wrapper'),//влок в который добовляются поля 
            addedBox = $(this).closest('.cabinet__add-company-form--hover-elements'),//элементы, которые добавляются
            count = wrapper.attr('data-count');//счетчик             
        addedBox.remove();
        wrapper.attr('data-count', parseInt(count) - 1);//увеличиваем счетчик на 1        
    });
    /*close add form fields in wrapper*/

    /*find img-tag in text block and wraps it up in "a"-tag*/
    $('.business__descr p').find('img').each(function () {
        $(this).addClass('newsImg');
        $(this).wrap('<a href="' + $(this).attr('src') + '" data-lightbox="image-1"></a>');
        $(this).css({width: '100%', height: '100%'});
    });
    /*close find img in text block and wraps it up in "a"-tag*/
});

function fixedScroll(element, elementPosition, blockElement) {//функция фиксированногоблока, с селекторами элемента, его позиционирования и преграждающего блока
    var top = $(document).scrollTop(),//значение отступа прокрутки сверху для первого элемента
        blockingElement = blockElement.offset().top,//позиция блокирующего блока отностительно верха документа
        height = element.outerHeight();//высота элемента, включающая внутренние и внешние отступы
    if (top > elementPosition && top < blockingElement - height) {//
        element.addClass('fixed').removeAttr("style");
    }
    else if (top > blockingElement - height) {
        element.removeClass('fixed').css({'position': 'absolute', 'bottom': '50px', 'right': '0'});
    }
    else {
        element.removeClass('fixed');
    }
}