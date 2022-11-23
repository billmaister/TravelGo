import MainHeader from '../MainHeader/MainHeader';
import styles from './ScrollingBox.module.css';

function ScrollingBox({ title, caption, elements, onClick }) {
    const handleClick = (name, id) => () => {
        onClick(name, id);
    };
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
        <div className={styles.scrollContainer}>
            <MainHeader title={title} />
            <p className={styles.caption}>{caption}</p>
            <ul className={styles.elementsContainer}>
                {elements.map((e, index) =>
                    <li className={styles.element} key={index} onClick={handleClick(e.name, e._id)}>
                        <img src={e.urlImage} alt={e.name} />
                        <p className={styles.elementName}>{capitalizeFirstLetter(e.name)}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ScrollingBox;