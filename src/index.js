/*global ResizeObserver*/
import observer from "@cocreate/observer";

function init() {
    let elements = document.querySelectorAll('[resize-selector]');
    initElements(elements);
}

function initElements(elements) {
    for (let element of elements)
        initElement(element);
}

function initElement(element) {
    let targetSelector = element.getAttribute('resize-selector');
    let property = element.getAttribute('resize-property');
    let value = element.getAttribute('resize-value');
    let targets = document.querySelectorAll(targetSelector);

    element.resizeObserver = { targets, property, value };
    initResizeObserver(element);
}

function initResizeObserver(element) {
    const resizeObserver = new ResizeObserver(() =>
        updateTargets(element)
    );
    resizeObserver.observe(element);
}

function updateTargets(element) {
    try {
        let targets = element.resizeObserver.targets;
        let property = element.resizeObserver.property;
        let propertyValue = element.resizeObserver.value;
        let value = window.getComputedStyle(element).getPropertyValue(propertyValue);
        for (let target of targets)
            target.style[property] = value;
    } catch (error) {
        console.log('resizeObserver:' + error); // Error handling
    }
}

observer.init({
    name: 'CoCreateResizeObserver',
    observe: ['addedNodes'],
    target: '[resize-selector]',
    callback: function (mutation) {
        initElement(mutation.target);
    }
});

observer.init({
    name: 'CoCreateResizeObserver',
    observe: ['attributes'],
    attributeName: ['resize-selector'],
    callback: function (mutation) {

    }
});

init();

export default { init };
