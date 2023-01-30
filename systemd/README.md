# Using MQTT-MIIO with SystemD
Instead of using [Docker](https://github.com/zephyrus/mqtt-miio/blob/master/README.md)

## Requirements
- NodeJS
- Git
- SystemD
### Debian / Ubuntu
```
apt-get  install  nodejs git
```

## Install
As user `root`:
```
mkdir  -p  /opt
chmod  755  /opt
adduser  --system  --home /opt/mqtt-miio  mqttmiio
git  -C /opt  clone  https://github.com/zephyrus/mqtt-miio.git
cd  /opt/mqtt-miio
npm  install
cp  systemd/environment.dist  systemd/environment
systemctl  enable  /opt/mqtt-miio/systemd/mqtt-miio.service
```

## Configure
Edit the file `/opt/mqtt-miio/systemd/environment`

If the service is already running, you need to restart it to apply the changes: `systemctl restart mqtt-miio.service`

If you need to specify a token and you need the device id:
- `systemctl start mqtt-miio.service`
- plug in the device
- check log: `journalctl -eu mqtt-miio`

If you don't have the token follow [this manual](https://github.com/Maxmudjon/com.xiaomi-miio/blob/master/docs/obtain_token.md).

## Start
```
systemctl  start  mqtt-miio.service
```

## Status and Logging
```
systemctl  status  mqtt-miio.service
journalctl  -eu  mqtt-miio.service
```

## Stop
```
systemctl  stop  mqtt-miio.service
```

## Troubleshooting

### Log keeps repeating it is connected to the MQTT server
You probably have multiple MQTT clients running that are using the same MQTT_ID. Find the duplicate service or set a unique value in the `environment` file. 
