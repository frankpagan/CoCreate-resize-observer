import CoCreateResize from './resize';
import CoCreateResizeObserver from './resize_observer';
import "./style.css";

CoCreateResize.init({
	selector: ".resize1",
	dragLeft: "[data-resize='left']",
	dragRight: "[data-resize='right']",
	dragTop: "[data-resize='top']",
	dragBottom: "[data-resize='bottom']",
});

CoCreateResize.init({
	selector: ".resize2",
	dragLeft: ".resizeleft",
	dragRight: ".resizeright",
	dragTop: ".resizetop",
	dragBottom: ".resizebottom",
});

CoCreateResizeObserver.init({
	selector: ".resize1",
	target: ".target1",
	property: "height", // style property to apply value to
	value: "width", // targets property to get value from
});

CoCreateResizeObserver.init({
	selector: ".resize2",
	target: "#target2",
	property: "margin-left", // style property to apply value to
	value: "height", // targets property to get value from
});
