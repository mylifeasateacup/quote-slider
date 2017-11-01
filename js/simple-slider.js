//SimpleSlider is an immediately involved function expression (IIFE)
//It creates a protected scope for our slider code
//Helps us avoid declaring variables in the global scope

const SimpleSlider = (function ($) {

     //initialize global variables
     let slider = {},
          $container,
          $slides,
          $prev,
          $next,
          $dots;

     slider.config = {
     slideDuration: 5000,
     auto: true,
     containerSelector: '#simpleSlider',
     sliderSelector: 'p',
     prevArrowSelector: '.arrows.prev',
     nextArrowSelector: '.arrows.next',
     dotsSelector: '.dot'
     };

     //initialize slider with config
     //this sets everything up
     slider.init = config => {
          //if config provided, merge it with default config
          if (config && typeof(config) == 'object') {
               $.extend(slider.config, config);
          }
          //get slider element
          $container = $(slider.config.containerSelector);
          //get slides
          $slides = $container.find(slider.config.sliderSelector);
          //get prev button element
          $prev = $(slider.config.prevArrowSelector);
          //get next button element
          $next = $(slider.config.nextArrowSelector);
          //get dots container element
          $dots = $(slider.config.dotsSelector);
          // hook up prev button
          $prev.click(slider.prev);
          //hook up next button
          $next.click(slider.next);
          //hook up dots nav
          $dots.each((i, dot) => {
               $(dot).click(() => {
                    slider.setSlideByIndex($dots.index(dot));
               });
          });
          //activate first slide
          $($slides[0]).addClass('activeText');
          //activate first dot
          $($dots[0]).addClass('active');
          //Slide automatically or Nah...
          if (slider.config.auto) autoNext();
     };

     //private function
     function autoNext() {
          setInterval(slider.next, slider.config.slideDuration);
     }

     //Navigate to next slide
     //public method
     slider.next = () => {
          //get active slide
          const activeSlide = $slides.filter('.activeText');
          //get active dot
          const activeDot = $dots.filter('.active');
          //get current index
          const currentIndex = $slides.index(activeSlide);
          //remove active class from active slide and dot
          activeSlide.removeClass('activeText');
          activeDot.removeClass('active');
          //apply activeText class to next slide
          //if on last slide
          if (currentIndex === $slides.length - 1) {
               $($slides[0]).addClass('activeText');
               $($dots[0]).addClass('active');
          } else {
               //make next slide active
               $($slides[currentIndex + 1]).addClass('activeText');
               $($dots[currentIndex + 1]).addClass('active');
          }
     };

     //Navigate to previous slide
     slider.prev = () => {
          //get active slide
          const activeSlide = $slides.filter('.activeText');
          //get active dot
          const activeDot = $dots.filter('.active');
          //get current index
          const currentIndex = $slides.index(activeSlide);
          //remove active class from active slide and dot
          activeSlide.removeClass('activeText');
          activeDot.removeClass('active');
          //apply activeText class to next slide
          //if on first slide, circle back to end
          if (currentIndex === 0) {
               //make last slide active
               $slides[$slides.length - 1].classList.add('activeText');
               $dots[$dots.length - 1].classList.add('active');
          } else {
               //make next slide active
               $($slides[currentIndex - 1]).addClass('activeText');
               $($dots[currentIndex - 1]).addClass('active');
          }
     };

     //Navigate to slide by index
     slider.setSlideByIndex = index => {
          const activeSlide = $slides.filter('.activeText');
          const activeDot = $dots.filter('.active');
          activeSlide.removeClass('activeText');
          activeDot.removeClass('active');
          //make slide at given index active
          $($slides[index]).addClass('activeText');
          $($dots[index]).addClass('active');
     };

     //return the slider object with public methods
     return slider;

}(jQuery)); //pass in any needed global variables
