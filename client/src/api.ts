import {useEffect, useState} from 'react'
import axios, {AxiosRequestConfig} from 'axios'
import {IService} from './components/services'

const useFetch = (config: AxiosRequestConfig, interval?: number) => {
  const [loading, setLoading] = useState(true)
  const [responseData, setResponseData] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const resp = await axios(config)

      setResponseData(resp?.data)
      setLoading(false)
    }

    let _interval: any = null;
    (async () => {
      try {
        if (interval) {
          _interval = setInterval(async () => {
            fetch().then(() => {
            })
          }, interval)
        }

        await fetch()
        return () => clearInterval(_interval);
      } catch (error) {
        console.error(error)
      }
    })()

  }, [config, interval])

  return {loading, data: responseData}
}


/////////////////////////////
// Services
export const useServices = () => {
  const {data} = useFetch({url: '/api/services'})
  return data as IService[]
}

export const updateServices = async (services: IService[]) => {
  await axios.post('/api/services', services)
}

export const useTestService = (service: IService) => {
  return useFetch({
    method: 'POST',
    url: '/api/service/test',
    data: service,
  })
}

////////////////////////////
// Data
export interface ISpindelData {
  gravity: number,
  temperature: number, // °C // TODO. Support the yanks
  battery: number, // Volts
  tilt: number, // °
  period: number, // seconds?
  lastUpdate: number, // milli-seconds since epoch
}

export const useData = () => {
  return useFetch({url: '/api/data'}, 5000)
}
