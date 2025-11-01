import axios from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
})


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt_token')
    const type = localStorage.getItem('token_type') || 'Bearer'
    if (token) {
        config.headers = config.headers || {}
        config.headers['Authorization'] = `${type} ${token}`
    }
    return config
})


export default api
