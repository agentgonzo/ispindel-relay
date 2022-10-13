import {useEffect, useState} from 'react'
import axios from 'axios'
import {IService} from './components/services'

/////////////////////////////
// Services
export const useServices = () => {
  const [data, setData] = useState(undefined)
  useEffect(() => {
    (async () => {
      const resp = await axios.get('/api/services')
      await setData(resp?.data)
    })()
  }, [])

  return data as IService[]
}

export const updateServices = async (services: IService[]) => {
  await axios.post('/api/services', services)
}

export const useTestService = async (service: IService) => {
  return await axios.post('/api/service/test', service)
}

////////////////////////////
// Data
export const useData = () => {
  const [loading, setLoading] = useState(true)
  const [responseData, setResponseData] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const resp = await axios.get('/api/data')

      setResponseData(resp?.data)
      setLoading(false)
    }

    let _interval: any = null;
    (async () => {
      try {
        _interval = setInterval(async () => {
          fetch().then(() => {
          })
        }, 5_000)

        await fetch()
        return () => clearInterval(_interval);
      } catch (error) {
        console.error(error)
      }
    })()

  }, [])

  return {loading, data: responseData}
}

export const resetOriginalGravity = async (originalGravity: number) => {
  return await axios.put('/api/data/og', {originalGravity})
}
