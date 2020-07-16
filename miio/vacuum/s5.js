const { Vacuum } = require('./vacuum');

module.exports = class RoborockS5 extends Vacuum {

	manufacturer() {
		return 'Roborock';
	}

	model() {
		return 'S5';
	}

}