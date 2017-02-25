$(document).ready(function(){	

	var touch = $('.touch-menu');
    var menu_mobile = $('.menu-mobile');
    var subMenuMobile = $('.sub-menu-mobile');
    var price_mobile = $('.price-mobile');
 
       $(touch).on('click', function(e) {
       e.preventDefault();
       menu_mobile.slideToggle();
       subMenuMobile.hide(150);
   });
    

       		$(price_mobile).on('click', function(e){
       			e.preventDefault();
       			subMenuMobile.slideToggle();
       		})
       		
    $(window).resize(function(){
        var wid = $(window).width();
        if(wid > 774 && menu.is(':hidden')) {
            menu.removeAttr('style');
        }
    });

   $("#owl-example").owlCarousel({
   	items: 1,
   	margin: 10,
   	nav: true,
   	navText: false,
   	itemClass: 'slide',
   	loop: true,
   	smartSpeed: 700
   });
   $("#owl-example2").owlCarousel({
   	items: 1,
   	margin: 10,
   	nav: true,
   	navText: false,
   	itemClass: 'slide',
   	loop: true,
   	smartSpeed: 700
   });
   var owl = $('.owl-carousel');
   owl.owlCarousel();
   // Go to the next item
   $('.next').click(function() {
       owl.trigger('next.owl.carousel');
   })
   // Go to the previous item
   $('.prev').click(function() {
       // With optional speed parameter
       // Parameters has to be in square bracket '[]'
       owl.trigger('prev.owl.carousel');
   })

   		 $(".fa-angle-down").click(function() {
   		 	$(".hidden-photo-awards").slideToggle("slow");
   		 	$(this).animate({top: ($(this).css('top') != '150px' ? '150px' : '-10px')}, 500);
   });
   		 $(".main p").equalHeights();

   		 function handler(event) {
   		 	var target = $(event.target);
   		 	if(target.is(".description-mobile button")) {
   		 		target.next().slideToggle("slow");
   		 	}
   		 }
		$(".description-mobile button").click(handler); 

		$('.popup-with-form').magnificPopup({
		   type: 'inline',
		   focus: '#name',
		   removalDelay: 300,
		   mainClass: 'mfp-fade'
		});
		  $("#phone").mask("+7(999) 999-9999");

		  $("#head-2").css({
		  	"min-height":"190px"
		  });
});
