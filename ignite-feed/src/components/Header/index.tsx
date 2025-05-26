import styles from './style.module.css';
import appLogo from '../../assets/images/app-logo.svg'

export function Header() {
    return (
        <header className={styles.header}>
            <img src={appLogo} alt="Logotipo do Ignite" />
            <strong>Ignite Feed</strong>
        </header>
    )
}