import { HeaderContent, HeaderWrapper, NewTransactionButton } from "./styles";
import appLogo from '../../assets/app-logo.svg'

export function Header() {
    return (
    <HeaderWrapper>
        <HeaderContent>
            <img src={appLogo} />
            <NewTransactionButton>Nova transação</NewTransactionButton>
        </HeaderContent>
    </HeaderWrapper>
    )    
}