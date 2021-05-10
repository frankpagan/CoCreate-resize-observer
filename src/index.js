const CoCreateResizeObserver = {
	selector: null, 
	target: null, 
	property: null, 
	value: null, 
	
	init: function (selector, target, property, value) {
	  this.selector = selector
	  this.target = target
	  this.property = property
	  this.value = value
	  //data-resize_element
	  const divElem = document.querySelector(this.selector); //"#resizable"
  
	  //data-resize_target="#id"
	  const h1Elem = document.querySelector(this.target);
  
	  const resizeObserver = new ResizeObserver((entries) => {
		for (let entry of entries) {
		  const contentBoxSize = Array.isArray(entry.contentBoxSize)
			? entry.contentBoxSize[0]
			: entry.contentBoxSize;
  
		  h1Elem.style[this.value] =
			Math.max(1.5, entry.contentRect[this.property] / 200) + "rem";
		}
	  });
	  resizeObserver.observe(divElem);
	},
  };
  
  export default CoCreateResizeObserver;
  