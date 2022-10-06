import * as React from 'react'
import {FC, ReactElement, useState} from 'react'
import {Accordion, Alert, Button, Col, Form, Row} from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';
import {updateServices} from '../api'
import {TestServiceModal} from './TestServiceModal'

export enum ServiceType {
  HTTP = 'HTTP',
  InfluxDB = 'InfluxDB',
  Ubidots = 'Ubidots',
}

export interface IService extends Object {
  type: ServiceType
  error?: string
}

export interface IServiceWithKey extends IService {
  key: string
}

export const ServicesConfiguration: FC<{ initialServices: IService[] }> = ({initialServices}): ReactElement => {
  const [services, setServices] = useState(initialServices as IServiceWithKey[])
  const [saveEnabled, setSaveEnabled] = useState(false)

  const onSubmit = (services: IService[]) => {
    // Remove error objects
    services.forEach(service => {delete service.error})
    updateServices(services).then(() => {})
  }

  const destination = (service: any) => (service.host || service.hostname || service.token)

  return (
    <>
      <Accordion className="mt-3 mb-3">
        <Form id="form-parent" noValidate validated={true}>
          {services.map((service) => (
            <Accordion.Item eventKey={service.key} key={service.key}>
              <Accordion.Header>
                <div className="w-100 d-flex justify-content-between">
                  {service.type} → {destination(service)}
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
                    setSaveEnabled((document.getElementById('form-parent') as HTMLInputElement).checkValidity())
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
            setServices([...services, {type: ServiceType.HTTP, key: Math.random().toString()} as IServiceWithKey])
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
  const [showModal, setShowModal] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLElement>) => {
    // @ts-ignore
    service[event.target.name.toLowerCase()] = event.target.value
    onChange(service)
  }

  const error = service.error &&
    <Alert variant="danger">The last delivery to this service failed: {service.error}</Alert>

  return <>
    <TestServiceModal service={service} show={showModal} handleClose={() => {setShowModal(false)}}/>
    <Form.Group as={Row} className="mb-3" controlId="formType">
      {error}
      <Form.Label column sm="2">
        Type
      </Form.Label>
      <Col>
        <Form.Select name="type" defaultValue={service.type} onChange={handleChange}>
          {Object.values(ServiceType).map(service => (<option key={service} value={service}>{service}</option>))}
        </Form.Select>
      </Col>
    </Form.Group>

    <FormsForService service={service} onChange={handleChange}/>

    <div className="d-flex justify-content-between">
      <Button variant="danger" onClick={() => {
        onRemove(service)
      }}>Delete</Button>
      <Button variant="outline-primary" onClick={() => {
        setShowModal(true)
      }}>Test</Button>
    </div>
  </>
}


interface IFormsForServiceProps {
  service: IServiceWithKey
  onChange: any
}

const FormsForService: FC<IFormsForServiceProps> = ({service, onChange}) => {
  // Probably change this from a dumb array of strings to an array of objects, with name, displayName, type and feedback (validation)
  const fieldsForType = {
    [ServiceType.HTTP]: ['Host', 'Port', 'Path', 'Token'],
    [ServiceType.InfluxDB]: ['Hostname', 'Port', 'Database'],
    [ServiceType.Ubidots]: ['Token'],
  }

  const fields = fieldsForType[service.type]

  return <>
    {fields.map(field => (<ServiceFieldForm key={service.key + field} fieldName={field} defaultValue={(service as any)[field.toLowerCase()]} onChange={onChange}/>))}
  </>
}

interface IServiceFieldFormProps {
  fieldName: string
  defaultValue: string
  onChange: any
}

const ServiceFieldForm: FC<IServiceFieldFormProps> = ({fieldName, defaultValue, onChange}) => (
  <Form.Group as={Row} className="mb-3" controlId="formUrl">
    <Form.Label column sm="2">{fieldName}</Form.Label>
    <Col sm="10">
      <Form.Control name={fieldName} defaultValue={defaultValue} required onChange={onChange}/>
    </Col>
  </Form.Group>
)
