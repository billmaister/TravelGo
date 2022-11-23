import { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './ErrorBoundry.module.css';

function ErrorBoundry({ message, isModal }) {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };
    return (
        <>
            {isModal ?
                <Modal className={styles.errContainer} onClose={toggleModal} open={isModalOpen}>
                    <div>{ message }</div>
                </Modal> :
            <div className={styles.errContainer}>{ message }</div>}
        </>
    );
}

export default ErrorBoundry;