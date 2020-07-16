const Vacuum = require('./vacuum');

module.exports = class RoborockS5Max extends Vacuum {

	manufacturer() {
		return 'Roborock';
	}

	model() {
		return 'S5 Max';
	}

}