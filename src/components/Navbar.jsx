import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Load history on mount AND when route changes
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(saved);
  }, [location]);

  // Sync search box with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    setQuery(q || "");
  }, [location.search]);

  // Handle search
  const handleSearch = (value) => {
    if (!value.trim()) return;

    let updated = [
      value,
      ...history.filter((item) => item !== value),
    ].slice(0, 5);

    localStorage.setItem("searchHistory", JSON.stringify(updated));
    setHistory(updated);

    setQuery(value);
    setShowDropdown(false);
    navigate(`/search?q=${value}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  // Filter history while typing
  const filteredHistory = history.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    ;

  return (
    <div className={styles.navbar}>
      {/* Left Logo */}
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          YouTube-Clone
        </Link>
      </div>

      {/* Center Search */}
      <div className={styles.middle}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />

          {/* Dropdown */}
          {showDropdown && filteredHistory.length > 0 && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownTitle}>
                Recent searches
              </div>

              {filteredHistory.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className={styles.dropdownItem}
                  onMouseDown={() => handleSearch(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div className={styles.right}>
        <Link to="/upload" className={styles.action}>
          Upload
        </Link>
        <Link to="/profile" className={styles.action}>
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
