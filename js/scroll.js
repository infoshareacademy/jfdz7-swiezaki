$(document).ready(function(){
    var $navLinks = $('nav a, .startup-sign-in-short-pos a');
    var animationScrollTime = 700;
    var $page = $('html, body');

    function scrollToSection(event) {
        var anchor = $(this).attr('href');
        event.preventDefault();

        $page.animate({
            scrollTop: anchor !== '' ? $(anchor).offset().top : 0
        }, animationScrollTime, function() {
            window.location.hash = anchor;
        });
    }

    $navLinks.on('click', scrollToSection);
});
