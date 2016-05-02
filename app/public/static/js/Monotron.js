import $ from 'jquery';
import { Knob, Toggle, Keyboard } from './widgets.js';

export default function Monotron(local, context) {

    var obj = this;

    this.connected = false;
    this.local = local;
    this.context = context;

    this.localClass = this.local ? 'local' : 'remote';

    // KNOBS

    // The oscillator knobs represent a variation of semitones.
    // knobOsc1 has a range of +-16 semitones, knobOsc2 has a range of +-28 semitones.
    // The initial position for both is 0 semitones, meaning no variation.

    // We need to declare variables for the values of the knobs because these
    // don't map to the frequency of their oscilators. This is not needed for the
    // other knobs because they map exactly to a certain value in a Web Audio Node.
    this.knobOsc1Val = 0;
    this.knobOsc2Val = 0;

    var knobOsc1Elem = $('.' + this.localClass + ' .knobOsc1')[0];
    this.knobOsc1 = new Knob(knobOsc1Elem, local);
    knobOsc1Elem.addEventListener('changed', function (e) {
        var data = e.detail;
        if (obj.connected && obj.local) {
            window.sendData({type:'knobOsc1', data:data})
        }
        var oldRange = 1 - 0;
        var newRange = 16 - (-16); // 2 octaves = 16 semitones
        var semitones = ((data * newRange) / oldRange) + (-16);
        obj.knobOsc1Val = semitones;
        if (obj.keyboard.keysDown.length !== 0) {
            obj.osc1.frequency.setValueAtTime(
                obj.getOsc1Freq(), context.currentTime);
            obj.osc2.frequency.setValueAtTime(
                obj.getOsc2Freq(), context.currentTime);
        }
    });

    var knobOsc2Elem = $('.' + this.localClass + ' .knobOsc2')[0];
    this.knobOsc2 = new Knob(knobOsc2Elem, local);
    knobOsc2Elem.addEventListener('changed', function (e) {
        var data = e.detail;
        if (obj.connected && obj.local) {
            window.sendData({type:'knobOsc2', data:data})
        }
        var oldRange = 1 - 0;
        var newRange = 28 - (-28); // 3.5 octaves = 16 semitones
        var semitones = ((data * newRange) / oldRange) + (-28);
        obj.knobOsc2Val = semitones;
        if (obj.keyboard.keysDown.length !== 0) {
            obj.osc2.frequency.setValueAtTime(
                obj.getOsc2Freq(), context.currentTime);
        }
    });

    var knobXmodElem = $('.' + this.localClass + ' .knobXmod')[0];
    this.knobXmod = new Knob(knobXmodElem, local);
    knobXmodElem.addEventListener('changed', function (e) {
        var data = e.detail;
        if (obj.connected && obj.local) {
            window.sendData({type:'knobXmod', data:data})
        }
        obj.osc2XmodMix.gain.value = data;
        if (obj.keyboard.keysDown.length !== 0) {
            obj.osc1.frequency.setValueAtTime(
                obj.getOsc1Freq(), context.currentTime);
            obj.osc2.frequency.setValueAtTime(
                obj.getOsc2Freq(), context.currentTime);
        }
    });

    // The cutoff frequency goes from C#1 (semitone 25) to C9 (semitone 120)
    var knobCutoffElem = $('.' + this.localClass + ' .knobCutoff')[0];
    this.knobCutoff = new Knob(knobCutoffElem, local);
    knobCutoffElem.addEventListener('changed', function (e) {
        var data = e.detail;
        if (obj.connected && obj.local) {
            window.sendData({type:'knobCutoff', data:data})
        }
        var oldRange = 1 - 0;
        var newRange = 120 - 25;
        var semitones = ((data * newRange) / oldRange) + 25;
        obj.lowpassFilter.frequency.setValueAtTime(
            obj.getFrequency(semitones), context.currentTime);
    });

    // The cutoff peak goes from 10**-1 to 10**1.5, it's an exponential
    // range that loosely imitates the original device's sound.
    var knobPeakElem = $('.' + this.localClass + ' .knobPeak')[0];
    this.knobPeak = new Knob(knobPeakElem, local);
    knobPeakElem.addEventListener('changed', function (e) {
        var data = e.detail;
        if (obj.connected && obj.local) {
            window.sendData({type:'knobPeak', data:data})
        }
        var oldRange = 1 - 0;
        var newRange = 1.5 - (-1);
        var value = Math.pow(10, ((data * newRange) / oldRange) + (-1));
        obj.lowpassFilter.Q.setValueAtTime(
            value, context.currentTime);
    });

    // Toggle that activates or deactivates Osc2
    var toggleOsc2Elem = $('.' + this.localClass + ' .toggleOsc2')[0];
    this.toggleOsc2 = new Toggle(toggleOsc2Elem, local);
    toggleOsc2Elem.addEventListener('changed', function (e) {
        var data = e.detail;
        console.log('data', data);
        if (obj.connected && obj.local) {
            window.sendData({type:'toggleOsc2', data:data})
        }
        if (!data) {
            obj.osc2Gain.gain.value = 0.0;
        } else if (obj.keyboard.keysDown.length !== 0) {
            obj.osc2Gain.gain.value = 1.0;
        }
    });

    // KEYBOARD

    var keyboardElem = $('.' + this.localClass + ' .keyboard')[0];
    this.keyboard = new Keyboard(keyboardElem, local);
    keyboardElem.addEventListener('changed', function (e) {
        var data = e.detail;
        if (obj.connected && obj.local) {
            window.sendData({type:'keyboard', data:data})
        }
        if (data.length === 0) {
            obj.stop();
        } else {
            obj.play();
        }
    });

    // AUDIO

    this.masterGain = context.createGain();
    this.lowpassFilter = context.createBiquadFilter();

    // Set a low volume in the master gain to avoid clipping.
    // Setting up a DynamicsCompressorNode could be another
    // (or a complementing) solution
    this.masterGain.gain.value = 0.3;

    this.masterGain.connect(this.lowpassFilter);
    this.lowpassFilter.connect(context.destination);

    this.osc1 = context.createOscillator();
    this.osc1Gain = context.createGain();
    this.osc1XmodMix = context.createGain();
    this.osc1.type = 'square';
    this.osc1.connect(this.osc1Gain);
    this.osc1Gain.connect(this.masterGain);
    this.osc1Gain.gain.value = 0.0;
    this.osc1Gain.connect(this.osc1XmodMix);
    this.osc1XmodMix.connect(this.masterGain);
    this.osc1XmodMix.gain.value = 0.0;
    this.osc1.start(0);

    this.osc2 = context.createOscillator();
    this.osc2Gain = context.createGain();
    this.osc2.type = 'square';
    this.osc2.connect(this.osc2Gain);
    this.osc2Gain.connect(this.masterGain);
    this.osc2Gain.gain.value = 0.0;
    this.osc2.start(0);

    this.osc2XmodMix = context.createGain();

    // Initialize the modulation with a value of 0.5,
    // which is the middle of the range of the modulation knob
    this.osc2XmodMix.gain.value = 0.5;

    this.osc2.connect(this.osc2XmodMix);
    this.osc2XmodMix.connect(this.osc1XmodMix.gain);

    // Initialize the filter with the frequency of the semitone 72.5,
    // which is the middle of the range of the cutoff knob
    this.lowpassFilter.frequency.setValueAtTime(
        this.getFrequency(72.5), context.currentTime);
};

