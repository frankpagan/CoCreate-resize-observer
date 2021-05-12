import "./style.css";

const coCreateResize = {
    selector: '', //'.resize2','.resize3'
    resizers: [],
    resizeWidgets: [],
    resizeFlag: "none", //LL, RR, TT, BB, LT:Left & Top, LB:Left & Bottom, RT:Right & Top, RB:Right & Bottom
    init: function(handleObj) {
        for (var handleKey in handleObj)
            if (handleObj.hasOwnProperty(handleKey) && handleKey == 'selector')
                this.selector = handleObj[handleKey];
        this.resizers = document.querySelectorAll(this.selector);
        var _this = this;
        this.resizers.forEach(function(resize, idx) {
            let resizeWidget = new CoCreateResize(resize, handleObj);
            // _this.resizeWidgets[idx] = resizeWidget;
        })
    },
}

function CoCreateResize(resizer, options) {
    this.resizeWidget = resizer;
    this.cornerSize = 10;
    this.init(options);
}

CoCreateResize.prototype = {
    init: function(handleObj) {
        if (this.resizeWidget) {
            this.leftDrag = this.resizeWidget.querySelector(handleObj['dragLeft']);
            this.rightDrag = this.resizeWidget.querySelector(handleObj['dragRight']);
            this.topDrag = this.resizeWidget.querySelector(handleObj['dragTop']);
            this.bottomDrag = this.resizeWidget.querySelector(handleObj['dragBottom']);
            this.resizeState = 'none';
            this.bindListeners();
            this.initResize();
        }
    },

    initResize: function() {
        this.addListenerMulti(this.leftDrag, 'mousemove touchmove', this.checkLeftCorner);
        this.addListenerMulti(this.rightDrag, 'mousemove touchmove', this.checkRightCorner);
        this.addListenerMulti(this.topDrag, 'mousemove touchmove', this.checkTopCorner);
        this.addListenerMulti(this.bottomDrag, 'mousemove touchmove', this.checkBottomCorner);
    },

    initDrag: function(e) {
        this.processIframe();
        this.resizeState = 'resize'; // Current resize state
        this.startTop = parseInt(document.defaultView.getComputedStyle(this.resizeWidget).top, 10);
        this.startHeight = parseInt(document.defaultView.getComputedStyle(this.resizeWidget).height, 10);
        this.startLeft = parseInt(document.defaultView.getComputedStyle(this.resizeWidget).left, 10);
        this.startWidth = parseInt(document.defaultView.getComputedStyle(this.resizeWidget).width, 10);
        if (e.touches)
            e = e.touches[0];
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.prevY = 0;
        this.prevX = 0;
        this.addListenerMulti(document.documentElement, 'mousemove touchmove', this.doDrag);
        this.addListenerMulti(document.documentElement, 'mouseup touchend', this.stopDrag);

        this.removeListenerMulti(this.leftDrag, 'mousemove touchmove', this.checkLeftCorner);
        this.removeListenerMulti(this.rightDrag, 'mousemove touchmove', this.checkRightCorner);
        this.removeListenerMulti(this.topDrag, 'mousemove touchmove', this.checkTopCorner);
        this.removeListenerMulti(this.bottomDrag, 'mousemove touchmove', this.checkBottomCorner);
    },

    doDrag: function(e) {
        let cHeightValue, cWidthValue, width, height;
        let top = parseInt(document.defaultView.getComputedStyle(this.resizeWidget).top, 10);
        let left = parseInt(document.defaultView.getComputedStyle(this.resizeWidget).left, 10);
        if (e.touches)
            e = e.touches[0];
        cWidthValue = e.clientX - this.startX;
        cHeightValue = e.clientY - this.startY;
        if (this.resizeFlag[0] == 'L') cWidthValue = -cWidthValue;
        if (this.resizeFlag[1] == 'T') cHeightValue = -cHeightValue;
        width = this.startWidth + cWidthValue;
        height = this.startHeight + cHeightValue;
        if (!(left < 10 && this.resizeFlag[0] == 'L' && e.clientX - this.prevX < 0)) {
            if (width >= 10 && (this.resizeFlag[0] == 'L' || this.resizeFlag[0] == 'R')) this.resizeWidget.style.width = width + 'px';
            if (this.resizeFlag[0] == 'L' && width >= 10) this.resizeWidget.style.left = parseInt(this.startLeft - cWidthValue, 10) + 'px';
            this.prevX = e.clientX;
        }
        if (!(top < 10 && this.resizeFlag[1] == 'T' && e.clientY - this.prevY < 0)) {
            if (height >= 10 && (this.resizeFlag[1] == 'T' || this.resizeFlag[1] == 'B')) this.resizeWidget.style.height = height + 'px';
            if (this.resizeFlag[1] == 'T' && height >= 10) this.resizeWidget.style.top = parseInt(this.startTop - cHeightValue, 10) + 'px';
            this.prevY = e.clientY;
        }
    },

    stopDrag: function(e) {
        this.resizeState = 'none';
        this.resizeWidget.querySelectorAll('iframe').forEach(function(item) {
            item.style.pointerEvents = null;
        });
        this.removeListenerMulti(document.documentElement, 'mousemove touchmove', this.doDrag);
        this.removeListenerMulti(document.documentElement, 'mouseup touchend', this.stopDrag);
        this.addListenerMulti(this.leftDrag, 'mousemove touchmove', this.checkLeftCorner);
        this.addListenerMulti(this.rightDrag, 'mousemove touchmove', this.checkRightCorner);
        this.addListenerMulti(this.topDrag, 'mousemove touchmove', this.checkTopCorner);
        this.addListenerMulti(this.bottomDrag, 'mousemove touchmove', this.checkBottomCorner);
    },

    checkLeftCorner: function(e) {
        if (this.resizeState == 'none') {
            let offsetY, scrollTop = document.documentElement.scrollTop;
            if (e.touches)
                e = e.touches[0];
            offsetY = e.clientY - this.getTopDistance(this.topDrag) + scrollTop;
            this.leftDrag.style.cursor = 'e-resize';
            this.resizeFlag = "LL";
            if (offsetY < this.cornerSize) {
                this.leftDrag.style.cursor = 'se-resize';
                this.resizeFlag = 'LT';
            }
            else {
                offsetY = this.getTopDistance(this.bottomDrag) - e.clientY - scrollTop;
                if (offsetY < this.cornerSize) {
                    this.leftDrag.style.cursor = 'ne-resize';
                    this.resizeFlag = "LB";
                }
                else this.leftDrag.style.cursor = 'e-resize';
            }
            this.stopAllDragListener();
            this.addListenerMulti(this.leftDrag, 'mousedown touchstart', this.initDrag);
        }
    },

    checkRightCorner: function(e) {
        if (this.resizeState == 'none') {
            let offsetY, scrollTop = document.documentElement.scrollTop;
            if (e.touches)
                e = e.touches[0];
            offsetY = e.clientY - this.getTopDistance(this.topDrag) + scrollTop;
            this.rightDrag.style.cursor = 'e-resize';
            this.resizeFlag = "RR";
            if (offsetY < this.cornerSize) {
                this.rightDrag.style.cursor = 'ne-resize';
                this.resizeFlag = 'RT';
            }
            else {
                offsetY = this.getTopDistance(this.bottomDrag) - e.clientY - scrollTop;
                if (offsetY < this.cornerSize) {
                    this.rightDrag.style.cursor = 'se-resize';
                    this.resizeFlag = "RB";
                }
                else this.rightDrag.style.cursor = 'e-resize';
            }
            this.stopAllDragListener();
            this.addListenerMulti(this.rightDrag, 'mousedown touchstart', this.initDrag);
        }
    },

    checkTopCorner: function(e) {
        if (this.resizeState == 'none') {
            let offsetX, scrollLeft = document.documentElement.scrollLeft;
            if (e.touches)
                e = e.touches[0];
            offsetX = e.clientX - this.getLeftDistance(this.leftDrag) + scrollLeft;
            this.topDrag.style.cursor = 's-resize';
            this.resizeFlag = "TT";
            if (offsetX < this.cornerSize) {
                this.topDrag.style.cursor = 'se-resize';
                this.resizeFlag = 'LT';
            }
            else {
                offsetX = this.getLeftDistance(this.rightDrag) - e.clientX - scrollLeft;
                if (offsetX < this.cornerSize) {
                    this.topDrag.style.cursor = 'ne-resize';
                    this.resizeFlag = "RT";
                }
                else this.topDrag.style.cursor = 's-resize';
            }
            this.stopAllDragListener();
            this.addListenerMulti(this.topDrag, 'mousedown touchstart', this.initDrag);
        }
    },

    checkBottomCorner: function(e) {
        if (this.resizeState == 'none') {
            let offsetX, scrollLeft = document.documentElement.scrollLeft;
            if (e.touches)
                e = e.touches[0];
            offsetX = e.clientX - this.getLeftDistance(this.leftDrag) + scrollLeft;
            this.bottomDrag.style.cursor = 's-resize';
            this.resizeFlag = "BB";
            if (offsetX < this.cornerSize) {
                this.bottomDrag.style.cursor = 'ne-resize';
                this.resizeFlag = 'LB';
            }
            else {
                offsetX = this.getLeftDistance(this.rightDrag) - e.clientX - scrollLeft;
                if (offsetX < this.cornerSize) {
                    this.bottomDrag.style.cursor = 'se-resize';
                    this.resizeFlag = "RB";
                }
                else this.bottomDrag.style.cursor = 's-resize';
            }
            this.stopAllDragListener();
            this.addListenerMulti(this.bottomDrag, 'mousedown touchstart', this.initDrag);
        }
    },

    bindListeners: function() {
        this.initDrag = this.initDrag.bind(this);
        this.doDrag = this.doDrag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);

        this.checkLeftCorner = this.checkLeftCorner.bind(this);
        this.checkRightCorner = this.checkRightCorner.bind(this);
        this.checkTopCorner = this.checkTopCorner.bind(this);
        this.checkBottomCorner = this.checkBottomCorner.bind(this);

    },

    // Get an element's distance from the top of the page
    getTopDistance: function(elem) {
        var location = 0;
        if (elem.offsetParent) {
            do {
                location += elem.offsetTop;
                elem = elem.offsetParent;
            } while (elem);
        }
        return location >= 0 ? location : 0;
    },

    // Get an element's distance from the left of the page
    getLeftDistance: function(elem) {
        var location = 0;
        if (elem.offsetParent) {
            do {
                location += elem.offsetLeft;
                elem = elem.offsetParent;
            } while (elem);
        }
        return location >= 0 ? location : 0;
    },

    // Bind multiiple events to a listener
    addListenerMulti: function(element, eventNames, listener) {
        var events = eventNames.split(' ');
        for (var i = 0, iLen = events.length; i < iLen; i++) {
            element.addEventListener(events[i], listener, false);
        }
    },

    // Remove multiiple events from a listener
    removeListenerMulti: function(element, eventNames, listener) {
        var events = eventNames.split(' ');
        for (var i = 0, iLen = events.length; i < iLen; i++) {
            element.removeEventListener(events[i], listener, false);
        }
    },

    stopAllDragListener: function() {
        this.removeListenerMulti(this.leftDrag, 'mousemove touchmove', this.initDrag);
        this.removeListenerMulti(this.rightDrag, 'mousemove touchmove', this.initDrag);
        this.removeListenerMulti(this.topDrag, 'mousemove touchmove', this.initDrag);
        this.removeListenerMulti(this.bottomDrag, 'mousemove touchmove', this.initDrag);
    },
    processIframe: function() {
        this.resizeWidget.querySelectorAll('iframe').forEach(function(item) {
            item.style.pointerEvents = 'none';
        });
    }
}

export default coCreateResize;
