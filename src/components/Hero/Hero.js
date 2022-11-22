import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import MainHeader from '../MainHeader/MainHeader';
import styles from './Hero.module.css';

function Hero() {
    const navigate = useNavigate();
    const goToDestinations = () => {
        navigate('/destinations');
    };
    return (
        <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
                <MainHeader title='Travel, Enjoy, and Live a New Life' className={styles.heroTxt} />
                <Button name='Find Destinations' className={styles.findBtn} onClick={goToDestinations} />
            </div>
        </div>
    );
}

export default Hero;