import React from 'react'
const axios = require('axios');
import Router from 'next/router'
import { Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap'

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            session: false,
            isSignedIn: false,
            email: 'admin@example.com',
            password: 'admin123',
            alertText: null,
            alertStyle: null
        }

        if (false) {
            this.state.email = props.session.user.email
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            alertText: null,
            alertStyle: null
        })
        
        if (!this.state.email && !this.state.password) return

        axios.post('/api/users/login', this.state)
        .then(response => {
            localStorage.setItem('user_id', response.data.data.token);
        
            Router.push(`/user`)
        })
        .catch(error => {
            this.setState({
                alertText: 'Invalid credentials',
                alertStyle: 'alert-danger',
            })
        })
    }

    render() {
        const onDismiss = () => this.setState({
            alertText: null,
            alertStyle: null
        });

        const alert = (this.state.alertText === null) ? <div/> : <Alert fade={true} toggle={onDismiss} className={`alert ${this.state.alertStyle}`} role="alert">{this.state.alertText}</Alert>

        return (
            <div>
                {alert}

                <div className="container app-form">
                    <Form method="post" onSubmit={this.handleSubmit}>
                        <Input name="_csrf" type="hidden" value={this.state.session.csrfToken}/>

                        <h1 className="text-center mb-4">Login</h1>
            
                        <FormGroup row>
                            <Label sm={4}>Email:</Label>
                            <Col sm={8} md={8}>
                                <Input
                                    name="email"
                                    value={this.state.email}
                                    placeholder="Enter Email"
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
            
                        <FormGroup row>
                            <Label sm={4}>Password:</Label>
                            <Col sm={8} md={8}>
                                <Input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    placeholder="Enter Password"
                                />
                            </Col>
                        </FormGroup>
            
                        <Col sm={12}>
                            <p className="text-end">
                                <Button color="primary" type="submit">Login</Button>
                            </p>
                        </Col>
                    </Form>
                </div>
            </div>
        )
    }
}