import api from '@/lib/axios'


export const register = (payload: {
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    address?: string
}) => api.post('/auth/register', payload).then(r => r.data)


export const login = (payload: { username: string; password: string }): Promise<{ token: string; type: string; username: string }> =>
    api.post('/auth/login', payload).then(r => r.data)