import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>NotesApp</h2>
      <div className={styles.links}>
        {token ? (
          <>
            <Link id={styles.loginButton} to="/notes">My Notes</Link>
            <button id={styles.logout} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link id={styles.loginButton} to="/login">Login</Link>
            <Link id={styles.loginButton}  to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
