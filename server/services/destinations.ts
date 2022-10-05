interface IDestination {
  type: 'HTTP' | 'InfluxDB'
  url: string
  error?: string
}

let _destinations: IDestination[] = [
  {
    type: 'HTTP',
    url: 'https://foo.bar'
  },
  {
    type: 'InfluxDB',
    url: 'whatever',
    error: "this is my error message",
  }
]
// TODO. Load this from disk

export const getDestinations = () => {
  return _destinations
}

export const setDestinations = (destinations: IDestination[]) => {
  _destinations = destinations
  // TODO Save these to disk
}
