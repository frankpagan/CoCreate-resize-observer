const CoCreateResizeObserver = {
  
	init: function(container) {
		let mainContainer = container || document;
		if (!mainContainer.querySelectorAll) {
			return;
		}
		
		// 3 properties used in this task
		// rElements are target
		this.rElements = mainContainer.querySelectorAll('[data-namespace], [data-room]');
		this.rProperty = '';
		this.rValue = '';
		
	}

	// initElement: function()
}

// New ResizeObserver for observing
 CoCreateResizeObserver.prototype.resizeObserver = new ResizeObserver(entries => {
	for (let entry of entries) {
	  if(entry.contentBoxSize) {
		console.log(entry.contentBoxSize.inlineSize);
		// h1Elem.style.fontSize = Math.max(1.5, contentBoxSize.inlineSize / 200) + 'rem';
		// pElem.style.fontSize = Math.max(1, contentBoxSize.inlineSize / 600) + 'rem';
	  } else {
		  console.log(entry.contentRect.width);
		// h1Elem.style.fontSize = Math.max(1.5, entry.contentRect.width / 200) + 'rem';
		// pElem.style.fontSize = Math.max(1, entry.contentRect.width / 600) + 'rem';
	  }
	}
	
	console.log('Size changed');
  });
  
  resizeObserver.observe(divElem);

//Main Execute
CustomResizeObserver = new CoCreateResizeObserver();
CustomResizeObserver.init();
CustomResizeObserver.resizeObserver(CustomResizeObserver.rElements);

export default CoCreateResizeObserver;