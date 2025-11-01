export type TxType = 'TRANSFER' | 'DEPOSIT' | 'WITHDRAWAL'
export type TxStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'


export interface TransactionViewDto {
    id: number
    transactionReference: string
    amount: number
    transactionType: TxType
    status: TxStatus
    description?: string
    transactionDateEpoch?: number
    fromAccountNumber?: string
    toAccountNumber?: string
}