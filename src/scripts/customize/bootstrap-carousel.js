function hideOrShowCarouselControl($carouselID) {
    // hide left control icon when first slide active or
    // hide right control icon when last slide active 
    const carousel = $($carouselID)
    const carouselInner = carousel.find('.carousel-inner')
    const carouselFistItem = carouselInner.find('>:first-child')
    const carouselLastItem = carouselInner.find('>:last-child')
    const controlPrev = carousel.find('.carousel-control-prev')
    const controlNext = carousel.find('.carousel-control-next')

    // hide conditions of control icon
    function hideControlIcon() {
        if (carouselFistItem.hasClass('active')) {
            controlPrev.css('transform','translateX(-300%)')
            // controlPrev.css('opacity', '0')
            // controlPrev.css('visibility', 'hidden')
        }
        if (carouselLastItem.hasClass('active')) {
            controlNext.css('transform','translateX(300%)')
            // controlNext.css('opacity', '0')
            // controlNext.css('visibility', 'hidden')
        }
    }
    // show conditions of control icon
    function showControlIcon() {
        if (carouselFistItem.hasClass('active')) {
            controlPrev.css('transform','translateX(0)')
            // controlPrev.css('opacity', '1')
            // controlPrev.css('visibility', 'visible')
        }
        if (carouselLastItem.hasClass('active')) {
            controlNext.css('transform','translateX(0)')
            // controlNext.css('opacity', '1')
            // controlNext.css('visibility', 'visible')
        }
    }

    hideControlIcon()

    // hide control icon when the carousel has FINISHED sliding from one item to another
    carousel.on('slid.bs.carousel', function () {
        hideControlIcon()
    });

    // show control icon when occurs when the carousel IS ABOUT TO slide from one item to another
    carousel.on('slide.bs.carousel', function () {
        showControlIcon()
    });
}
export { hideOrShowCarouselControl }