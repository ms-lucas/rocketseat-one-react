import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryWrapper } from "./styles";
import { priceFormatter } from "../../utils/formatter";
import { useSummary } from "../../hooks/useSummary";

export function Summary() {
     
    const sumarry = useSummary()

    return (
        <SummaryWrapper>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </header>
                
                <strong>{priceFormatter.format(sumarry.income)}</strong>
            </SummaryCard>

            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68" />
                </header>
                
                <strong>{priceFormatter.format(sumarry.outcome)}</strong>
            </SummaryCard>

            <SummaryCard $variant="green">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#ffffff" />
                </header>
                
                <strong>{priceFormatter.format(sumarry.total)}</strong>
            </SummaryCard>
        </SummaryWrapper>
    )
}