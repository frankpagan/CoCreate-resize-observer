const CoCreateResizeObserver = {
  
	init: function(container) {
		let mainContainer = container || document;
		if (!mainContainer.querySelectorAll) {
			return;
		}
		
		// 3 properties used in this task
		// rElements are target
		let rElements = mainContainer.querySelectorAll('[data-namespace], [data-room]');
		let rProperty = '';
		let rValue = '';
		
	}
}

// 
// CoCreateResizeObserver.prototype.

CoCreateResizeObserver.init();

export default CoCreateResizeObserver;