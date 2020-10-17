const Plug = require('./plug');

module.exports = class ChuangmiPlugV2 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'V2';
	}

};
