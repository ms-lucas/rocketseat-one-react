import { useCallback, useEffect, useState, type ReactNode } from "react"
import { TransactionsContext, type Transaction } from "./TransactionsContext"
import { api } from "../lib/axios"

interface TransactionsProviderProps {
    children: ReactNode[]
}

export interface newTransactionFormInputs  {
    description: string;
    price: number;
    category: string;
    type: "income" | "outcome";
}

export function TransactionsProvider({children}: TransactionsProviderProps) {

    const fetchTransactions = useCallback(async (query?: string) => {

        const response = await api.get('transactions', {
            params: {
                q: query
            }
        })

        setTransactions(response.data)
    }, [])

     const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    const createTransaction = useCallback(async ({description, price, category, type}: newTransactionFormInputs) => {
         const response = await api.post('transactions', {
                    description,
                    price,
                    category,
                    type,
                    createdAt: new Date()  
                })

        setTransactions((prev) => [...prev, response.data])
        
    }, [])

    return  (
        <TransactionsContext.Provider value={{transactions, fetchTransactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}