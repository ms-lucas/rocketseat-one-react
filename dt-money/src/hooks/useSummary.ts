import { TransactionsContext } from "../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"

export function useSummary() {
    const {transactions} = useContextSelector(TransactionsContext, (context) => {
        return {transactions: context.transactions}
    })

    const sumarry = transactions.reduce(
        (acc, transaction) => {
            
            if(transaction.type === 'income') {
                acc.income += transaction.price
                acc.total += transaction.price
            }

            if(transaction.type === 'outcome') {
                acc.outcome += transaction.price
                acc.total -= transaction.price
            }

            return acc
        }, 
        {
            income: 0, 
            outcome: 0, 
            total: 0
        })

        return sumarry
}