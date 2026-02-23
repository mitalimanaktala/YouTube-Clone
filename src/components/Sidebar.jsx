import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles.link}>Home</Link>
      <Link to="/trending" className={styles.link}>Trending</Link>
      <Link to="/history" className={styles.link}>History</Link>
      <Link to="/upload" className={styles.link}>Upload</Link>
      <Link to="/profile" className={styles.link}>Profile</Link>
    </div>
  );
}

export default Sidebar;
