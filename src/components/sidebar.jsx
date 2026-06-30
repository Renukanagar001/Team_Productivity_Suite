import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "📊 Dashboard" },
    { path: "/attendance", label: "📅 Attendance" },
    { path: "/tasks", label: "✅ Tasks" },
    { path: "/reports", label: "📈 Reports" },
    { path: "/notifications", label: "🔔 Notifications" },
    { path: "/profile", label: "👤 Profile" },
    { path: "/settings", label: "⚙️ Settings" },
    { path: "/users", label: "👥 Users" },
  ];

  return (
    <div style={{
      width: "260px",
      backgroundColor: "#0f172a",
      minHeight: "calc(100vh - 70px)",
      padding: "20px 10px",
      display: "flex",
      flexDirection: "column",
      gap: "5px"
    }}>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "block",
              padding: "12px 20px",
              color: isActive ? "#ffffff" : "#94a3b8",
              backgroundColor: isActive ? "#1e293b" : "transparent",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: isActive ? "600" : "400",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              borderLeft: isActive ? "4px solid #3b82f6" : "4px solid transparent"
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export default Sidebar;