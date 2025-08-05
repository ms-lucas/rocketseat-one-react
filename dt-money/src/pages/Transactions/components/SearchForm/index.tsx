import { SearchFormWrapper } from "./styles";
import {MagnifyingGlass} from 'phosphor-react'

export function SearchForm() {
    return (
        <SearchFormWrapper>
            <input type="text" placeholder="Busque uma transação"/>  
            <button type="submit">
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SearchFormWrapper>
    )
}