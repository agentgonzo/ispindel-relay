import * as React from "react"
import {FC, ReactElement} from "react"
import {useServices} from '../api'
import {IServiceWithKey, ServicesConfiguration} from '../components/services'

export const ServicesPage: FC = (): ReactElement => {
  const data = useServices()

  if (data) {
    data.forEach((service: IServiceWithKey) => service.key = Math.random().toString())
    return <ServicesConfiguration initialServices={data}/>
  } else {
    return <p>Loading...</p>
  }
}
