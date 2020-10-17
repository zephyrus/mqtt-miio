const Plug = require('./plug');

module.exports = class ChuangmiPlugV3 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'V3';
	}

};
