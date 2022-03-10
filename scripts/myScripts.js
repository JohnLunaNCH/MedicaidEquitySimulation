//This manages the animation of page advancement and document height per number of pages activated

var scrollDuration = 3000; //this controls the speed of the page advvancing animation
var chapter = 1;

function addHeight(obj) {
	chapter += 1;
	var container = document.getElementsByClassName("container")[0];
	var h = chapter * 100;
   h -= ((chapter - 1) * 10);
	container.style.height = h + "vh";
   //console.log("container height equals: " + h);
   if (obj){
   	obj.classList.add('hidden');
   }

	scrollBy(container, (window.innerHeight * (chapter - 1)), scrollDuration, easeInOutCubic)	
}

function scrollBy(element, value, duration, easingFunc) {
   var startTime;
   var startPos = window.scrollY;
   var clientHeight = window.innerHeight;
   var maxScroll = element.scrollHeight - clientHeight;
   var scrollIntendedDestination = value;
   var y;

   // low and high bounds for possible scroll destinations
   var scrollEndValue = Math.min(Math.max(scrollIntendedDestination, 0), maxScroll)

   // create recursive function to call every frame
   var scroll = function(timestamp) {
      startTime = startTime || timestamp;
      var elapsed = timestamp - startTime;
	
	y = startPos + (scrollEndValue - startPos) * easingFunc(elapsed / duration);
	window.scroll({
		top: y,
		behavior: 'instant'
	});
      elapsed <= duration && window.requestAnimationFrame(scroll);
   };
   // call recursive function
   if (startPos != scrollEndValue) window.requestAnimationFrame(scroll);
}

var easeInOutCubic = function(t) {
   return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

var body = document.getElementById("body");
var targetList = document.getElementsByTagName("section");
// document.getElementsByClassName("banner");

body.onscroll = function myFunction () {
   var scrolltotop = document.scrollingElement.scrollTop;
   var windowHeight = window.innerHeight; // * 0.9;
   
   var xvalue = "center";
   var factor = 0.05;  

   for (var i = 0; i < targetList.length; i ++){
      var yvalue = (scrolltotop - (windowHeight * i)) * factor;
      yvalue += (4.15 * i);
      yvalue -= ((834 - windowHeight)/200);
      var position = xvalue + " " + yvalue + "px";
      parralax(targetList[i], position);
   }
}

function parralax (t, position){
  t.style.backgroundPosition = position;
}