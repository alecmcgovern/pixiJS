import React from 'react';
import * as PIXI from 'pixi.js';

import mars from './images/mars.png';
import './filter.css';

class Filter extends React.Component {
	constructor( props ) { 
		super(props);
		
		this.animate = this.animate.bind(this);
		this.marsImage = mars;
	}

	componentDidMount() {
		this.app = new PIXI.Application({width: 500, height:375, antialias: true, transparent:true});
		this.app.renderer.backgroundColor = 0x7F0000FF;
		this.refs.filter.appendChild(this.app.view);

		this.app.stage.width = 500;
		this.app.stage.height = 375;

		PIXI.loader.add([this.marsImage]).load(() => {
			this.sprite1 = new PIXI.Sprite(
				PIXI.loader.resources[this.marsImage].texture
			);
			this.app.stage.addChild(this.sprite1);
		});

		this.animate();
	}

	componentWillUnmount() {
		// this.app.stop();
	}

	animate() {
		this.app.render(this.app.stage);
		this.frame = requestAnimationFrame(this.animate);
	}

	render() {
		return (
			<div className="filter" ref="filter">
			</div>
		);
	}
}

export default Filter;