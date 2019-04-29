var nameSpace = MBA || {};

( function () {
	"use strict";
	
	var timeline;
	var wrapper, click_through, logo, copy, cta, width, height;
	
	nameSpace.init = function () {
		// Initialize any variables here
		wrapper = nameSpace.$( '#wrapper' );
		click_through = document.getElementById('click_through');

		width = 728;
		height = 90;

		wrapper.addClass( 'show' );

		nameSpace.initClickTag();
		nameSpace.initAnimation();

		if ( nameSpace.useFallback() ) {
			nameSpace.injectFallback();
		} else {
		nameSpace.startAnimation();
		}


		click_through.onmouseover = function () {	
		    TweenMax.to("#arrow", 0.2, { x:2, transformOrigin:"75% 60%", z:0.01, force3D:true, rotationZ: 0.01, transformPerspective: 400});
		};

		click_through.onmouseout = function () {
		    TweenMax.to("#arrow", 0.2, {scale:1, force3D:true, z:0.01, rotationZ: 0.01, transformPerspective: 400, x:0});
		};
	};

	nameSpace.initClickTag = function () {
		click_through.onclick = function () {
			window.open( window.clickTag );
		};		
	};

	nameSpace.injectFallback = function() {
		var body = document.body;

		while ( body.firstChild ) {
			body.removeChild( body.firstChild );
		}

		var anchor = document.createElement('a');
		anchor.style.cursor = 'pointer';

		var img = new Image();
			img.src = './img/static.jpg';

		anchor.appendChild( img );
		anchor.onclick = function() { window.open(window.clickTag); };
		document.body.appendChild( anchor );
	};

	nameSpace.initAnimation = function () {
		// TweenMax can be used to set css
		// It will even take care of browser prefixes
		// TweenMax.set(logo, {x:100, y:50, opacity:0});

		timeline = new TimelineMax( {
			delay: 0.2,
			onComplete: nameSpace.onAnimationComplete
		} );

		

		timeline.pause();
		
		timeline.fromTo("#copy-1", 1., {autoAlpha:0}, {autoAlpha:1, ease:Power2.easeIn})
				.to("#copy-1", 0.5, {autoAlpha:0}, "+=2")
				.fromTo("#copy-2", 1, {autoAlpha:0}, {autoAlpha:1, ease:Power2.easeIn})
				.to("#copy-2", 1, {autoAlpha:0}, "+=2.25")
				.fromTo("#copy-3, #logo", 1, {autoAlpha:0}, {autoAlpha:1, ease:Power2.easeIn})
				.fromTo(["#copy-4", "#cta", "#arrow"], 1, {autoAlpha:0}, {autoAlpha:1, ease:Power2.easeIn},"+=1")



	};

	function startBgImg() {
		TweenMax.fromTo("#bg-img", 7, {x:-100, y:-30}, {y:-30, x:-5, ease:Linear.easeInOut, transformStyle: "preserve-3d", autoAlpha:1, force3D:true, rotationZ: 0.01});
	}

	nameSpace.startAnimation = function () {
		// Code for animation		
		timeline.play();
		TweenMax.delayedCall(0, startBgImg);
	};

	nameSpace.onAnimationComplete = function () {
		// Log duration of timeline
		console.log( 'Animation Duration: ' + timeline.time() + 's' );

		// Show a CTA or any animations outside main timeline

	};
} ) ();