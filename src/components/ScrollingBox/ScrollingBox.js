import MainHeader from '../MainHeader/MainHeader';
import styles from './ScrollingBox.module.css';
import pic from '../../images/liam-burnett-blue-xBnqIf2vy7M-unsplash.jpg';

function ScrollingBox({ title, caption, elements, onClick }) {
    const handleClick = (name) => () => {
        onClick(name);
    };
    return (
        <div className={styles.scrollContainer}>
            <MainHeader title={title} />
            <p className={styles.caption}>{caption}</p>
            <ul className={styles.elementsContainer}>
                {elements.map((e, index) =>
                    <li className={styles.element} key={index} onClick={handleClick(e.name)}>
                        <img src={pic} alt={e.name} />
                        <p className={styles.elementName}>{e.name}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ScrollingBox;