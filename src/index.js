const CoCreateResizeObserver = {
    selector: null,
    target: null,
    property: null,
    value: null,

    init: function(option) {
        this.selector = option.selector;
        this.target = option.target;
        this.property = option.property;
        this.value = option.value;

        const selectorElem = document.querySelector(this.selector);
        const targetElem = document.querySelector(this.target);
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                targetElem.style[this.value] =
                    Math.max(1.5, entry.contentRect[this.property] / 200) + "rem";
            }
        });
        resizeObserver.observe(selectorElem);
    },
};

export default CoCreateResizeObserver;