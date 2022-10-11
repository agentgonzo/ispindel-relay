export interface ISpindelData {
  name: string // TODO: probably unused
  gravity: number,
  temperature: number,
  temp_units: string,
  battery: number, // Volts
  angle: number, // °
  period: number, // seconds
}

export interface ISpindelDataWithTimestamp extends ISpindelData {
  lastUpdate: number, // milli-seconds since epoch
}

// TODO move API objects over to a common package
export enum ServiceType {
  HTTP = 'HTTP',
  InfluxDB = 'InfluxDB',
  Ubidots = 'Ubidots',
}

export interface IDestination {
  type: ServiceType
  error?: string
}

interface IUbidotsDestination extends IDestination {
  token: string
}

export interface IInfluxDBDestination extends IDestination {
  hostname: string
  port: string
  database: string
  username?: string
  password?: string
}

export interface IHttpDestination extends IDestination {
  url: string
  token?: string
}
