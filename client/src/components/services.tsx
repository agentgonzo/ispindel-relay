import * as React from 'react'
import {FC, ReactElement, useState} from 'react'
import {Accordion, Alert, Button, Col, Form, Row} from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';
import {updateServices} from '../api'

export interface IService {
  type: string
  url: string
  error?: string
}

export interface IServiceWithKey extends IService {
  key: string
}

export const ServicesConfiguration: FC<{ initialServices: IService[] }> = ({initialServices}): ReactElement => {
  const [services, setServices] = useState(initialServices as IServiceWithKey[])

  const onSubmit = (services: IService[]) => {
    console.log(`submitting ${services}`)
    updateServices(services).then(() => {
    })
  }

  return (
    <>
      <Accordion className="mt-3 mb-3">
        {services.map((service) => (
          <Accordion.Item eventKey={service.key} key={service.key}>
            <Accordion.Header>
              <div className="w-100 d-flex justify-content-between">
                {service.type} → {service.url}
                {service.error &&
                  <div style={{marginRight: '1rem'}}>
                    <Icon.ExclamationCircle color="red"/>
                  </div>
                }
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ServicesForm
                service={service}
                onChange={() => {
                  setServices([...services])
                }}
                onRemove={(service) => {
                  setServices(services.filter(s => s != service))
                }}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <div className="d-flex justify-content-between">
        <Button
          variant="outline-primary"
          onClick={() => {
            setServices([...services, {type: "HTTP", key: Math.random().toString()} as IServiceWithKey])
          }}>
          Add Service
        </Button>

        <Button onClick={() => {
          onSubmit(services)
        }}>
          Save
        </Button>
      </div>
    </>
  )
}


interface IServiceFromProps {
  service: IServiceWithKey
  onChange: (service: IServiceWithKey) => void
  onRemove: (service: IServiceWithKey) => (void)
}

const ServicesForm: FC<IServiceFromProps> = ({service, onChange, onRemove}): ReactElement => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // @ts-ignore
    service[event.target.name] = event.target.value
    onChange(service)
  }

  const error = service.error &&
    <Alert variant="danger">The last delivery to this service failed: {service.error}</Alert>

  return <Form noValidate validated={true}>
    <Form.Group as={Row} className="mb-3" controlId="formType">
      {error}
      <Form.Label column sm="2">
        Type
      </Form.Label>
      <Col>
        <Form.Select name="type" defaultValue={service.type} onChange={handleChange}>
          <option value="HTTP">HTTP</option>
          <option value="InfluxDB">InfluxDB</option>
          <option value="Another">Another</option>
        </Form.Select>
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3" controlId="formUrl">
      <Form.Label column sm="2">
        URL
      </Form.Label>
      <Col sm="10">
        <Form.Control name="url" placeholder="https://example.com" defaultValue={service.url} required onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">This is the URL that data will be forwarded to</Form.Control.Feedback>
      </Col>
    </Form.Group>
    <div className="d-flex justify-content-between">
      <Button variant="danger" onClick={() => {
        onRemove(service)
      }}>Delete</Button>
      <Button variant="outline-primary" onClick={() => {alert("TODO: Open a modal to test the endpoint")}}>Test</Button>
    </div>
  </Form>
}
