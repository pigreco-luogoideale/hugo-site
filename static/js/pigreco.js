$(function() {
	// Setup all balloons automatically
	function setup_balloons() {
		// People (static) balloons
		$(".balloonbox .trigger").click(function() {
			var destObj = $(this);
			if (destObj.next().hasClass("shown"))
				return;

			destObj.toggleClass("opaque");

			var classSwitcher = function() {
				var oldShown = $(".balloon.shown");
				destObj.next().next().toggleClass("shown hidden");
				oldShown.toggleClass("shown hidden");
		
				oldShown.prev().prev().toggleClass("opaque");
			};
			if (false) {
				$(".balloonarrow").animate({left: destObj.position().left + 30}, 500, "swing", classSwitcher);
			}
			else {
				$(".balloonarrow").css({left: destObj.position().left + 30}, 500);
				classSwitcher();
			}
		});
		
		// Hover (dynamic balloons
		$(".spantrigger span").hover(function() {
			var name = $(this).attr("data-balloon");
			$(".hoverballoon[data-name=\"" + name + "\"]").css("display", "block");
		}, function() {
			var name = $(this).attr("data-balloon");
			$(".hoverballoon[data-name=\"" + name + "\"]").css("display", "none");
	
		});
	}
	
	setup_balloons();
});
