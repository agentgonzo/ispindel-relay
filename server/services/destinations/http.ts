import axios from 'axios'
import {IHttpDestination, ISpindelData} from 'types'


export const sendHttp = async (destination: IHttpDestination, data: ISpindelData) => {
  await axios.post(destination.url, data)
}
