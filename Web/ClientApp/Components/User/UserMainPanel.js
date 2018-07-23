import React, { Component } from 'react';
import { Header, Button, Form, Input, Select, Segment, Divider } from 'semantic-ui-react';


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]

const Birthday = () => (
        <div />
    )

class UserMainPanel extends Component {
    render() {
        return (
            <Segment>
                <Header as='h4'>bio/contact information</Header>
                <Form>
                    <Form.Group>
                        <Form.Field control={Input} label='first name' placeholder='first name' value={this.props.data.firstname} />
                        <Form.Field control={Input} label='last name' placeholder='last name' value={this.props.data.lastname} />
                        <Form.Field control={Select} label='gender' options={options} placeholder='Gender' value={this.props.data.gender} />
                        <Form.Field label='birthday' control={Birthday} />
                    </Form.Group>
                    <Divider hidden/>
                    <Form.Group widths='equal'>
                        <Form.Input fluid icon='phone square' iconPosition='left' placeholder='phone' value={this.props.data.phone} />
                        <Form.Input fluid icon='at' iconPosition='left' value={this.props.data.email} readOnly/>
                    </Form.Group>
                    <Form.Field control={Button}>Save</Form.Field>
                </Form>
            </Segment>
        )
    }
}
export default UserMainPanel;