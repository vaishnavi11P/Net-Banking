import api from '@/lib/axios'
import { TransactionViewDto } from '@/types/transaction'


export const transfer = (payload: { fromAccountNumber: string; toAccountNumber: string; amount: number; description?: string }) =>
    api.post('/transactions/transfer', payload).then(r => r.data as {
        message: string
        transactionReference: string
        amount: number
        status: string
        fromAccount: string
        toAccount: string
    })


export const getTransactionsForAccount = (accountId: number): Promise<TransactionViewDto[]> =>
    api.get(`/transactions/account/${accountId}`).then(r => r.data)