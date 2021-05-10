function CoCreateResizeObserver(selector, target, property, value)
{
	this.selector = selector;
	this.target = target;
	this.property = property;
	this.value = value;
}

// New ResizeObserver for observing
 CoCreateResizeObserver.prototype = {
	
	init: function(container) {
		let mainContainer = container || document;
		if (!mainContainer.querySelectorAll) {
			return;
		}
		
	},
	
	resizeObserver: function() {

	}
}
  
export default CoCreateResizeObserver;