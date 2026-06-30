import NotificationBell from "./notificationBell";

function Navbar() {
  // 1. LocalStorage se logged-in user ka naam nikala, agar nahi mila toh fallback text diya
  const currentUserName = localStorage.getItem("userName") || "User Account";

  return (
    <header
      style={{
        height: "70px",
        backgroundColor: "#1e293b",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>Team Productivity Suite</h2>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
            width: "200px",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <NotificationBell />
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=cute"
            alt="Profile"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          
          {/* ❌ Purana static code: <span>UserName</span> */}
          {/* ✅ Naya Dynamic Variable jo user ka naam dikhayega */}
          <span>{currentUserName}</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;