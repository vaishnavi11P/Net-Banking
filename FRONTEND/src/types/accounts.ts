export type AccountType = 'SAVINGS' | 'CURRENT' | 'FIXED_DEPOSIT'


export interface Account {
    id: number
    accountNumber: string
    accountType: AccountType
    balance: number
    currency: string
}