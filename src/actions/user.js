import axios from 'axios'
import {setUser} from "../reducers/userReducer";
import {API_URL} from "../config";

export const registration = async (email, password) => {
    try {
        console.log(email, password)
        const res = await axios.post(`${API_URL}/api/auth/registration`, {email, password})
        console.log(res.data.message)
    }
    catch(e) {
        console.log(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, {email, password})
            console.log(res.data)
            dispatch(setUser(res.data.user))
            localStorage.setItem('token', res.data.token)
        }
        catch(e) {
            console.log(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/api/auth/auth`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setUser(res.data.user))
            localStorage.setItem('token', res.data.token)
        }
        catch(e) {
            console.log(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}

export const uploadAvatar = file => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await axios.post(`${API_URL}/api/files/avatar`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setUser(res.data))
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const res = await axios.delete(`${API_URL}/api/files/avatar`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setUser(res.data))
        }
        catch(e) {
            console.log(e)
        }
    }
}