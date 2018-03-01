import React from 'react';
import * as PIXI from 'pixi.js';
import * as Filters from 'pixi-filters';

import mars from './images/mars.png';
import './filter.css';

class Filter extends React.Component {
	constructor( props ) { 
		super(props);
		
		this.animate = this.animate.bind(this);
		this.setup = this.setup.bind(this);
		this.marsImage = mars;
	}

	componentDidMount() {
		let video = this.refs.video;
 
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia || navigator.mediaDevices.oGetUserMedia;
       
            navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(err) {
                console.log(err);
            });
        } else {
            console.log("no media devices found");
        }


		this.app = new PIXI.Application({width: 500, height:375, antialias: true, transparent:true});
		this.app.renderer.backgroundColor = 0x7F0000FF;
		this.refs.filter.appendChild(this.app.view);

		PIXI.loader.add([this.marsImage]).load(this.setup);


		// FILTERS //
		this.AsciiFilter = new Filters.AsciiFilter();
		this.AdjustmentFilter = new Filters.AdjustmentFilter({alpha: 0.5});
		this.BevelFilter = new Filters.BevelFilter({thickness:10});
		this.BloomFilter = new Filters.BloomFilter();
		this.BulgePinchFilter = new Filters.BulgePinchFilter();
		this.ColorMapFilter = new Filters.ColorMapFilter();
		this.ColorReplaceFilter = new Filters.ColorReplaceFilter();
		this.ConvolutionFilter = new Filters.ConvolutionFilter();
		this.CrossHatchFilter = new Filters.CrossHatchFilter();
		this.CRTFilter = new Filters.CRTFilter();
		this.DotFilter = new Filters.DotFilter();
		this.DropShadowFilter = new Filters.DropShadowFilter();
		this.EmbossFilter = new Filters.EmbossFilter();
		this.GlitchFilter = new Filters.GlitchFilter();
		this.GlowFilter = new Filters.GlowFilter();
		this.GodrayFilter = new Filters.GodrayFilter();
		this.KawaseBlurFilter = new Filters.KawaseBlurFilter();
		this.MotionBlurFilter = new Filters.MotionBlurFilter();
		// this.MultiColorReplaceFilter = new Filters.MultiColorReplaceFilter();
		this.OldFilmFilter = new Filters.OldFilmFilter();
		this.OutlineFilter = new Filters.OutlineFilter();
		this.PixelateFilter = new Filters.PixelateFilter();
		this.RadialBlurFilter = new Filters.RadialBlurFilter();
		this.ReflectionFilter = new Filters.ReflectionFilter();
		this.RGBSplitFilter = new Filters.RGBSplitFilter();
		this.ShockwaveFilter = new Filters.ShockwaveFilter();
		this.SimpleLightmapFilter = new Filters.SimpleLightmapFilter();
		this.TiltShiftFilter = new Filters.TiltShiftFilter();
		this.TwistFilter = new Filters.TwistFilter();
		this.ZoomBlurFilter = new Filters.ZoomBlurFilter();
	}

	setup() {
		let videoTexture = PIXI.Texture.fromVideo(this.refs.video);
		this.videoSprite = new PIXI.Sprite(videoTexture);
		this.videoSprite.width = 500;
		this.videoSprite.height = 375;

		// this.sprite1 = new PIXI.Sprite(
		// 		PIXI.loader.resources[this.marsImage].texture
		// 	);

		// this.app.stage.addChild(this.sprite1);

		// this.sprite1.position.set(0, 100);
		// this.sprite1.scale.set(2,2);
		// this.sprite1.filters = [this.filter];


		this.app.stage.addChild(this.videoSprite);
		this.videoSprite.filters = [this.DotFilter];


		this.animate();
	}

	gameLoop(delta) {
	}

	componentWillUnmount() {
		// this.app.stop();
	}

	animate() {
		// if (this.sprite1.x < 200) {
		// 	this.sprite1.x += 1;
		// }
		this.app.render(this.app.stage);
		this.frame = requestAnimationFrame(this.animate);
	}

	render() {
		return (
			<div className="filter-container">
				<div className="video-container">
					<video className="video" ref="video" autoPlay="true"></video>
					<div className="filter" ref="filter"></div>
				</div>
				<div className="filter-list-container"></div>
			</div>
		);
	}
}

export default Filter;