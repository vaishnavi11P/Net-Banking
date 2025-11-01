import api from '@/lib/axios'
import { Card } from '@/types/card'


export const getMyCards = (): Promise<Card[]> => api.get('/cards/user').then(r => r.data)


export const createCard = (cardType: 'DEBIT' | 'CREDIT', accountId?: number) =>
    api.post('/cards/create', new URLSearchParams({ cardType, ...(accountId ? { accountId: String(accountId) } : {}) }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(r => r.data)


export const updateCardStatus = (cardId: number, status: string) =>
    api.put(`/cards/${cardId}/status`, null, { params: { status } }).then(r => r.data)


export const deleteCard = (cardId: number) => api.delete(`/cards/${cardId}`).then(r => r.data)