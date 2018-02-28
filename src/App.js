import React, { Component } from 'react';
import './App.css';

class App extends Component {

    componentDidMount() {
        let video = this.refs.videoElement;
 
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia || navigator.mediaDevices.oGetUserMedia;
       
            navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(err) {
                console.log(err);
            });;
        } else {
            console.log("no media devices found");
        }
    }

    render() {
        return (
            <div className="App">
                <video className="video" ref="videoElement" autoplay="true"></video>
            </div>
        );
    }
}

export default App;
