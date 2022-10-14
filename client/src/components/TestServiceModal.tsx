import * as React from "react";
import {FC, ReactElement, useState} from "react";
import {Alert, Button, Modal} from 'react-bootstrap'
import {IService} from './services'
import axios from 'axios'


interface IProps {
  show: boolean
  // serviceType: ServiceType
  service: IService
  handleClose: () => void
}

export const TestServiceModal: FC<IProps> = ({service, show, handleClose}): ReactElement => {
  const [enableTestButton, setEnableTestButton] = useState(true)
  const [error, setError] = useState(undefined)
  const [done, setDone] = useState(false)

  const testService = async () => {
    try {
      setEnableTestButton(false)
      await axios.post('/api/services/test', service)
      setDone(true)
      setEnableTestButton(true)
      setError(undefined)
    } catch (err) {
      setDone(true)
      setEnableTestButton(true)
      setError(JSON.stringify(err.response.data.error))
    }
  }

  const success = <Alert variant="success">Test success!</Alert>
  const failure = <Alert variant="danger">Test failed: {error}</Alert>

  return <Modal show={show} onHide={() => {
    setDone(false)
    setError(undefined)
    handleClose()
  }}>
    <Modal.Header closeButton>
      <Modal.Title>Test {service.type} service</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>This will send some test data to your service. If you have a fermentation underway at the moment, then this test data will appear along with your real data!</p>
      <p>The following data will be sent</p>
      <ul>
        <li>Specific Gravity: <code>1.050</code></li>
        <li>Temperature: <code>25</code></li>
        <li>Temperature Units: <code>C</code></li>
        <li>Battery: <code>3.5</code></li>
        <li>Tilt angle: <code>45</code></li>
        <li>Interval: <code>1800</code></li>
      </ul>
      {done && (error ? failure : success)}
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={!enableTestButton} onClick={testService} variant="primary">
        Test
      </Button>
    </Modal.Footer>
  </Modal>
}


