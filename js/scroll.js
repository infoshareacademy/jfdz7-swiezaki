$(document).ready(function(){

    const $navLinks = $('nav a, .startup-sign-in-short-pos a');
    const animationScrollTime = 700;
    const $page = $('html, body');

    const $signInHeight = $('#startup-sign-in').offset().top - 200;
    const $descriptionHeight = $('#description').offset().top - 200;
    const $premiereCounterHeight = $('#premiere-counter').offset().top;
    const $aboutUsHeight = $('#about-us').offset().top - 200;
    const $contactHeight = $('#contact').offset().top - 500;

    const $topNavLinks = $('nav, a');
    const $signInLink = $('nav a').eq(1);
    const $descriptionLink = $('nav a').eq(2);
    const $aboutUsLink = $('nav a').eq(3);
    const $contactLink = $('nav a').eq(4);

    const $scrollToTopBtn = $('.return-to-top');
    const effectThreschold = 200;

    const $logoContainerHeight = $('.logo');
    const $menuContainerHeight = $('.menu');
    const $logoImageHeight = $('.logo-img');
    const $logoToggleTheme = $('.logo-toggle-theme');

    function scrollToSection(event) {

        const anchor = $(this).attr('href');
        event.preventDefault();
        $page.animate({
            scrollTop: anchor !== '' ? $(anchor).offset().top : 0
        }, animationScrollTime, function() {
            window.location.hash = anchor;
        });

    }

    function toggleActiveLink() {

        if (scrollY >= $signInHeight && scrollY < $descriptionHeight) {
            $topNavLinks.removeClass('active');
            $signInLink.addClass('active');
        } else if (scrollY >= $descriptionHeight && scrollY < $premiereCounterHeight) {
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

    function showScrollToTopButton() {

        $(window).scrollTop() > effectThreschold ?
            $scrollToTopBtn.fadeIn(300).css('display', 'flex') :
            $scrollToTopBtn.css('display', 'none');

    }

    function scrollToTop() {

        const animationTime = 700;
        $page.animate({ scrollTop: 0}, animationTime);

    }

    const $upperMenuHeightToggle = function () {

        $(window).scrollTop() > effectThreschold ?
            ($menuContainerHeight
                .add($logoContainerHeight)
                .add($logoImageHeight)
                .css('height', 40)
                .css('transition', 'all 0.5s ease-in-out'),
             $logoToggleTheme
                 .css('display', 'block')
                 .css('transition', 'all 0.5s ease-in-out')) :
            ($menuContainerHeight
                .css('height', 80),
             $logoContainerHeight
                 .add($logoImageHeight)
                 .css('height', 78),
             $logoToggleTheme
                 .css('display', 'none'))
    };

    AOS.init({
        disable: window.innerWidth < 576,
        once: true
    });

    $(window).on('scroll', toggleActiveLink);
    $(window).on('scroll', showScrollToTopButton);
    $scrollToTopBtn.on('click', scrollToTop);
    $navLinks.on('click', scrollToSection);
    $(window).on('scroll', $upperMenuHeightToggle);
});
