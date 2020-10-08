# mqtt-miio
MQTT integration for miio devices

## Docker Compose

```yml
version: '3'

services:

  miio:
    image: 2mqtt/miio:0.0.4

    restart: always

    network_mode: host

    environment:
      - MQTT_ID=miio
      - MQTT_PATH=miio
      - MQTT_HOST=mqtt://<ip address of mqtt broker>
      - MQTT_USERNAME=<mqtt username>
      - MQTT_PASSWORD=<mqtt password>
      - DEVICE_<id>=<miio device token>
```