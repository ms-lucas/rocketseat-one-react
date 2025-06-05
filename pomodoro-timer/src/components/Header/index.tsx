import { TimerIcon, ScrollIcon } from '@phosphor-icons/react'
import { HeaderWrapper } from "./styles";
import appLogo from '../../assets/app-logo.svg'
import { NavLink } from 'react-router-dom';

export function Header() {
    return (
        <HeaderWrapper>
            <img src={appLogo} />
            <nav>
                <NavLink to="/" title='Temporizador'>
                    <TimerIcon />
                </NavLink>
                <NavLink to="/history" title='Histórico'>
                    <ScrollIcon />
                </NavLink>
            </nav>
        </HeaderWrapper>
    )
}