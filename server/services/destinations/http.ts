import axios from 'axios'
import {IHttpDestination, ISpindelData} from 'types'


export const sendHttp = async (destination: IHttpDestination, data: ISpindelData) => {
  const url = `${destination.host}:${destination.port}${destination.path}`
  await axios.post(url, data)
}
