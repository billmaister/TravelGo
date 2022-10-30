import styles from "./Button.module.css";

function Button({ name, onClick, className }) {
    return (
        <button className={`${styles.btn} ${className}`} onClick={onClick}> {name} </button>
    );
}

export default Button;