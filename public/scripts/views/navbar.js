$(document).ready(function() {
    $.each($('.navbar .nav-pages').find('li'), function() {
        $(this).toggleClass('active', $(this).find('a').attr('href') == window.location.pathname);
    }); 
});