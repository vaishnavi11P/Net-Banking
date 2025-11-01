export const inr = (n: number | string) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(Number(n))


export const shortDateTime = (epoch?: number) => (epoch ? new Date(epoch).toLocaleString() : '')