(function($){

    /*
        KNOB
     */
    window.Knob = function(element, local) {

        this.element = element;
        this.parentDiv = $(element).closest('div.monotron');

        // The full range of the knob is [0, 1]
        this.rangeMin = 0;
        this.rangeMax = 1;
        // The knob initial possition in the middle of the range
        this.position = window.mean(this.rangeMin, this.rangeMax);

        // The range in terms of radian angle from the center of the knob
        this.angleMin = - 5 / 6 * Math.PI;
        this.angleMax = + 5 / 6 * Math.PI;

        this.clicked = false;
        this.mousePos = null;
        this.responsivity = 0.009;

        if (local) {
            this.bindEvents(this);
        }
    };

    Knob.prototype.bindEvents = function(obj){

        this.element.addEventListener('mousedown', function(e){
            // This class is for cursor styling
            obj.parentDiv.addClass('dragging');

            // Add listeners to mouse events while dragging
            obj.clicked = true;
            obj.mousePos = window.getCursorPosition(e);
            document.addEventListener('mouseup', mouseUp);
            document.addEventListener('mousemove', mouseMove);
        });

        this.element.addEventListener('dblclick', function(e){
            // reset the knob on double click.
            // Note: You can't double click and drag right afterwards because
            // the double click will perform a selection. A hack was made for
            // this, consisting on disabling selections for the entire page
            obj.position = 0.5;
            obj.draw();
        });

        var mouseUp = function(e){
            // Stop listening for mouse events once the drag stops
            obj.clicked = false;
            obj.parentDiv.removeClass('dragging');
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("mousemove", mouseMove);
        };

        var mouseMove = function(e){
            // While dragging, get delta and update position of mouse
            var newMousePos = window.getCursorPosition(e);
            var deltaX = newMousePos.x - obj.mousePos.x;
            var deltaY = newMousePos.y - obj.mousePos.y;
            obj.mousePos = newMousePos;

            //Change knob position based on delta and draw
            //'clamp' avoids the knob position from leaving the range
            obj.position = window.clamp(obj.position - (deltaY * obj.responsivity),
                                        obj.rangeMin, obj.rangeMax);
            obj.draw();
        };

    };

    Knob.prototype.draw = function() {
        // Get the amount in radians that the knob needs to be moved from the center
        // so that the position is the correct one.
        var dialAngle = window.convertRange(this.rangeMin, this.rangeMax,
                                            this.angleMin, this.angleMax,
                                            this.position);
        this.element.style.transform = 'rotate(' + dialAngle + 'rad)';
        this.publish();
    };

    Knob.prototype.publish = function() {
        // Send an event with the current knob position
        var event = new CustomEvent('changed', { 'detail': this.position });
        this.element.dispatchEvent(event);
    };

    /*
     KEYBOARD
     */
    window.Keyboard = function(element, local) {

        this.element = element;
        this.parentDiv = $(element).closest('div.monotron');

        // Array of keys currently being pressed. The first one is most
        // recently pressed, and so on.
        this.keysDown = [];

        this.clicked = false;

        if (local) {
            this.bindEvents(this);
        }
    };

    Keyboard.prototype.bindEvents = function(obj){

        // Function for handling both 'keydown', 'mousedown' and 'mouseenter'
        var handleDown = function(key) {
            console.log('key', key);
            // Do nothing if key is not valid
            if (!obj.isValidKey(key)) {
                return;
            }
            // Prepend key if it isn't in the array already, and publish
            if (obj.keysDown.indexOf(key) == -1) {
                obj.keysDown.unshift(key);
                obj.draw();
                obj.publish();
            }
        };

        // Function for handling 'keyup', 'mouseup' and 'mouseleave'
        var handleUp = function(key) {
            // Do nothing if key is not valid
            if (!obj.isValidKey(key)) {
                return;
            }
            // Remove key from keysDown and publish
            obj.keysDown.splice(obj.keysDown.indexOf(key), 1);
            obj.draw();
            obj.publish();
        };

        // Key is pressed down on keyboard.
        window.addEventListener('keydown', function(e) {
            handleDown(e.keyCode);
        });

        // Key is released on keyboard.
        window.addEventListener('keyup', function(e) {
            handleUp(e.keyCode);
        });

        // Mouse is clicked down on keyboard element.
        this.element.addEventListener('mousedown', function(e){
            handlePressKey(e.target);
        });

        var handlePressKey = function(target) {
            console.log('target', target);

            // This is a bit hackish, there is no easy way to retrieve
            // a class name and you can't use data attributes in svg.
            // The idea is to retrieve the keyNumber considering that
            // 'pressed' may also be in the class attribute
            var midiNumber = $(target).attr('class').replace(' pressed', '');

            // Get keyCode from MIDI number
            var keyCode = '';
            for (var prop in Keyboard.dictKey) {
                if (midiNumber == Keyboard.dictKey[prop]) {
                    keyCode = prop;
                    break;
                }
            }
            console.log('got keyCode!', keyCode);
            handleDown(keyCode);

            // Set up information of target to be handled by 'mouseUp'
            obj.clicked = {'target': target, 'keyCode': keyCode};
            document.addEventListener('mouseup', mouseUp);
            target.addEventListener('mouseleave', mouseUp);
            console.log('finished handlePressKey', obj.clicked);

        };

        var mouseUp = function(e){
            console.log('MOUSEUP');
            handleUp(obj.clicked.keyCode);
            document.removeEventListener("mouseup", mouseUp);
            obj.clicked.target.removeEventListener("mouseleave", mouseUp);
            obj.clicked = false;

            // If the mouse left to another key while being clicked, trigger a click event on that one
            if (e.type == 'mouseleave' && $(e.relatedTarget).closest(obj.element).length > 0) {
                console.log('MOUSELEAVE TO WIN');
                handlePressKey(e.relatedTarget);
            }
        };

    };

    Keyboard.prototype.draw = function() {
        // Remove 'pressed' class to all keys
        $(this.element).children().attr('class', function(index, classNames) {
            return classNames.replace('pressed', '');
        });
        // Add class 'pressed' for all the visible pressed keys
        this.keysDown.forEach(function(value){
            if (this.isVisibleKey(value)) {
                $(this.element).children('.' + Keyboard.dictKey[value]).attr('class',
                    function(index, classNames) {
                        return classNames + ' pressed';
                });
            }
        }, this);
    };

    Keyboard.prototype.publish = function() {
        // Send an event with the current knob position.
        var event = new CustomEvent('changed', { 'detail': this.keysDown });
        this.element.dispatchEvent(event);
    };

    // Check if the key corresponds to a MIDI note.
    Keyboard.prototype.isValidKey = function(key) {
        return Keyboard.dictKey.hasOwnProperty(key);
    };

    // Check if the key corresponds to a midi note visible in the interface.
    // Only keys from MIDI value 45 to 62 are visible.
    Keyboard.prototype.isVisibleKey = function(key) {
        var midiValue = Keyboard.dictKey[key];
        return (midiValue >= 45 && midiValue <= 62)
    };

    // Mapping of QWERTY to MIDI
    // The first 3 notes are not playable with the QWERTY keyboard,
    // But they can be played with the mouse.
    Keyboard.dictKey = {
          'A2' : 45, // dummyKey -> A2
         'A+2' : 46, // dummyKey -> A+2
          'B2' : 47, // dummyKey -> B2

            90 : 48, // Z -> C3
            83 : 49, // S -> C+3
            88 : 50, // X -> D3
            68 : 51, // D -> D+3
            67 : 52, // C -> E3
            86 : 53, // V -> F3
            71 : 54, // G -> F+3
            66 : 55, // B -> G3
            72 : 56, // H -> G+3
            78 : 57, // N -> A3
            74 : 58, // J -> A+3
            77 : 59, // M -> B3
            188: 60, // , -> C4
            76 : 61, // L -> C+4
            190: 62, // . -> D4
            186: 63, // ; -> D+4

            81 : 60, // Q -> C4
            50 : 61, // 2 -> C+4
            87 : 62, // W -> D4
            51 : 63, // 3 -> D+4
            69 : 64, // E -> E4
            82 : 65, // R -> F4
            53 : 66, // 5 -> F+4
            84 : 67, // T -> G4
            54 : 68, // 6 -> G+4
            89 : 69, // Y -> A4
            55 : 70, // 7 -> A+4
            85 : 71, // U -> B4
            73 : 72, // I -> C5
            57 : 73, // 9 -> C#5
            79 : 74, // O -> D5
            48 : 75, // 0 -> D+5
            80 : 76  // P -> E5
        };

})(jQuery);
