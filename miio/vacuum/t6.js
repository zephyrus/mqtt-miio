const { Vacuum } = require('./vacuum');

module.exports = class RoborockT6 extends Vacuum {

	manufacturer() {
		return 'Roborock';
	}

	model() {
		return 'T6';
	}

}