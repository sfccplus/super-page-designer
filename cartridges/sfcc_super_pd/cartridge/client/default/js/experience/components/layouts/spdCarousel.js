var carouselInstances = $('.spd-carousel-layout .swiper');

carouselInstances.each(function () {
    $(this)
        .find('.swiper-wrapper')
        .find('> div')
        .wrap('<div class="swiper-slide"></div>');

    var swiperConfig = $(this).data('swiperconfig');
    if (swiperConfig) {
        new window.SPDSwiper($(this).get(0), swiperConfig);
    } else {
        new window.SPDSwiper($(this).get(0), {
            slidesPerView: 1.6,
            rewind: true,
            loop: false,
            autoHeight: true,
            centerInsufficientSlides: true,
            centeredSlidesBounds: true,
            breakpoints: {
                768: {
                    slidesPerView: 2.7,
                },
            },
        });
    }
});
