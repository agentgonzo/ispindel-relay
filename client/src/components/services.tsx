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
  const [saveEnabled, setSaveEnabled] = useState(false)

  const onSubmit = (services: IService[]) => {
    updateServices(services).then(() => {
    })
  }

  return (
    <>
      <Accordion className="mt-3 mb-3">
        <Form id="form-parent" noValidate validated={true}>
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
                    setSaveEnabled((document.getElementById('form-parent') as HTMLInputElement).checkValidity())
                    setServices([...services])
                  }}
                  onRemove={(service) => {
                    setServices(services.filter(s => s !== service))
                  }}
                />
              </Accordion.Body>
            </Accordion.Item>
          ))}

        </Form>

      </Accordion>

      <div className="d-flex justify-content-between">
        <Button
          variant="outline-primary"
          onClick={() => {
            setServices([...services, {type: "HTTP", key: Math.random().toString()} as IServiceWithKey])
          }}>
          Add Service
        </Button>

        <Button disabled={!saveEnabled} onClick={() => {
          setSaveEnabled(false)
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
  const handleChange = (event: React.ChangeEvent<HTMLElement>) => {
    // @ts-ignore
    service[event.target.name] = event.target.value
    onChange(service)
  }

  const error = service.error &&
    <Alert variant="danger">The last delivery to this service failed: {service.error}</Alert>

  return <>
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

    <ServiceFieldForm fieldName='url' defaultValue={service.url} onChange={handleChange}/>

    <div className="d-flex justify-content-between">
      <Button variant="danger" onClick={() => {
        onRemove(service)
      }}>Delete</Button>
      <Button variant="outline-primary" onClick={() => {
        alert("TODO: Open a modal to test the endpoint")
      }}>Test</Button>
    </div>
  </>
}

interface IServiceFieldFormProps {
  fieldName: string
  defaultValue: string
  onChange: any
}

const ServiceFieldForm: FC<IServiceFieldFormProps> = ({fieldName, defaultValue, onChange}) => (
  <Form.Group as={Row} className="mb-3" controlId="formUrl">
    <Form.Label column sm="2">
      URL
    </Form.Label>
    <Col sm="10">
      <Form.Control name={fieldName} placeholder="https://example.com" defaultValue={defaultValue} required onChange={onChange}/>
      <Form.Control.Feedback type="invalid">This is the URL that data will be forwarded to</Form.Control.Feedback>
    </Col>
  </Form.Group>
)
