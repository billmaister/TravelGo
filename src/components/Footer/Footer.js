import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import styles from './Footer.module.css';

function Footer() {
    return (
        <>
            <div className={styles.footerContainer}>
                <div className={styles.companyInfo}>
                    <Logo />
                    <p className={styles.caption}>Travel, enjoy and live a new life</p>
                </div>
                <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                        <span><FontAwesomeIcon icon={faLocationDot} /></span>
                        Aalto University
                    </div>
                    <div className={styles.contactItem}>
                        <span><FontAwesomeIcon icon={faEnvelope} /></span>
                        travelgo.website@gmail.com<br />
                    </div>
                </div>
                <div className={styles.about}>
                    <p className={styles.caption}>
                        <b>About TravelGo</b><br/>
                        TravelGo is a website for adventurers to explore and find their desired destinations!
                    </p>
                </div>
            </div>
            <div className={styles.copyright}>
            All rights reserved@travelgo
            </div>
        </>
    );
}

export default Footer;