import React, { Component } from 'react';

import SearchBar from './SearchBar';
import ContactCard from './ContactCard';

import { Navbar, Nav, NavDropdown, MenuItem, ListGroup, ListGroupItem, Button, Modal, Col, Glyphicon, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

const contactsAPI = 'https://demo1443058.mockable.io/codeproject_tutorial/api/contacts';


class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      searchText: '',
      searchResult: [],
      contactList: [],
      show: false,
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.returnContactList = this.returnContactList.bind(this);
  }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  handleSearch(searchText) {   
    this.setState({searchResult: [], searchText: searchText});
    this.state.contactList.map(contact => {
      if(searchContact(contact, searchText)) {
         this.setState( prevState => ({
           searchResult: [...prevState.searchResult, contact]
         }), () => console.log(this.state.searchResult))
      }
    })
  }


  componentWillMount() {
    let init = {
         method: 'GET',
         headers: new Headers(),
         mode: 'cors',
         cache: 'default' 
      };

    fetch(contactsAPI, init)
      .then( response => response.json())
      .then( 
        data => this.setState( 
          prevState => ({
          contactList: [...data.contacts]
          }) 
        )
      )
  }


  returnContactList() {
   return this.state.searchText ? this.state.searchResult :this.state.contactList
  }
  


  render() {
    return (
      <div>
        <Navbar collapseOnSelect fixedTop>
        <Navbar.Header>
        <Navbar.Brand>
            <a href="#brand">CONTACTS</a>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav pullRight>
            <NavDropdown eventKey={1} title="John R" id="basic-nav-dropdown">
            <MenuItem eventKey={1.1}>Profile</MenuItem>
            <MenuItem eventKey={1.2}>Account</MenuItem>
            <MenuItem eventKey={1.3}>Settings</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={1.3}>Logout</MenuItem>
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
      <br /> <br /> <br />
      <div className="container">
        <div className="col-lg-8 col-lg-offset-2">

        <div>
        <Col lg={4} lgOffset={11}>
            <div className=" input-group-lg">
                <Button bsStyle="default" bsSize="large" onClick={this.handleShow}>
                    <Glyphicon glyph="glyphicon glyphicon-plus" />
                </Button>
            </div>
            <br />
        </Col>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Name" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Mobile
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Mobile" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Email" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Address
              </Col>
              <Col sm={10}>
                <FormControl componentClass="textarea" placeholder="Address" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">Save</Button>
              </Col>
            </FormGroup>
          </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>


  
          <br />       
          <SearchBar onSearch={this.handleSearch} />
          <br />
          <ListGroup className="list-group" id="contact-list">
            { this.returnContactList().map(
                (contact) => 
                  <ListGroupItem key={contact.email} className="list-group-item"> 
                    <ContactCard contact = {contact}/>
                  </ListGroupItem>
              )
            }
          </ListGroup>     
        </div>
      </div>
    </div>
  
     
    );
  }
}

const searchContact = (contact, searchText) => (
 contact.name.toLowerCase().search(searchText.toLowerCase()) != -1 ||
 contact.surname.toLowerCase().search(searchText.toLowerCase()) != -1 ||
 contact.phone.toString().search(searchText) != -1
)

export default App;
