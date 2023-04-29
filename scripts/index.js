'use strict';

$(document).ready(function () {

    new WOW({
        animateClass: 'animate__animated',
    }).init();


    (function () {
        const header = $('.header');
        window.onscroll = () => {
            if (window.scrollY > 40) {
                header.addClass('header__active');
            } else {
                header.removeClass('header__active');
            }
        };
    }());

    $('.slider').slick({
        dots: true,
        centerMode: true,
        variableWidth: true,
        centerPadding: '100px',
        slidesToShow: 3,
        speed: 500,
        responsive: [
            {
                breakpoint: 880,
                settings: {
                    dots: true,
                    arrows: false,
                    centerMode: true,
                    variableWidth: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: true,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    const allDoc = document.querySelector('html');
    const burger = document.querySelector('.burger');
    const burgerMenu = document.querySelector('#burger-click');
    const burgerMask = document.querySelector('.burger-mask');
    const close = document.querySelector('#cross');
    const menuItem = document.querySelectorAll('.burger-menu-item');
    const download = document.querySelectorAll('.btn__download');
    const showMore = document.querySelector('.projects__more');
    const projects = document.querySelector('.projects__items');
    const elemTop = document.querySelector('.projects__item.top');
    const elemDown = document.querySelector('.projects__item.down');
    const dotsLink = $('.dot_link');
    const techMark = $('.technology__mark');
    const techContainer = $('.technology__container');


    burger.addEventListener('click', () => {
        allDoc.classList.add('noscroll');
        burgerMenu.classList.add('open');
        burgerMask.classList.add('visible');
    });

    close.addEventListener('click', () => {
        allDoc.classList.remove('noscroll');
        burgerMenu.classList.remove('open');
        burgerMask.classList.remove('visible');
    });

    menuItem.forEach((item) => {
        item.onclick = function () {
            if (item.classList.contains('open-link')) {
                return
            } else {
                menuItem.forEach((elem) => {
                    elem.classList.remove('open-link');
                });
                item.classList.add('open-link');
            }
            burgerMenu.classList.remove('open');
            burgerMask.classList.remove('visible');
            allDoc.classList.remove('noscroll');
        }
    });

    $('.open-popup').magnificPopup({
        type: 'image',
    });


    download.forEach((item) => {
        item.onclick = () => {
            let link_address = $(this).attr('href');
            let link = document.createElement('a');
            link.setAttribute('href', link_address);
            let fileName = $(this).text();
            link.setAttribute('download', fileName);
            // link.setAttribute('target','_blank');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    })

    const showMorePro = function (e) {
        if (e.target.textContent.trim() === 'Посмотреть еще 3 проекта') {
            let i = 0;
            while (i !== 3) {
                let newElem = document.createElement('div');
                if (i % 2 === 0) {
                    newElem.innerHTML = elemTop.innerHTML;
                    newElem.classList.add('projects__item');
                    newElem.classList.add('top');
                    projects.append(newElem);
                } else {
                    newElem.innerHTML = elemDown.innerHTML;
                    newElem.classList.add('projects__item');
                    newElem.classList.add('down');
                    projects.append(newElem);
                }
                i++
            }
            e.target.textContent = 'Скрыть добавленные проекты';
        } else {
            let i = 3
            while (i !== 0) {
                projects.children[projects.children.length - 1].remove();
                i--
            }
            e.target.textContent = 'Посмотреть еще 3 проекта';
        }
    }

    showMore.addEventListener('click', showMorePro);

    (() => {
        const name = $('#name');
        const phone = $('#phone');
        const submit = $('#submit');
        const checkPlace = $('#cheking');
        const checking = $('#check-form');
        const checkLabel = $('.check__place');
        const confident = $('.check__place-link');
        const loader = $('.loader');
        const close = $('.cross');
        const formSuccess = $('.success-form');
        const formError = $('.error-form');
        name.val('');
        phone.val('');

        phone.keydown(function (el) {
            let keys = el.key.toString();
            const stamp = '0123456789';
            if (stamp.indexOf(keys) === -1 && keys !== 'Backspace') {
                return false
            }
        });

        loader.click(function () {
            loader.hide()
        });

        close.click(function () {
            formSuccess.hide();
            formError.hide();
            name.show();
            phone.show();
            submit.show();
            checkPlace.show();
            name.val('');
            phone.val('');
            checking.prop('checked', false);
            confident.css('color', 'rgb(255, 255, 255)');
            checkLabel.removeClass('not-check');
        })

        submit.click(function () {
            let hasError = false;

            if (!name.val()) {
                name.next().show();
                name.css('border-color', 'red');
                hasError = true;
            } else {
                name.css('border-color', 'rgb(255, 255, 255)');
                name.next().hide();
            }
            if (!phone.val() || phone.val().length !== 7) {
                phone.next().show();
                phone.css('border-color', 'red');
                hasError = true;
            } else {
                phone.css('border-color', 'rgb(255, 255, 255)');
                phone.next().hide();
            }
            if (!checking.prop('checked')) {
                confident.css('color', 'rgb(255, 0, 0)');
                checkLabel.addClass('not-check');
                hasError = true;
            } else {
                confident.css('color', 'rgb(255, 255, 255)');
                checkLabel.removeClass('not-check');
            }


            if (!hasError) {
                loader.css('display', 'flex');
                $.ajax({
                    method: "POST",
                    url: "http://testologia.site/checkout",
                    data: {name: name.val(), phone: phone.val()}
                })
                    .done(function (msg) {
                        loader.hide()
                        if (msg.success) {
                            formSuccess.css('display', 'flex');
                        } else {
                            formError.css('display', 'flex');
                        }
                        name.hide();
                        phone.hide();
                        submit.hide();
                        checkPlace.hide();
                    });
            }
        })
    })()


    function getText(txt) {
        let txtArr = [];
        for (let i = 0; i < techMark.length; i++) {
            if (techMark.eq(i).hasClass(txt)) {
                txtArr.push(techMark.eq(i).children('.technology__mark__title').text().trim())
                txtArr.push(techMark.eq(i).children('.technology__mark__text').text().trim())
                console.log(txtArr)
                return txtArr
            }
        }
    }

    dotsLink.click(function () {
        techContainer.children('.link-show').remove();
        let innerText;
        let txt;
        let newElem;
        $('.steps__container').css('padding', '10px 0 60px');
        switch (true) {
            case $(this).hasClass('first'):
                txt = 'first';
                innerText = getText(txt);
                newElem = $(`<div class="link-show"><p class="link-show-title">${innerText[0]}</p><p class="link-show-text">${innerText[1]}</p><p class="link-show-arrow" style="left: ${$(this).css('left')}"></p></div>`);
                techContainer.append(newElem);
                break;
            case $(this).hasClass('second'):
                txt = 'second';
                innerText = getText(txt)
                newElem = $(`<div class="link-show"><p class="link-show-title">${innerText[0]}</p><p class="link-show-text">${innerText[1]}</p><p class="link-show-arrow" style="left: ${$(this).css('left')}"></p></div>`)
                techContainer.append(newElem);
                break
            case $(this).hasClass('third'):
                txt = 'third';
                innerText = getText(txt)
                newElem = $(`<div class="link-show"><p class="link-show-title">${innerText[0]}</p><p class="link-show-text">${innerText[1]}</p><p class="link-show-arrow" style="left: ${$(this).css('left')}"></p></div>`)
                techContainer.append(newElem);
                break
            case $(this).hasClass('fourth'):
                txt = 'fourth';
                innerText = getText(txt)
                newElem = $(`<div class="link-show"><p class="link-show-title">${innerText[0]}</p><p class="link-show-text">${innerText[1]}</p><p class="link-show-arrow" style="left: ${$(this).css('left')}"></p></div>`)
                techContainer.append(newElem);
                break
            case $(this).hasClass('fifth'):
                txt = 'fifth';
                innerText = getText(txt)
                newElem = $(`<div class="link-show"><p class="link-show-title">${innerText[0]}</p><p class="link-show-text">${innerText[1]}</p><p class="link-show-arrow" style="left: ${$(this).css('left')}"></p></div>`)
                techContainer.append(newElem);
                break
        }
    })


    /* POPUP ACTION */
    const startExursBtn = $('.cart__btn');
    const exPopup = $('.popup-excurs');
    const excurs = $('.excurs');
    const closePopup = $('.cross-popup');
    const exSubmit = $('#ex-submit');
    // const exForm = $('.excurs-form');
    const checkPlace = $('#ex-checking');
    const chekin = $('#ex-check-form');
    const name = $('#ex-name');
    const phone = $('#ex-phone');
    const exFormSuccess = $('.ex-success-form');
    const exFormError = $('.ex-error-form');
    const loader = $('.loader');
    const exTitle = $('.excurs-title');
    const exClose = $('.ex-cross');
    let flag = false;

    function clsPopup() {
        exPopup.css('display', 'none');
        excurs.css('display', 'none');
        allDoc.classList.remove('noscroll');
        name.show();
        phone.show();
        exSubmit.show();
        chekin.show();
        name.val('');
        phone.val('');
        chekin.prop('checked', false);
    }

    closePopup.click(function () {
        clsPopup();
    })

    startExursBtn.click(function () {
        exPopup.css('display', 'flex');
        excurs.css('display', 'flex');
        allDoc.classList.add('noscroll');
        checkPlace.show();
        chekin.show();
        name.val('');
        phone.val('');
        exFormSuccess.hide();
        exFormError.hide();
    });

    exClose.click(function () {
        if (!flag) {
            clsPopup();
            return
        }
        exFormSuccess.hide();
        exFormError.hide();
    })

    phone.keydown(function (el) {
        let keys = el.key.toString();
        const stamp = '0123456789';
        if (stamp.indexOf(keys) === -1 && keys !== 'Backspace') {
            return false
        }
    });

    loader.click(function () {
        loader.hide()
    });

    exSubmit.click(function () {
        const checkLabel = $('.ex-check__place');
        const confident = $('.ex-check__place-link');
        const loader = $('.loader');


        let hasError = false;

        if (!name.val()) {
            name.next().show();
            name.css('border-color', 'red');
            hasError = true;
        } else {
            name.css('border-color', 'rgb(255, 255, 255)');
            name.next().hide();
        }
        if (!phone.val() || phone.val().length !== 7) {
            phone.next().show();
            phone.css('border-color', 'red');
            hasError = true;
        } else {
            phone.css('border-color', 'rgb(255, 255, 255)');
            phone.next().hide();
        }
        if (!chekin.prop('checked')) {
            confident.css('color', 'rgb(255, 0, 0)');
            checkLabel.addClass('not-check');
            hasError = true;
        } else {
            confident.css('color', 'rgb(255, 255, 255)');
            checkLabel.removeClass('not-check');
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "http://testologia.site/checkout",
                data: {name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.hide()
                    if (msg.success) {
                        exFormSuccess.css('display', 'flex');
                        exTitle.hide();
                        exClose.css('display', 'none');
                    } else {
                        exFormError.css('display', 'flex');
                        flag = true;
                    }
                    name.hide();
                    phone.hide();
                    exSubmit.hide();
                    checkPlace.hide();
                });
        }
    })
});