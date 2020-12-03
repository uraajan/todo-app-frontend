import Axios from "axios";
import { API_HOST_PORT, SESSION_STORAGE_USER_AUTHENTICATE_KEY } from "../../Constants";

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        console.log("executeBasicAuthenticationService")
        return Axios.get(`${API_HOST_PORT}/basicauth`, {
            headers: {
                authorization: this.generateAuthToken(username, password)
            }
        })
    }

    executeJwtAuthenticationService(username, password) {
        console.log("executeJwtAuthenticationService")
        return Axios.post(`${API_HOST_PORT}/authenticate`, {
            username, password
        })
    }

    executeJwtRegisterService(username, password) {
        console.log("executeJwtAuthenticationService")
        return Axios.post(`${API_HOST_PORT}/register`, {
            username, password
        })
    }

    generateAuthToken(username, password) {
        return "Basic " + window.btoa(username + ":" + password)
    }

    generateJwtToken(token) {
        return "Bearer " + token
    }
    
    registerSuccessfulLogin(username, token) {
        sessionStorage.setItem(SESSION_STORAGE_USER_AUTHENTICATE_KEY, username);
        //this.setupAxiosInterceptors(this.generateAuthToken(username, password));
        this.setupAxiosInterceptors(this.generateJwtToken(token));
    }

    logout() {
        sessionStorage.removeItem(SESSION_STORAGE_USER_AUTHENTICATE_KEY);
    }

    isUserLoggedIn() {
        var user = sessionStorage.getItem(SESSION_STORAGE_USER_AUTHENTICATE_KEY);
        if (user === null) {
            return false;
        } else {
            return true;
        }
    }

    getLoggedInUser() {
        return sessionStorage.getItem(SESSION_STORAGE_USER_AUTHENTICATE_KEY);
    }

    setupAxiosInterceptors(authHeader) {
        console.log("setupAxiosInterceptors")
        Axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = authHeader
                }
                return config
            }
        )
    }

}

export default new AuthenticationService()