import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "./PagesCommon.css";

function Notifications() {
  // ✅ STATE MANAGMENT: Empty state initialization for dynamic rendering
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH LAYER: Page load hote hi backend se current data layega
  useEffect(() => {
    fetch("http://localhost:5001/api/notifications/list")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching live notifications:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content-area" style={{ display: "flex" }}>
        <Sidebar />
        <div className="content-box" style={{ padding: "30px", flex: 1, backgroundColor: "#f8fafc" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", marginBottom: "5px" }}>
            All Notifications
          </h1>
          <p className="page-subtitle" style={{ color: "#64748b", marginBottom: "25px" }}>
            Stay updated with updates from your workspace team.
          </p>
          
          {loading ? (
            // Shimmer loading feedback or clean fallback text
            <p style={{ color: "#64748b", fontSize: "16px" }}>Loading live workspace context feeds...</p>
          ) : (
            <ul className="data-card-list" style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
              {notifications.map((item) => (
                <li 
                  key={item.id} 
                  className="data-list-item"
                  style={{
                    background: "#ffffff",
                    padding: "18px 20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                    borderLeft: "5px solid #3b82f6", // Sundar left border line
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "16px",
                    color: "#334155",
                    fontWeight: "500"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* Backend se dynamic separated icon string rendering */}
                    {item.icon && <span style={{ fontSize: "18px" }}>{item.icon}</span>}
                    <span>{item.text}</span>
                  </div>
                  <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "400" }}>{item.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;