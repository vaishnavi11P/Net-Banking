export type CardType = 'DEBIT' | 'CREDIT'
export type CardStatus = 'ACTIVE' | 'BLOCKED' | 'EXPIRED' | 'INACTIVE'


export interface Card {
    id: number
    cardNumber: string
    cardType: CardType
    cardHolderName: string
    expiryDate: string
    status: CardStatus
    accountId?: number
}