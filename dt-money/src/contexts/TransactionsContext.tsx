import { createContext } from "use-context-selector";
import type { newTransactionFormInputs } from "./TransactionsProvider";

export interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    category: string;
    price: number;
    createdAt: string;
}

interface TransactionsContextType {
    transactions: Transaction[],
    fetchTransactions: (query?: string) => Promise<void>,
    createTransaction: (data: newTransactionFormInputs) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

