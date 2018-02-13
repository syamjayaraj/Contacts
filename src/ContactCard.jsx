import React from 'react';
import { Grid, Col, Image, Button, Glyphicon } from 'react-bootstrap';

const ContactCard = ({contact}) => {
	
	return(
<Grid>
    <Col lg={2}>
		<Image src={contact.photo} circle width="120" height="120" />
    </Col>
	<Col lg={6}>
						<h4> <Glyphicon glyph="glyphicon glyphicon-user" /> {contact.name + ' ' + contact.surname}</h4>					
						<h5> <Glyphicon glyph="glyphicon glyphicon-earphone" /> {contact.phone}</h5>
						<h5> <Glyphicon glyph="glyphicon glyphicon-envelope" /> {contact.email}</h5>
						<p> <Glyphicon glyph="glyphicon glyphicon-home" /> {contact.address}</p>
						<Col lg={2}>
						<Button bsStyle="success"><Glyphicon glyph="glyphicon glyphicon-earphone" /> Call</Button>
						</Col>
						<Col lg={3}>
							<Button bsStyle="warning"><Glyphicon glyph="glyphicon glyphicon-envelope" /> Message</Button>	
						</Col>
						<Col lg={2}>
							<Button bsStyle="default"><Glyphicon glyph="glyphicon glyphicon-envelope" /> Email</Button>	
						</Col>			
		</Col>
</Grid>  
    )
}

export default ContactCard;