import MainHeader from '../MainHeader/MainHeader';
import styles from './Activity.module.css';

function Activity({ name }) {
    //get activity info from api
    return (
        <div className={styles.actContainer}>
            <MainHeader title={name} />
        </div>
    );
}

export default Activity;