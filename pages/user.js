import React from 'react'
import Link from 'next/link'
const axios = require('axios');
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default class extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: null,
            title: '',
            body: '',
            notes: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getNotes() {
        axios.get('/api/notes')
        .then(response => {
            this.setState({
                notes: response.data.data,
            })
        })
        .catch(error => {
            this.setState({
                alertText: 'Something went wrong!',
                alertStyle: 'alert-danger',
            })
        })
    }

    componentDidMount () {
        this.setState({
            user: localStorage.getItem('user_id'),
        })

        this.getNotes();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        const note = {
            'title': this.state.title,
            'description': this.state.description,
        }

        axios.post('/api/notes', note)
        .then(response => {
            const notes = [...this.state.notes];
            notes.push(
                {
                    'id': response.data.data.title,
                    'title': response.data.data.title,
                    'description': response.data.data.description,
                }
            )

            this.setState({
                title: '',
                description: '',
                notes,
            })
        })
        .catch(error => {
            this.setState({
                alertText: 'Something went wrong!',
                alertStyle: 'alert-danger',
            })
        })
    }

    removeNote(id) {
        debugger
        axios.delete(`/api/notes?id=${id}`)
        .then(response => {
            this.getNotes();
        })
        .catch(error => {
            this.setState({
                alertText: 'Something went wrong!',
                alertStyle: 'alert-danger',
            })
        })
    }
  
    render() {
        if (this.state.user) {
            return (
                <p className="lead text-center mt-5 mb-5">
                    <div className="container box-shadow p-2">
                        <div className="col-4 d-inline-block align-top">
                            <ul type="none" className="border-right text-start p-0">
                                {this.state.notes.map((note) => (
                                    <div key={note._id}>
                                        <li className="border-bottom px-3 py-3 fs-14">
                                            <div className="col-10 d-inline-block">
                                                <h6 className="m-0">{note.title}</h6>
                                                <span>{note.description}</span>
                                            </div>
                                            <div className="col-2 d-inline-block align-top cursor-pointer" onClick={() => this.removeNote(note._id)}>
                                                X
                                            </div>
                                        </li>
                                    </div>
                                ))}
                                {this.state.notes.length == 0 && <li>No notes available</li>}
                            </ul>
                        </div>

                        <Form method="post" onSubmit={this.handleSubmit} className="col-7 d-inline-block offset-1">
                            <FormGroup>
                                <Label className="text-start" sm={4}>Title:</Label>
                                <Col>
                                    <Input
                                        name="title"
                                        value={this.state.title}
                                        placeholder="Enter title"
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Label className="text-start" sm={4}>Description:</Label>
                                <Col>
                                    <Input
                                        name="description"
                                        type="textarea"
                                        value={this.state.description}
                                        placeholder="Enter body"
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>

                            <Col sm={12} className="mt-4">
                                <p className="text-end">
                                    <Button color="primary" type="submit">Save</Button>
                                </p>
                            </Col>
                        </Form>
                    </div>
                </p>
            )
        } else {
            return (
                <div className="text-center pt-5 pb-5 text-black">
                    <h1 className="display-4 mb-5">Access Denied</h1>
                    <p className="lead">Please <Link href="/"><a>LOGIN</a></Link> to check this page.</p>
                </div>
              )
        }
    }
}