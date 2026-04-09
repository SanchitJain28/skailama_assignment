import { useState, useEffect } from "react";
import {
  convertLocalToUTC,
  formatForInput,
  formatToUserTimezone,
} from "../../utils/timeUtils";
import styles from "./EventList.module.css";
import { useAppStore } from "../../store/useAppStore";

const EventList = () => {
  
  const {
    events,
    fetchEvents,
    activeProfile,
    updateEvent,
    fetchEventLogs,
    eventLogs,
    isFetchingLogs,
  } = useAppStore();
  const [editingId, setEditingId] = useState(null);
  const [viewingLogsFor, setViewingLogsFor] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (!activeProfile) {
    return (
      <div className={styles.warning}>
        <p>
          Please select a profile from the Navbar dropdown to view your events.
        </p>
      </div>
    );
  }

  const myEvents = events.filter((event) =>
    event.profiles.some((p) => p._id === activeProfile._id),
  );

  const startEdit = (event) => {
    setEditingId(event._id);
    setViewingLogsFor(null);
    setEditForm({
      title: event.title,
      description: event.description || "",
      startDate: formatForInput(event.startDate, activeProfile.timezone),
      endDate: formatForInput(event.endDate, activeProfile.timezone),
    });
  };

  const handleUpdate = async (eventId) => {
    const utcStartTime = convertLocalToUTC(
      editForm.startDate,
      activeProfile.timezone,
    );
    const utcEndTime = convertLocalToUTC(
      editForm.endDate,
      activeProfile.timezone,
    );

    await updateEvent(eventId, {
      title: editForm.title,
      description: editForm.description,
      startDate: utcStartTime,
      endDate: utcEndTime,
      updatedBy: activeProfile._id,
    });
    setEditingId(null);
  };

  const toggleLogs = async (eventId) => {
    if (viewingLogsFor === eventId) {
      setViewingLogsFor(null);
    } else {

      await fetchEventLogs(eventId);
      setViewingLogsFor(eventId);
      setEditingId(null);
    }
  };

  if (myEvents.length === 0) {
    return (
      <div className={styles.warning}>
        No events scheduled for {activeProfile.name}.
      </div>
    );
  }

  const checkForUpdates = (previousData, newData) => {
    const changedFields = [];
    for (let key in previousData) {
      if (key === "_id" || key === "__v") continue;
      if (JSON.stringify(previousData[key]) !== JSON.stringify(newData[key])) {
        changedFields.push(key);
      }
    }
    return changedFields;
  };

  return (
    <div className={styles.feed}>
      <h2>Your Upcoming Events</h2>

      {myEvents.map((event) => (
        <div key={event._id} className={styles.card}>
          {editingId === event._id ? (
            <div
              style={{
                background: "#f9f9f9",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            >
              <input
                type="text"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                style={{
                  width: "100%",
                  marginBottom: "0.5rem",
                  padding: "0.5rem",
                }}
                placeholder="Title"
              />
              <input
                type="text"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                style={{
                  width: "100%",
                  marginBottom: "0.5rem",
                  padding: "0.5rem",
                }}
                placeholder="Description"
              />
              <div
                style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
              >
                <input
                  type="datetime-local"
                  value={editForm.startDate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, startDate: e.target.value })
                  }
                  style={{ padding: "0.5rem" }}
                />
                <input
                  type="datetime-local"
                  value={editForm.endDate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, endDate: e.target.value })
                  }
                  style={{ padding: "0.5rem" }}
                />
              </div>
              <button
                onClick={() => handleUpdate(event._id)}
                style={{
                  background: "#007bff",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingId(null)}
                style={{
                  background: "#ccc",
                  color: "#000",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <h3 className={styles.title} style={{ margin: 0 }}>
                {event.title}
              </h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => toggleLogs(event._id)}
                  style={{
                    background: "#e0e0e0",
                    border: "none",
                    padding: "0.4rem 0.6rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                 {isFetchingLogs ? "Loading..." : "Logs"}
                </button>
                <button
                  onClick={() => startEdit(event)}
                  style={{
                    background: "transparent",
                    border: "1px solid #ccc",
                    padding: "0.4rem 0.6rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          )}

          {event.description && (
            <p className={styles.desc}>{event.description}</p>
          )}

          <div className={styles.timeBlock}>
            <div className={styles.timeRow}>
              <strong>Start:</strong>
              <span>
                {formatToUserTimezone(event.startDate, activeProfile.timezone)}
              </span>
            </div>
            <div className={styles.timeRow}>
              <strong>End:</strong>
              <span>
                {formatToUserTimezone(event.endDate, activeProfile.timezone)}
              </span>
            </div>
          </div>

          <div>
            <span style={{ fontSize: "0.85rem", color: "#666" }}>
              Attendees:{" "}
            </span>
            <div className={styles.profilesList}>
              {event.profiles.map((p) => (
                <span key={p._id} className={styles.badge}>
                  {p.name}
                </span>
              ))}
            </div>
          </div>

          {viewingLogsFor === event._id && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                color: "#fff",
                borderRadius: "0px",
                fontSize: "0.85rem",
                border: "1px solid black",
              }}
            >
              <h4 style={{ marginBottom: "0.5rem", color: "#000000" }}>
                Audit Trail (Event Logs)
              </h4>
              {eventLogs.length === 0 ? (
                <p style={{ color: "#aaa" }}>
                  No updates have been made to this event yet.
                </p>
              ) : (
                eventLogs.map((log) => {
                  const changedFields = checkForUpdates(
                    log.previousData,
                    log.newData,
                  );
                  return (
                    <div
                      key={log._id}
                      style={{
                        borderBottom: "1px solid #444",
                        paddingBottom: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <p style={{ margin: "0 0 0.25rem 0", color: "#000000" }}>
                        <strong>Updated by:</strong> {log.updatedBy?.name}{" "}
                        <span style={{ color: "#888" }}>
                          (
                          {formatToUserTimezone(
                            log.createdAt,
                            activeProfile.timezone,
                          )}
                          )
                        </span>
                      </p>
                      {changedFields.length > 0 ? (
                        changedFields.map((key) => (
                          <div
                            key={key}
                            style={{
                              padding: "0.5rem",
                              borderRadius: "4px",
                              display: "flex",
                              gap: "1rem",
                              marginBottom: "0.5rem",
                              background: "#f4f4f4", 
                            }}
                          >
                            <div style={{ flex: 1, color: "#131111" }}>
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                  textTransform: "uppercase",
                                  fontWeight: "bold",
                                }}
                              >
                                Previous {key}:
                              </span>
                              <br />
                              {key.toLowerCase().includes("date")
                                ? formatToUserTimezone(
                                    log.previousData[key],
                                    activeProfile.timezone,
                                  )
                                : String(log.previousData[key])}
                            </div>

                            <div style={{ flex: 1, color: "#000000" }}>
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                  textTransform: "uppercase",
                                  fontWeight: "bold",
                                }}
                              >
                                New {key}:
                              </span>
                              <br />
                              {key.toLowerCase().includes("date")
                                ? formatToUserTimezone(
                                    log.newData[key],
                                    activeProfile.timezone,
                                  )
                                : String(log.newData[key])}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: "#aaa", fontStyle: "italic" }}>
                          No data was changed in this save.
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;
