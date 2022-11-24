import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logoutUser } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className={styles.navContainer}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.nav}>
        {user && (
          <>
            <Link to="/" className={styles.navItem}>
              Home
            </Link>
            <Link to="/" className={styles.navItem}>
              My Favorites
            </Link>
            <Link to="/" onClick={logoutUser} className={styles.navItem}>
              Logout
            </Link>
          </>
        )}
        {!user && (
          <>
            {/* <Link to="/login" className={styles.navItem}>
              Login
            </Link> */}
            <Button
              name="Login / Sign Up"
              onClick={() => navigate("/login")}
              className={styles.navItem}
            />
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
