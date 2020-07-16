const { Device } = require('../device');

module.exports = class Vacuum extends Device {

	modes() {
		return [
			{
				key: 101,
				value: 'silent',
			},
			{
				key: 102,
				value: 'balanced',
			},
			{
				key: 103,
				value: 'turbo',
			},
			{
				key: 104,
				value: 'max',
			},
		];
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

			this.proto.call('get_serial_number')
				.then(([info]) => {
					this.info = {
						...this.info,
						serial: info.serial_number,
					};
				})
				.catch((e) => this.emit('error', e)),
		]);
	}

	properties() {
		return {
			battery: {
				listen: {
					key: 'batteryLevel',
				},
			},

			state: {
				listen: {
					key: 'state',
				},
				set: (value) => {
					if (value === 'cleaning') return { call: 'app_start', args: [] };
					if (value === 'charging') return { call: 'app_stop', args: [] };
					if (value === 'paused') return { call: 'app_pause', args: [] };
				},
			},

			cleaning: {
				listen: {
					key: 'in_cleaning',
					parse: (value) => !!value,
				},
			},

			mode: {
				listen: {
					key: 'fanSpeed',
					parse: (value) => {
						const mode = this.modes().find((m) => m.key === value);
						return mode ? mode.value : value;
					},
				},
				set: {
					key: 'set_custom_mode',
					parse: (value) => {
						const mode = this.modes().find((m) => m.value === value);
						return mode ? mode.key : value;
					},
				},
			},

			cleanTime: {
				listen: {
					key: 'cleanTime',
				},
			},

			cleanArea: {
				listen: {
					key: 'cleanArea',
				},
			},

			mainBrushWorkTime: {
				listen: {
					key: 'mainBrushWorkTime',
				},
			},

			sideBrushWorkTime: {
				listen: {
					key: 'sideBrushWorkTime',
				},
			},

			filterWorkTime: {
				get: {
					key: 'filter_work_time',
				},
			},

			sensorDirtyTime: {
				get: {
					key: 'sensor_dirty_time',
				},
			},
		};
	}

	find() {
		this.queue = this.queue
			.then(() => this.proto.call('find_me', []));

		return this.queue;
	}

	start() {
		this.queue = this.queue
			.then(() => this.proto.call('app_start', []));

		return this.queue;
	}

	pause() {
		this.queue = this.queue
			.then(() => this.proto.call('app_pause', []));

		return this.queue;
	}

	stop() {
		this.queue = this.queue
			.then(() => this.proto.call('app_stop', []));

		return this.queue;
	}

	charge() {
		this.queue = this.queue
			.then(() => this.proto.call('app_charge', []));

		return this.queue;
	}

};
