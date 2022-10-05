import {useEffect, useState} from 'react'
import axios from 'axios'
import {IService} from './components/services'

const useFetch = (url: string, interval?: number) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const fetch = async () => {
    const resp = await axios.get(url)
    const data = await resp?.data

    setData(data)
    setLoading(false)
  }

  useEffect(() => {
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

  }, [url, interval])

  return {loading, data}
}


/////////////////////////////
// Services
export const useServices = () => {
  const {data} = useFetch('/api/services')
  return data as IService[]
}

export const updateServices = async (services: IService[]) => {
  const resp = await axios.post('/api/services', services)
  const data = await resp?.data

  console.log(`Updated: ${data}`)
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
  return useFetch('/api/data', 5000)
}
