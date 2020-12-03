import { ErrorMessage, Field, Form, Formik } from 'formik'
import moment from 'moment'
import React, { Component } from 'react'
import AuthenticationService from '../../api/todo/AuthenticationService'
import TodosDataService from '../../api/todo/TodosDataService'

class TodoComponent extends Component {

    constructor(props) {
        super()
        this.state = {
            id: props.match.params.id,
            description: "",
            targetDate: moment(new Date()).format("YYYY-MM-DD")
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        console.log("TodoComponent componentDidMount")
        if (this.state.id !== -1) {
            let username = AuthenticationService.getLoggedInUser()
            TodosDataService.getTodo(username, this.state.id)
                .then(response => this.setState(
                    {
                        description: response.data.description,
                        targetDate: moment(response.data.targetDate).format("YYYY-MM-DD")
                    }
                ))
                .catch(error => console.log(error.response))
        }
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUser()
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }
        if (this.state.id === -1) {
            TodosDataService.addTodo(username, todo)
            .then(response => this.props.history.push("/todos"))
            .catch(error => console.log(error.response))
        } else {
            TodosDataService.updateTodo(username, this.state.id, todo)
            .then(response => this.props.history.push("/todos"))
            .catch(error => console.log(error.response))
        }
    }

    validate(values) {
        let errors = {  }
        if (!values.description) {
            errors.description = "Invalid description"
        } else if (values.description.length < 10) {
            errors.description = "Description too short. Minimum 10 characters"
        }
        if (!moment(values.targetDate).isValid) {
            errors.targetDate = "Invalid target date"
        }
        console.log(values)
        return errors
    }

    render() {
        console.log("TodoComponent render")
        let { description, targetDate } = this.state
        
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{ description, targetDate }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                                    
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                    </div>
            </div>
        )
    }

}

export default TodoComponent