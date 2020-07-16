const { Vacuum } = require('./vacuum');

module.exports = class RoborockS6 extends Vacuum {

	manufacturer() {
		return 'Roborock';
	}

	model() {
		return 'S6';
	}

}