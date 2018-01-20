$(document).ready(function(){

    const $navLinks = $('nav a, .startup-sign-in-short-pos a');
    const animationScrollTime = 700;
    const $page = $('html, body');

    //*************** SMOOTH SCROLL *******************

    function scrollToSection(event) {
        const anchor = $(this).attr('href');
        event.preventDefault();

        $page.animate({
            scrollTop: anchor !== '' ? $(anchor).offset().top : 0
        }, animationScrollTime, function() {
            window.location.hash = anchor;
        });
    }

    $navLinks.on('click', scrollToSection);

    //*************** TOGGLE ACTIVE LINKS **********

    const $signInHeight = $('#startup-sign-in').offset().top - 200;
    const $descriptionHeight = $('#description').offset().top - 200;
    const $updateCounterHeight = $('#update-counter').offset().top;
    const $aboutUsHeight = $('#about-us').offset().top - 200;
    const $contactHeight = $('#contact').offset().top - 500;

    // Works better with - 200 for each, otherwise class would switch too late
    // -500 in contact because on desktops scroll can't reach #contact height

    const $topNavLinks = $('nav, a');
    const $signInLink = $('nav a').eq(1);
    const $descriptionLink = $('nav a').eq(2);
    const $aboutUsLink = $('nav a').eq(3);
    const $contactLink = $('nav a').eq(4);

    function toggleActiveLink() {

        if (scrollY >= $signInHeight && scrollY < $descriptionHeight) {
            $topNavLinks.removeClass('active');
            $signInLink.addClass('active');
        } else if (scrollY >= $descriptionHeight && scrollY < $updateCounterHeight) {
            $topNavLinks.removeClass('active');
            $descriptionLink.addClass('active');
        } else if (scrollY >= $aboutUsHeight && scrollY < $contactHeight) {
            $topNavLinks.removeClass('active');
            $aboutUsLink.addClass('active');
        } else if (scrollY >= $contactHeight) {
            $topNavLinks.removeClass('active');
            $contactLink.addClass('active');
        } else {
            $topNavLinks.removeClass('active');
        }

    }

    $(window).on('scroll', toggleActiveLink);

    const $scrollToTopBtn = $('.return-to-top');

    function showScrollToTopButton() {
        const effectThreschold = 200;

        $(window).scrollTop() > effectThreschold ?
            $scrollToTopBtn.fadeIn(300).css('display', 'flex') :
            $scrollToTopBtn.css('display', 'none');
    }

    function scrollToTop() {
        const animationTime = 700;

        $page.animate({ scrollTop: 0}, animationTime);
    }

    $(window).on('scroll', showScrollToTopButton);
    $scrollToTopBtn.on('click', scrollToTop);

});