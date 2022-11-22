import Logo from '../Logo/Logo';
import styles from './Footer.module.css';

function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.companyInfo}>
                <Logo />
                <p className={styles.caption}>Travel, enjoy and live a new life</p>
            </div>
            <div className={styles.copyright}>
                All rights reserved@travelgo
            </div>
        </div>
    );
}

export default Footer;