import { useState } from "react";
import { useAppStore } from "../../hooks/useAppStore";
import { TIMEZONES } from "../../utils/timeUtils";
import styles from "./ProfileForm.module.css";

const ProfileForm = () => {
  const { createProfile } = useAppStore();
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    await createProfile(name, timezone);
    setName(""); 
    alert("Profile Created!");
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Create New Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Name</label>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Default Timezone</label>
          <select
            className={styles.select}
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
