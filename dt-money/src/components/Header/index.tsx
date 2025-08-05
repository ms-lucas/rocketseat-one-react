import { HeaderContent, HeaderWrapper, NewTransactionButton } from "./styles";
import appLogo from '../../assets/app-logo.svg'
import { NewTransactionModal } from "../NewTransactionModal";
import * as Dialog from '@radix-ui/react-alert-dialog'

export function Header() {
    return (
    <HeaderWrapper>
        <HeaderContent>
            <img src={appLogo} />

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <NewTransactionButton>Nova transação</NewTransactionButton>
                </Dialog.Trigger>

                <NewTransactionModal />
            </Dialog.Root>
        </HeaderContent>
    </HeaderWrapper>
    )    
}