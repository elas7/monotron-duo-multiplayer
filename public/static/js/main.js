import $ from 'jquery';
import { getUserMedia, attachMediaStream } from 'webrtc-adapter-test';
import Monotron from './Monotron';

var context = new window.AudioContext();

// create local and remote monotrons
var monotron1 = new Monotron(true, context);
var monotron2 = new Monotron(false, context);

var socket = io();
var room = location.pathname.split('/').pop();
var isInitiator = false;
var pc, dc,
    myVideo, yourVideo,
    myVideoStream, yourVideoStream,
    haveLocalMedia;

socket.on('created', function(room) {
    console.log('created room', room);
    isInitiator = true;
});

socket.on('joined', function(room) {
    console.log('joined room', room);
    connect();
});

socket.on('join', function (room){
    console.log('Another peer joined our room ' + room);
    connect();
});

socket.on('message', function(message) {
    console.log('message from peer:', message);
    if (message.type === 'offer') {
        // set remote description and answer
        pc.setRemoteDescription(new RTCSessionDescription(message));
        pc.createAnswer(gotDescription, handleError);
    } else if (message.type === 'answer') {
        // set remote description
        pc.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate') {
        // add ice candidate
        pc.addIceCandidate(
            new RTCIceCandidate({
                sdpMLineIndex: message.mlineindex,
                candidate: message.candidate
            })
        );
    }
});

function sendMessage(message){
    console.log('sending message: ', message);
    socket.emit('message', room, message);
}

function connect() {
    // set up the peer connection
    pc = new RTCPeerConnection(
        // this is one of Google's public STUN servers
        {iceServers: [{url: "stun:stun.l.google.com:19302"}]});
    pc.onicecandidate = onIceCandidate;
    pc.onaddstream = onRemoteStreamAdded;
    pc.ondatachannel = onDataChannelAdded;
    console.log(pc);

    // when our browser gets a candidate, send it to the peer
    function onIceCandidate(e) {
        console.log(e);
        if (e.candidate) {
            sendMessage({type: 'candidate',
                mlineindex: e.candidate.sdpMLineIndex,
                candidate: e.candidate.candidate});
        }
    }

    // when the other side added a media stream, show it on screen
    function onRemoteStreamAdded(e) {
        yourVideoStream = e.stream;
        attachMediaStream(yourVideo, yourVideoStream);
    }

    function onDataChannelAdded(e) {
        dc = e.channel;
        setupDataHandlers();
        sendData("hello");
    }

    // wait for local media to be ready
    attachMediaIfReady();

}

$(function() {
    // connect to room based on URL
    console.log('Joining with key:', room);
    socket.emit('create or join', room);

    myVideo = $('#myVideo')[0];
    yourVideo = $('#yourVideo')[0];

    // getting local media
    getUserMedia(
        {
            "audio":true, "video":true
        },
        function(stream) {
            console.log('getUserMedia success');
            myVideoStream = stream;
            haveLocalMedia = true;
            attachMediaStream(myVideo, myVideoStream);

            // wait for RTCPeerConnection to be created
            attachMediaIfReady();
        },
        handleError
    );
});

// If RTCPeerConnection is ready and we have local media,
// attach media to pc
function attachMediaIfReady() {
    console.log('attachMediaIfReady', pc, haveLocalMedia);
    if (pc && haveLocalMedia) {
        pc.addStream(myVideoStream);
        console.log('attached');
        // call if we were the last to connect (to increase
        // chances that everything is set up properly at both ends)
        if (!isInitiator) {
            dc = pc.createDataChannel('chat');
            setupDataHandlers();
            pc.createOffer(gotDescription, handleError);
        }
    }
}

// set description as local description and send it to the other peer
function gotDescription(localDesc){
    console.log(localDesc);
    pc.setLocalDescription(localDesc);
    sendMessage(localDesc);
}

function handleError(e){
    console.log(e);
}

// Set up the data channel message handler
function setupDataHandlers() {
    window.sendData = function(msg) {
        msg = JSON.stringify(msg);
        console.log("sending " + msg + " over data channel");
        dc.send(msg);
    };
    dc.onmessage = function(e) {
        var msg = JSON.parse(e.data);
        console.log("receiving over data channel:");
        console.log(msg);
        if (msg.type == 'keyboard') {
            monotron2[msg.type].keysDown = msg.data;
        } else {
            monotron2[msg.type].position = msg.data;
        }
        monotron2[msg.type].publish();
        monotron2[msg.type].draw();
    };

    monotron1.connected = true;
    monotron2.connected = true;
}
