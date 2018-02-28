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
		this.app = new PIXI.Application({width: 500, height:375, antialias: true, transparent:true});
		this.app.renderer.backgroundColor = 0x7F0000FF;
		this.refs.filter.appendChild(this.app.view);

		PIXI.loader.add([this.marsImage]).load(this.setup);

		this.filter = new Filters.DotFilter();

		// this.animate();
	}

	setup() {
		this.sprite1 = new PIXI.Sprite(
				PIXI.loader.resources[this.marsImage].texture
			);
		this.app.stage.addChild(this.sprite1);

		this.sprite1.position.set(0, 100);
		this.sprite1.scale.set(2,2);
		this.sprite1.filters = [this.filter];

		// this.app.ticker.add(delta => this.gameLoop(delta));

		this.animate();
	}

	gameLoop(delta) {
	}

	componentWillUnmount() {
		// this.app.stop();
	}

	animate() {
		if (this.sprite1.x < 200) {
			this.sprite1.x += 1;
		}
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