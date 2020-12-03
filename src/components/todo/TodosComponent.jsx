import React, { Component } from "react";
import moment from 'moment'
import TodosDataService from "../../api/todo/TodosDataService";
import AuthenticationService from "../../api/todo/AuthenticationService";

class TodosComponent extends Component {

    constructor() {
        console.log("TodosComponent constructor")
        super()
        this.state = {
            todos: [],
            deleteMessage: null
        }
        this.deleteTodo = this.deleteTodo.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.addTodo = this.addTodo.bind(this)
    }

    componentDidMount() {
        console.log("TodosComponent componentDidMount")
        this.refreshTodos()
    }

    componentWillUnmount() {
        console.log("TodosComponent componentWillUnmount")
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("TodosComponent shouldComponentUpdate")
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    render() {
        console.log("TodosComponent render")
        return (
            <>
                <h1>Todos</h1>
                {this.state.deleteMessage && <div className="alert alert-success">{this.state.deleteMessage}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is Completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo => 
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td>{moment(todo.targetDate.toString()).format("YYYY-MM-DD")}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodo(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodo(todo.id)}>Delete</button></td>
                                        </tr>        
                                )
                                
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <button className="btn btn-success" onClick={this.addTodo}>Add</button>
                </div>
            </>
        );
    }

    deleteTodo(id) {
        let username = AuthenticationService.getLoggedInUser()
        TodosDataService.deleteTodo(username, id)
            .then(response => {
                this.setState({deleteMessage: `Delete successful: ${id}`})
                this.refreshTodos()
            }).catch(error => {
                console.log(error.response)
            })
    }

    updateTodo(id) {
        this.props.history.push(`/todos/${id}`)
    }

    addTodo() {
        this.props.history.push(`/todos/-1`)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUser();
        TodosDataService.getAllTodos(username)
            .then((response) => {
                this.setState({todos: response.data})
            })
            .catch((error) => {
                if (error.message) {
                    console.log(error.message)
                }
                if (error.response && error.response.data) {
                    console.log(error.response.data.response)
                }
        })
    }
}

export default TodosComponent