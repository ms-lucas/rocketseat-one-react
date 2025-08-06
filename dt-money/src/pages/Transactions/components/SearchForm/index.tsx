import { useForm } from "react-hook-form";
import { SearchFormWrapper } from "./styles";
import {MagnifyingGlass} from 'phosphor-react'
import { z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const searchFormSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {

    const {fetchTransactions} = useContextSelector(TransactionsContext, (context) => {
        return {fetchTransactions: context.fetchTransactions}
    })

    const {register, handleSubmit, formState: {isSubmitting}} = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransactions({query}: SearchFormInputs) {
        await fetchTransactions(query)
    }

    return (
        <SearchFormWrapper onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque uma transação"
                {...register('query')}
            />  
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SearchFormWrapper>
    )
}