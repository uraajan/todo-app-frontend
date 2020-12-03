import Axios from "axios";
import { JPA_API_HOST_PORT } from "../../Constants";

class TodosDataService {
    
    // GET
    getAllTodos(username) {
        return Axios.get(`${JPA_API_HOST_PORT}/users/${username}/todos`);
    }

    // GET
    getTodo(username, id) {
        return Axios.get(`${JPA_API_HOST_PORT}/users/${username}/todos/${id}`);
    }

    // PUT
    updateTodo(username, id, todo) {
        return Axios.put(`${JPA_API_HOST_PORT}/users/${username}/todos/${id}`, todo);
    }

    // POST
    addTodo(username, todo) {
        return Axios.post(`${JPA_API_HOST_PORT}/users/${username}/todos/`, todo);
    }

    // DELETE
    deleteTodo(username, id) {
        return Axios.delete(`${JPA_API_HOST_PORT}/users/${username}/todos/${id}`);
    }

}

export default new TodosDataService()