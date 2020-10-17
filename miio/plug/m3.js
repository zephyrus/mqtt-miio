const Plug = require('./plug');

module.exports = class ChuangmiPlugM3 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'M3';
	}

};
