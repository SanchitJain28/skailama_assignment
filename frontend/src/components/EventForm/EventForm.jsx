import { useState } from "react";
import { TIMEZONES, convertLocalToUTC } from "../../utils/timeUtils";
import styles from "./EventForm.module.css";
import { useAppStore } from "../../store/useAppStore";

const EventForm = () => {
  const { profiles, createEvent } = useAppStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const handleCheckboxChange = (profileId) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProfiles.length === 0)
      return alert("Select at least one profile!");
    if (new Date(endDate) <= new Date(startDate))
      return alert("End time must be after start time!");
    const utcStartTime = convertLocalToUTC(startDate, timezone);
    const utcEndTime = convertLocalToUTC(endDate, timezone);

    const payload = {
      title,
      description,
      startDate: utcStartTime,
      endDate: utcEndTime,
      timezone,
      profiles: selectedProfiles,
    };

    await createEvent(payload);

    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setSelectedProfiles([]);
    alert("Event Created!");
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Event Title</label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Description</label>
          <input
            className={styles.input}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Assign To Profiles</label>
          <div className={styles.checkboxList}>
            {profiles.map((p) => (
              <label key={p._id} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={selectedProfiles.includes(p._id)}
                  onChange={() => handleCheckboxChange(p._id)}
                />
                {p.name}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Event Timezone</label>
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

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Start Time</label>
            <input
              className={styles.input}
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>End Time</label>
            <input
              className={styles.input}
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
