import React, { Component } from 'react';
import AddContact from './AddContact';
import SearchBar from './SearchBar';
import ContactCard from './ContactCard';

import { Navbar, Nav, NavDropdown, MenuItem, ListGroup, ListGroupItem } from 'react-bootstrap';

const contactsAPI = 'https://demo1443058.mockable.io/codeproject_tutorial/api/contacts';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchResult: [],
      contactList: []
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.returnContactList = this.returnContactList.bind(this);
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
          <AddContact />
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
