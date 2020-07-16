const Vacuum = require('./vacuum');

module.exports = class RoborockC10 extends Vacuum {

	manufacturer() {
		return 'Roborock';
	}

	model() {
		return 'C10';
	}

}