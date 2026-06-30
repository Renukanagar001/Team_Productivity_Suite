import { useState } from "react";

function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    "Task assigned successfully",
    "Attendance updated",
    "New report generated",
    "Profile updated",
  ];

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        style={{
          background: "none",
          border: "none",
          fontSize: "22px",
          cursor: "pointer",
          color: "white",
        }}
      >
        🔔
      </button>

      <span
        style={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
          background: "#ef4444",
          color: "white",
          borderRadius: "50%",
          width: "18px",
          height: "18px",
          fontSize: "11px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {notifications.length}
      </span>

      {showNotifications && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: 0,
            width: "260px",
            background: "white",
            color: "black",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            zIndex: 100,
          }}
        >
          <h4 style={{ margin: "0 0 10px 0" }}>Notifications</h4>
          {notifications.map((item, index) => (
            <p
              key={index}
              style={{
                borderBottom: "1px solid #f1f5f9",
                padding: "8px 0",
                margin: 0,
                fontSize: "14px",
              }}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;