$(document).ready(function(){
    $('.items').slick({
        infinite: true,
        dots: true,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-next">&#10094</button>',
        nextArrow: '<button type="button" class="slick-next">&#10095</button>',
        lazyLoad: 'ondemand',
        //lazyLoad: 'progressive',
        slidesToShow: 1,
        slidesToScroll: 1
    });
});