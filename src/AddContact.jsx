import React from 'react';
import { Grid, Col, Button, Glyphicon } from 'react-bootstrap';

const AddContact = ({onSearch}) => {
	return(
    <Grid>
        <Col lg={4}>
            <div className=" input-group-lg">
                <Button bsStyle="default" bsSize="large">
                    <Glyphicon glyph="glyphicon glyphicon-plus" />
                </Button>
            </div>
        </Col>
    </Grid>
    )
}

export default AddContact;