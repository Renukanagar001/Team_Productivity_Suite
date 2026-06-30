import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "./PagesCommon.css";

function Attendance() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content-area">
        <Sidebar />
        <div className="content-box">
          <h1>Attendance Management</h1>
          <p className="page-subtitle">Track and manage your daily check-ins and logs.</p>
          
          <div className="profile-card">
            <p style={{ color: "#10b981", fontWeight: "600", fontSize: "18px" }}>✓ Today's Status: Present</p>
            <p style={{ marginTop: "10px", color: "#64748b" }}>Punch In Time: 09:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;