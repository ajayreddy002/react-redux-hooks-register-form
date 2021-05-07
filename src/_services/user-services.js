import axios from "axios"
const BASE_URL = 'https://reqres.in/api';
axios.defaults.headers = {
    'Content-Type': 'application/json',
}
export const ApiMethods = {
    getAllUsers,
    createUser,
    updateUser,
    deleteRequest,
    login,
    register
}
async function login(url, payLoad) {
    try {
        const data = await axios.post(`${BASE_URL}/${url}`, payLoad);
        if (data.status === 200 && data.data && data.data.token) {
            const user = {
                loggedIn: true,
                user: payLoad.email
            }
            localStorage.setItem('user', JSON.stringify(user));
            return data.data.data
        }
    } catch (err) {
        return Promise.reject(err)
    }
}
async function register(url, payLoad) {
    try {
        const data = await axios.post(`${BASE_URL}/${url}`, payLoad);
        if (data.status === 200 && data.data) {
            console.log(data)
            return data.data.data
        }
    } catch (err) {
        return Promise.reject(err)
    }
}
async function getAllUsers(url){

    console.log(url, 'get request')
    try {
        const data = await axios.get(`${BASE_URL}/${url}?per_page=20`)
        if (data.status === 200 && data.data) {
            return data.data.data
        }
    } catch (err) {
        return err
    }
}
async function createUser(url, payLoad){
    try {
        const data = await axios.post(`${BASE_URL}/${url}`, payLoad);
        if (data.status === 200 && data.data) {
            console.log(data)
            return data.data.data
        }
    } catch (err) {
        return Promise.reject(err)
    }
}
async function updateUser(url, payLoad){
    try {
        const data = await axios.put(`${BASE_URL}/${url}`, payLoad);
        if (data.status === 200 && data.data) {
            console.log(data)
            return data.data.data
        }
    } catch (err) {
        return Promise.reject(err)
    }
}
function deleteRequest(url, payLoad){
    return axios.get(`${BASE_URL}/${url}`, payLoad);
}