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


		// FILTERS //
		this.filters = [
			{	name: "Ascii Filter",
				filter: new Filters.AsciiFilter()
			},
			{	name: "Adjustment Filter",
				filter: new Filters.AdjustmentFilter({alpha: 0.5})
			},
			{	name: "Bevel Filter",
				filter: new Filters.BevelFilter({thickness:10})
			},
			{
				name: "Bloom Filter",
				filter: new Filters.BloomFilter()
			},
			{	name: "Bulge Pinch Filter",
				filter: new Filters.BulgePinchFilter()
			},
			{	name: "Color Map Filter",
				filter: new Filters.ColorMapFilter()
			},
			{	name: "Color Replace Filter",
				filter: new Filters.ColorReplaceFilter()
			},
			{	name: "Convolution Filter",
				filter: new Filters.ConvolutionFilter()
			},
			{	name: "Cross Hatch Filter",
				filter: new Filters.CrossHatchFilter()
			},
			{	name: "CRTFilter",
				filter: new Filters.CRTFilter()
			},
			{	name: "Dot Filter",
				filter: new Filters.DotFilter()
			},
			{	name: "Drop Shadow Filter",
				filter: new Filters.DropShadowFilter()
			},
			{	name: "Emboss Filter",
				filter: new Filters.EmbossFilter()
			},
			{	name: "Glitch Filter",
				filter: new Filters.GlitchFilter()
			},
			{	name: "Glow Filter",
				filter: new Filters.GlowFilter()
			},
			{	name: "GodrayFilter",
				filter: new Filters.GodrayFilter()
			},
			{	name: "Kawase Blur Filter",
				filter: new Filters.KawaseBlurFilter()
			},
			{	name: "Motion Blur Filter",
				filter: new Filters.MotionBlurFilter()
			},
			// MultiColorReplaceFilter: new Filters.MultiColorReplaceFilter(),
			{	name: "Old Film Filter",
				filter: new Filters.OldFilmFilter()
			},
			{	name: "Outline Filter",
				filter: new Filters.OutlineFilter()
			},
			{	name: "Pixelate Filter",
				filter: new Filters.PixelateFilter()
			},
			{	name: "Radial Blur Filter",
				filter: new Filters.RadialBlurFilter()
			},
			{	name: "Reflection Filter",
				filter: new Filters.ReflectionFilter()
			},
			{	name: "RGB Split Filter",
				filter: new Filters.RGBSplitFilter()
			},
			{	name: "Shockwave Filter",
				filter: new Filters.ShockwaveFilter()
			},
			{	name: "Simple Lightmap Filter",
				filter: new Filters.SimpleLightmapFilter()
			},
			{	name: "Tilt Shift Filter",
				filter: new Filters.TiltShiftFilter()
			},
			{	name: "Twist Filter",
				filter: new Filters.TwistFilter()
			},
			{	name: "Zoom Blur Filter",
				filter: new Filters.ZoomBlurFilter()
			}
		]
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
		this.videoSprite.filters = [this.filters[0].filter];


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

	selectFilter(filter) {
		this.videoSprite.filters = [filter];
	}

	renderFilterList() {
		this.items = [];
		for (let i = 0; i < this.filters.length; i++) {
			// this.items.push(filter);
			this.items.push(<div key={i} className="filter-option" onClick={() => this.selectFilter(this.filters[i].filter)}>{this.filters[i].name}</div>);
		}

		return this.items;
	}

	render() {
		return (
			<div className="filter-container">
				<div className="video-container">
					<video className="video" ref="video" autoPlay="true"></video>
					<div className="filter" ref="filter"></div>
				</div>
				<div className="filter-list-container">
					{this.renderFilterList()}
				</div>
			</div>
		);
	}
}

export default Filter;