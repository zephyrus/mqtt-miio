const Plug = require('./plug');

module.exports = class ChuangmiPlugHmi208 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'HMI208';
	}

};
