const { Vacuum } = require('./vacuum');

module.exports = class XiaomiVacuum extends Vacuum {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'Mi Robot Vacuum';
	}

}