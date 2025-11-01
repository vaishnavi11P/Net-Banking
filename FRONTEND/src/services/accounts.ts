import api from '@/lib/axios';
import { Account } from '@/types/accounts';


export const getMyAccounts = (): Promise<Account[]> => api.get('/accounts/user').then(r => r.data)


export const createAccount = (accountType: string) =>
    api.post(`/accounts/create`, null, { params: { accountType } }).then(r => r.data as { message: string; accountNumber: string; accountType: string; balance: number })


export const deleteAccount = (accountId: number) => api.delete(`/accounts/${accountId}`).then(r => r.data)


export const getAccountByNumber = (accountNumber: string) => api.get(`/accounts/${accountNumber}`).then(r => r.data as Account)