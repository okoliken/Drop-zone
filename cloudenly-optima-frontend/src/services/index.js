import axios from "axios";
let token = JSON.parse(localStorage.getItem('optimaState'))
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

export default () => {
    return axios.create({
        baseURL: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `${token.auth.auth.token}`
        }
    })
}
