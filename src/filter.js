import React, { Component } from 'react';
import * as PIXI from 'pixi.js';

import mars from './images/mars.png';
import './filter.css';

class Filter extends Component {
	constructor( props ) { 
		super(props);
		
		this.animate = this.animate.bind(this);
	}

	componentDidMount() {
		this.app = new PIXI.Application({width: 500, height:375, antialias: true, transparent:true});
		this.app.renderer.backgroundColor = 0x7F0000FF;
		this.refs.filter.appendChild(this.app.view);

		this.stage = new PIXI.Container();
		this.stage.width = 500;
		this.stage.height = 375;

		PIXI.loader.add(mars).load(() => {
			this.sprite1 = new PIXI.Sprite(
				PIXI.loader.resources[mars].texture
			);
			this.stage.addChild(this.sprite1);
		});

		this.animate();
	}

	componentWillUnmount() {
		// this.app.stop();
	}

	animate() {
		this.app.render(this.stage);
		this.frame = requestAnimationFrame(this.animate);
	}

	render() {
		return (
			<div className="filter" ref="filter"></div>
		);
	}
}

export default Filter;