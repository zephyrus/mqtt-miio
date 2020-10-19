const { Device } = require('../device');

module.exports = class Plug extends Device {

	polling() {
		return 1000;
	}

	init() {
		return Promise.all([
			this.refresh(),

			this.proto.call('miIO.info')
				.then((info) => {
					this.info = {
						...this.info,
						firmware: info.fw_ver,
					};
				})
				.catch((e) => this.emit('error', e)),
		]);
	}

};
