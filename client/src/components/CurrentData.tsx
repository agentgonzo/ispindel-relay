import * as React from "react";
import {FC, ReactElement, useState} from "react";
import {Button, Col, Form, InputGroup, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'
import * as moment from 'moment'
import {resetOriginalGravity, useServices} from '../api'

export interface IFermentationData {
  name: string
  gravity: number
  originalGravity: number
  temperature: number
  temp_units: string
  battery: number // volts
  lastUpdate: number
  angle: number
  rssi: number
  interval: number
}

export const CurrentData: FC<IFermentationData> = ({name, gravity, originalGravity, temperature, temp_units, battery, lastUpdate, angle, rssi, interval}): ReactElement => {
  const services = useServices()

  const [og, setOg] = useState(originalGravity)
  const attenuation = calculateAttenuation(og, gravity)
  const abv = (og - gravity) * 131.25
  // Battery 'normal' ranges are 3.0 - 4.1V
  const batteryString = `${calculateBatteryPercentage(battery).toFixed(0)}% (${battery.toFixed(2)}V)`

  const servicesWithError = services?.filter(s => s.error).length
  const servicesErrorText = servicesWithError ? ` (${servicesWithError} failing)` : ''

  const changeOriginalGravity = async () => {
    const og = (document.getElementById('originalGravity') as HTMLInputElement).valueAsNumber
    setOg(og)
    await resetOriginalGravity(og)
  }

  return <>
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Name</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={name}/>
        </Col>
      </Form.Group>

      <hr/>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Temperature</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={`${temperature.toFixed(1)}°${temp_units}`}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Specific gravity</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={gravity.toFixed(4)}/>
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
          <InputGroup>
            <OverlayTrigger placement="bottom" overlay={OverlayToolTip}>
              <Form.Control id="originalGravity" type="number" step="0.001" defaultValue={og.toFixed(4)}/>
            </OverlayTrigger>
            <Button onClick={changeOriginalGravity}>Update</Button>
          </InputGroup>
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
        <Form.Label column>Tilt angle</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={angle.toFixed(1) + '°'}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column>WiFi Signal Strength</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={rssi + ' dB'}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column>Update Interval</Form.Label>
        <Col sm="10">
          <Form.Control disabled value={moment.duration({seconds: interval}).humanize()}/>
        </Col>
      </Form.Group>
    </Form>

    {services?.length && <div>
      <p>Sending to {services.length} services{servicesErrorText}.</p>
    </div>}
    <p>Last Updated: <i>{moment(lastUpdate).fromNow()}</i></p>
  </>
}

const OverlayToolTip = (props: any) => (
  <Tooltip {...props}>
    <p>Original gravity is estimated from your iSpindel.</p>
    <p>If there is no data received from the iSpindel for 24 hours, it is assumed that a new fermentation has
      begun. The first data received is assumed to be the original gravity.</p>
    <p>You can reset this value here if you need to.</p>
  </Tooltip>
)

const calculateAttenuation = (og: number, fg: number) => {
  return 100 - ((fg - 1) / (og - 1)) * 100
}

const calculateBatteryPercentage = (voltage: number) => {
  const high = 4.1
  const low = 3.0
  const range = high - low
  return (voltage - low) / range * 100
}
