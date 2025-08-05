import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsTable, TransactionsWrapper } from "./styles";

export function Transactions() {
    return (
        <div>
            <Header/>
            <Summary/>
            <TransactionsWrapper>
                <SearchForm />
                <TransactionsTable>
                <tbody>
                    <tr>
                        <td width="50%">Desenvolvimento de site</td>
                        <td>
                            <PriceHighlight $variant="income">
                                R$ 12.000,00
                            </PriceHighlight>
                        </td>
                        <td>Venda</td>
                        <td>13/04/2022</td>
                    </tr>
                      <tr>
                        <td width="50%">Aluguel do apartamento</td>
                        <td>
                            <PriceHighlight $variant="outcome">
                                - R$ 1.200,00
                            </PriceHighlight>
                        </td>
                        <td>Casa</td>
                        <td>27/03/2022</td>
                    </tr>
                </tbody>
            </TransactionsTable>
            </TransactionsWrapper>
        </div>
    )
}