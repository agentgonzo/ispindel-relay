import {InfluxDB} from 'influx'
import {IInfluxDBDestination, ISpindelData} from 'types'


export const sendToInfluxDB = async (destination: IInfluxDBDestination, data: ISpindelData) => {
  const influxDB = new InfluxDB({
    host: destination.hostname,
    database: destination.database,
    username: destination.username,
    password: destination.password,
    options: {
      timeout: 1000,
    }
  })
  await influxDB.writePoints([
    {
      measurement: 'measurements',
      fields: {
        temperature: data.temperature,
        temp_units: data.temp_units,
        tilt: data.angle,
        gravity: data.gravity,
        interval: data.period,
        battery: data.battery,
        RSSI: -80,
      }
    }
  ])
}
