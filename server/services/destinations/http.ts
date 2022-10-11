import axios from 'axios'
import {IDestination} from '../destinations'
import {testData} from '../../router/data'

export interface IHttpDestination extends IDestination {
  host: string
  port: string
  path: string
  token?: string
}

export const send = async (destination: IHttpDestination) => {

  const url = `${destination.host}:${destination.port}${destination.path}`
  console.log(url)
  const resp = await axios.post(url, testData)
  console.log(resp.data)
}
