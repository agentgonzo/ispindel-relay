import * as React from 'react'
import {ReactElement} from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'
// @ts-ignore
import logo from '../images/ispindel.png'
import {Link} from 'react-router-dom'

export const NavBar = (): ReactElement => (
  <Navbar bg="secondary">
    <Container>
      <Navbar.Brand href="/">
        <img className="mr-3" src={logo} alt="iSpindel logo" width={30} height={30} style={{marginRight: 10}}/>
        iSpindel relay
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav" role="whatever">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="data">Current Data</Nav.Link>
          <Nav.Link as={Link} to="services">Services</Nav.Link>
          <Nav.Link as={Link} to="instructions">Instructions</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)
