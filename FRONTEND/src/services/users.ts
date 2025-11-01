import api from '@/lib/axios'
import { UserMeDto } from '@/types/user'


export const getMe = (): Promise<UserMeDto> => api.get('/users/me').then(r => r.data)


export const updateMe = (payload: Partial<UserMeDto> & { dateOfBirth?: string }) =>
    api.put('/users/me', payload).then(r => r.data)