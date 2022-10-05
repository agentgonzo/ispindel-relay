import * as React from "react";
import {FC, ReactElement} from "react";
import {Col, Form, Row} from 'react-bootstrap'
import * as moment from 'moment'
import {useServices} from '../api'

export interface IFermentationData {
  gravity: number
  temperature: number
  battery: number // volts
  lastUpdate: number
  tilt: number
  period: number
}

export const CurrentData: FC<IFermentationData> = ({gravity, temperature, battery, lastUpdate, tilt, period}): ReactElement => {
  const services = useServices()

  const originalGravity = 1.055 // TODO. Get this from the data
  const attenuation = calculateAttenuation(originalGravity, gravity)
  const abv = (originalGravity - gravity) * 131.25
  // Battery 'normal' ranges are 3.0 - 4.1V
  const batteryString = `${calculateBatteryPercentage(battery).toFixed(0)}% (${battery}V)`

  const servicesWithError = services?.filter(s => s.error).length
  const servicesErrorText = servicesWithError && ` (${servicesWithError} failing)`

  return <>
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Temperature</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={temperature + '°C'}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Specific gravity</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={gravity}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Battery</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={batteryString}/>
        </Col>
      </Form.Group>
    </Form>

    <hr/>

    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Original gravity</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={originalGravity}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Current attenuation</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={attenuation.toFixed(1) + '%'}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Current ABV</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={abv.toFixed(1) + '%'}/>
        </Col>
      </Form.Group>
    </Form>

    <hr/>

    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Tilt</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={tilt + '°'}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Update Period</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={moment.duration({seconds: period}).humanize()}/>
        </Col>
      </Form.Group>
    </Form>

    {services?.length && <div>
      {/*<div className="circle"/>*/}
      <p>Sending to {services.length} services{servicesErrorText}.</p>
    </div>}
    <p>Last Updated: <i>{moment(lastUpdate).fromNow()}</i></p>
  </>
}

const calculateAttenuation = (og: number, fg: number) => {
  return 100 - ((fg - 1) / (og - 1)) * 100
}

const calculateBatteryPercentage = (voltage: number) => {
  const high = 4.1
  const low = 3.0
  const range = high - low
  return (voltage - low) / range * 100
}
