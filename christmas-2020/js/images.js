$(document).ready(function(){
    /*
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
    */
   $('.owl-carousel').owlCarousel({
        autoHeight: true,
        items:1,
        lazyLoad:true,
        loop:true,
        margin:10,
        nav: true,
        navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    });
    $(".items").owlCarousel({
      items : 1,
      lazyLoad : true,
      navigation : true
    }); 
});