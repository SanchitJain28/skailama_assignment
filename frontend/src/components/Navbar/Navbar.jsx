import { useEffect } from "react";
import styles from "./Navbar.module.css";
import { useAppStore } from "../../hooks/useAppStore";

const Navbar = () => {
  const { profiles, fetchProfiles, activeProfile, setActiveProfile } =
    useAppStore();

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleProfileChange = (e) => {
    const selectedId = e.target.value;
    const profile = profiles.find((p) => p._id === selectedId);
    setActiveProfile(profile);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>📅 Skai Events</div>

      <div className={styles.profileSelector}>
        <label htmlFor="profile-select">Viewing as:</label>
        <select
          id="profile-select"
          className={styles.select}
          onChange={handleProfileChange}
          value={activeProfile?._id || ""}
        >
          <option value="" disabled>
            Select a profile...
          </option>
          {profiles.map((profile) => (
            <option key={profile._id} value={profile._id}>
              {profile.name}
            </option>
          ))}
        </select>

        {/* Display the active timezone like a pro */}
        {activeProfile && (
          <span className={styles.timezoneDisplay}>
            🌍 {activeProfile.timezone}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
