import axios from "axios"


export const logInUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/sign-in`, data)
    return res.data
}

export const signUpUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/sign-up`, data)
    return res.data
}

//true
export const axiosJWT = axios.create()
export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
} 

// true
export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/refresh-token`, {
        withCredentials: true,
    })
    return res.data
}         