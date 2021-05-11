// "use strict";
import observer from "@cocreate/observer";

let _this;

const CoCreateResizeObserver = {
    observer: [], //.target1, #target2
    observerWidgets: [],
    targets: [],
    targetWidgets: [],

    init: function(handleObj) {
        for (var handleKey in handleObj) {
            if (handleObj.hasOwnProperty(handleKey) && handleKey == 'selector') {
                this.observerWidgets = document.querySelectorAll(handleObj[handleKey])
                continue;
            }
            if (handleObj.hasOwnProperty(handleKey) && handleKey == 'target') {
                this.targetWidgets = document.querySelectorAll(handleObj[handleKey]);
                continue;
            }
        }
        _this = this;
        this.observerWidgets.forEach(function(observer, i) {
            _this.observer = observer;
            _this.targetWidgets.forEach(function(target, index) {
                _this.target = target;
                if (observer == document.querySelector(target.dataset.resize_target)) {
                    _this.property = target.dataset.resize_property;
                    _this.value = target.dataset.resize_value;
                    new coCreateResizeObserver(_this);
                }
            })
        });
    }
}

function coCreateResizeObserver({ observer, target, property, value }) {
    this.observer = observer;
    this.target = target;
    this.property = property ? property : "margin-left";
    this.value = value ? value : "width";
    this.init();
}

coCreateResizeObserver.prototype = {
    init: function() {
        if (this.observer) {
            let __this = this;
            observer.init({
                name: 'ResizeObserverInit',
                observe: ['attributes'],
                include: __this.observer,
                callback: function(mutation) {
                    let changeValue = mutation.target.style[__this.value];
                    __this.doChange(changeValue);
                }
            })
        }
    },

    doChange: function(val) {
        this.target.style[this.property] = val;
    },

}

export default CoCreateResizeObserver;