// Returns the frequency of a semitone number
Monotron.prototype.getFrequency = function(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
};

// Osc1's frequency depends on the note played, the value of the Osc1 knob, and the
// value of the modulation knob. The modulation knob can modify the frequency of
// Osc1 by up to 1 semitone.
Monotron.prototype.getOsc1Freq = function() {
    var semitones = Keyboard.dictKey[this.keyboard.keysDown[0]] +
                    this.knobOsc1Val + (this.knobXmod.position * 1);
    return this.getFrequency(semitones);
};

// Osc2's frequency depends on the note played, the value of the Osc2 knob, and the
// frequency of Osc1
Monotron.prototype.getOsc2Freq = function() {
    var semitones = Keyboard.dictKey[this.keyboard.keysDown[0]] + this.knobOsc2Val;
    return this.getFrequency(semitones) + this.getOsc1Freq();
};

Monotron.prototype.play = function() {
    this.osc1.frequency.setValueAtTime(
        this.getOsc1Freq(), this.context.currentTime);
    this.osc2.frequency.setValueAtTime(
        this.getOsc2Freq(), this.context.currentTime);
    this.osc1Gain.gain.value = 1.0;
    if (this.toggleOsc2.position) {
        this.osc2Gain.gain.value = 1.0;
    }
};

Monotron.prototype.stop = function() {
    this.osc1Gain.gain.value = 0.0;
    this.osc2Gain.gain.value = 0.0;
};