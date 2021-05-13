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

        if (this.targetWidgets.length == 0) {
            this.targetWidgets = document.querySelectorAll('[data-resize_target]');
        }

        if (this.observerWidgets.length == 0) {
            for (var targetWidget of this.targetWidgets) {
                this.observerWidgets = document.querySelectorAll(targetWidget.dataset.resize_target)
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
                else {
                    _this.property = handleObj['property']
                    _this.value = handleObj['value'];
                    new coCreateResizeObserver(_this);
                }
            })
        });
    }
}

function coCreateResizeObserver({ observer, target, property, value }) {
    this.observer = target.dataset.resize_target;
    this.selector = observer;
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
                name: 'CoCreateResizeObserver',
                observe: ['attributes'],
                include: __this.observer,
                callback: function(mutation) {
                    let changeValue = window.getComputedStyle(mutation.target).getPropertyValue(__this.value);
                    __this.doChange(changeValue);
                }
            })
        }
        else {
            let resizeObserver = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    if (entry.contentBoxSize) {
                        this.doChange(window.getComputedStyle(this.selector).getPropertyValue(this.value));
                    }
                }
            })
            resizeObserver.observe(this.selector);
        }
    },

    doChange: function(val) {
        this.target.style[this.property] = val;
    },

}

CoCreateResizeObserver.init();
export default CoCreateResizeObserver;
