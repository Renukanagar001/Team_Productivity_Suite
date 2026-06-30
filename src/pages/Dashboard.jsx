import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AttendanceCard from "../components/attendanceCard";
import TaskCard from "../components/taskCard";
import ProgressChart from "../components/progressChart";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check karein ki user authenticated hai ya nahi
    const token = localStorage.getItem("token");
    
    if (!token) {
      console.log("No token found, redirecting to login...");
      navigate("/login");
    } else {
      setLoading(false); // Token mil gaya, toh loading rok do
    }
  }, [navigate]);

  // 2. Agar token check ho raha hai, toh blank screen ke bajaye Loading text dikhao
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8fafc" }}>
        <h2>Verifying Session, Please wait... ⏳</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "30px", flex: 1, backgroundColor: "#f8fafc" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", marginBottom: "25px" }}>
            Welcome back!👋
          </h1>
          
          {/* Cards Grid */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
            
            {/* Attendance Card Styled Box */}
            <div style={{ background: "#ffffff", borderRadius: "16px", padding: "6px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <AttendanceCard percentage={92} />
            </div>

            {/* Task Card Styled Box */}
            <div style={{ background: "#ffffff", borderRadius: "16px", padding: "6px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <TaskCard title="Build Dashboard UI" status="In Progress" />
            </div>

            {/* Chart Styled Box */}
            <div style={{ background: "#ffffff", borderRadius: "16px", padding: "6px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <ProgressChart progress={80} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;