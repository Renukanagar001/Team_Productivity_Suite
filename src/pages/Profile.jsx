import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "./PagesCommon.css"; 

function Profile() {
  const navigate = useNavigate();
  
  // LocalStorage se instant backup data nikalenge taaki screen khali na dikhe
  const savedName = localStorage.getItem("userName") || "Renuka Nagar";

  const [user, setUser] = useState({
    name: savedName, // Pehle se saved name instant load hoga
    email: "Fetching from database...",
    role: "Team Member" 
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/api/auth/profile", {
          method: "GET",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        if (response.ok) {
          setUser({
            name: data.name || savedName,
            email: data.email,
            role: data.role || "Frontend Developer" 
          });
        } else {
          console.error("Backend returned error:", data.msg);
          // Fallback data agar backend error de
          setUser(prev => ({ ...prev, email: "Database Sync Error ❌" }));
        }
      } catch (err) {
        console.error("Network Fetch error:", err);
        // Network crash hone par instant display info
        setUser(prev => ({ ...prev, email: "Backend Offline ❌" }));
      }
    };

    fetchUserProfile();
  }, [navigate, savedName]);

  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content-area">
        <Sidebar />
        <div className="content-box">
          <h1>My Profile</h1>
          <p className="page-subtitle">Manage your personal details and account preferences.</p>
          
          <div className="profile-card">
            
            <div className="profile-field">
              <strong>Full Name:</strong> 
              <span style={{ marginLeft: "10px" }}>{user.name}</span>
            </div>
            
            <div className="profile-field">
              <strong>Email:</strong> 
              <span style={{ marginLeft: "10px" }}>{user.email}</span>
            </div>
            
            <div className="profile-field">
              <strong>Role:</strong> 
              <span style={{ marginLeft: "10px", color: "#3b82f6", fontWeight: "600" }}>{user.role}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;