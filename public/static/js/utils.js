(function () {
    'use strict';

    window.getCursorPosition = function(e) {
        var x, y;
        // pageX is a non-standard feature, it may not be available
        if (e.pageX != undefined && e.pageY != undefined) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft;
            y = e.clientY + document.body.scrollTop;
        }
        return {x: x, y: y};
    };

    // Convert a value in an old range to the corresponding value
    // in a new range
    window.convertRange = function (oldMin, oldMax, newMin, newMax, oldValue) {
        var oldRange = (oldMax - oldMin);
        var newRange = (newMax - newMin);
        return (((oldValue - oldMin) * newRange) / oldRange) + newMin;
    };

    // Return value if within bounds, otherwise return corresponding bound
    window.clamp = function(value, low, high) {
        return Math.min(high, Math.max(low, value));
    };

    // Get the mean of two values. On this project, this is used
    // to get the middle value of a range
    window.mean = function(first, second) {
        return (parseFloat(first) + parseFloat(second)) / 2
    };

})();

