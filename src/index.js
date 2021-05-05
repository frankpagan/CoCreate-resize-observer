const CoCreateResizeObserver = {
  
	init: function(container) {
		let mainContainer = container || document;
		if (!mainContainer.querySelectorAll) {
			return;
		}
		
		let elements = mainContainer.querySelectorAll('[data-namespace], [data-room]');
		
	}
}

CoCreateResizeObserver.init();

export default CoCreateResizeObserver;