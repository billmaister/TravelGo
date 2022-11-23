import { faClock, faLocationDot, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';
import styles from './Activity.module.css';

function Activity({ id }) {
    const [err, setErr] = useState({ status: false, message: '' });
    const [activity, setActivity] = useState({});
    const getActivityDetails = async () => {
        try {
            await fetch(`/api/events/event/${id}`)
                .then((res) => res.json())
                .then((dataObj) => {
                    if(dataObj.msg){
                        throw Error(dataObj.msg);
                    } else {
                        setActivity(dataObj.data);
                    }
                });
        } catch(err) {
            setErr({ status: true, message: err.message });
        }
    };
    const parseDate = (d) => {
        let parsedDate = new Date(Date.parse(d));
        return (
            `${parsedDate.getFullYear()}/
            ${parsedDate.getMonth() + 1}/
            ${parsedDate.getDate()}
            ${parsedDate.getHours()}:${parsedDate.getMinutes().toString().padStart(2, '0')}`
        );
    };
    useEffect(() => {
        getActivityDetails();
    }, []);
    return (
        <>
            {err.status ? <ErrorBoundry message={err.message} isModal={false} /> :
            <div className={styles.actContainer}>
                <div className={styles.actDescription}>
                    <h1>{activity.name}</h1>
                    <div className={styles.overview}>
                        <h2>Overview</h2>
                        <p>{activity.description}</p>
                    </div>
                    <div className={styles.info}>
                        <p>
                            <span><FontAwesomeIcon icon={faLocationDot} /></span>
                            {activity.location}
                        </p>
                        <p>
                            <span><FontAwesomeIcon icon={faClock} /></span>
                            {`${parseDate(activity.startDate)} - ${parseDate(activity.endDate)}`}
                        </p>
                        <p>
                            <span><FontAwesomeIcon icon={faTag} /></span>
                            {activity.price}
                        </p>
                    </div>
                </div>
                <div className={styles.actImg}>
                    <img src={activity.urlImage} alt={activity.name} />
                </div>
            </div>}
        </>
    );
}

export default Activity;