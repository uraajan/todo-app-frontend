import Axios from "axios"
import { API_HOST_PORT } from "../../Constants";

class HelloWorldService {
    execute() {
        return Axios.get(`${API_HOST_PORT}/hello-world`);
    }

    executeBean() {
        return Axios.get(`${API_HOST_PORT}/hello-world-bean`);
    }

    executePathVariable(name, id) {
        return Axios.get(`${API_HOST_PORT}/hello-world/path-variable/${name}/${id}`);
    }
}

export default new HelloWorldService()