import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "./PagesCommon.css";

function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/api/settings/fetch")
      .then((res) => res.json())
      .then((data) => {
        setEmailNotifications(data.emailNotifications);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error reading setup variables:", err);
        setLoading(false);
      });
  }, []);

  // ✅ FIXED LOGIC: Isme state variables alert ke pehle hi handle ho jayenge
  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      const response = await fetch("http://localhost:5001/api/settings/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailNotifications }),
      });
      const data = await response.json();
      
      if (data.success) {
        // ✅ STEP 1: Pehle loading state ko false karein taaki button wapas "Save Changes" ban jaye
        setSaving(false); 
        
        // ✅ STEP 2: Ab database se naya updated checkbox data state me forcefully load karein
        setEmailNotifications(emailNotifications);
        
        // ✅ STEP 3: Sab set hone ke baad aakhiri me alert popup dikhayein
        setTimeout(() => {
          alert(data.message || "Changes updated successfully! 🎉");
        }, 100);
      } else {
        alert("Failed to update preferences. ❌");
        setSaving(false);
      }
    } catch (err) {
      console.error("Error saving configurations:", err);
      alert("Network connection error! ❌");
      setSaving(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content-area" style={{ display: "flex" }}>
        <Sidebar />
        <div className="content-box" style={{ padding: "30px", flex: 1, backgroundColor: "#f8fafc" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", marginBottom: "5px" }}>
            Account Settings
          </h1>
          <p className="page-subtitle" style={{ color: "#64748b", marginBottom: "25px" }}>
            Configure security settings and system configurations.
          </p>
          
          <div className="profile-card" style={{ background: "#ffffff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", border: "1px solid #e2e8f0", maxWidth: "600px" }}>
            {loading ? (
              <p style={{ color: "#94a3b8", fontSize: "15px" }}>Loading application profiles...</p>
            ) : (
              <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
                <input 
                  type="checkbox" 
                  id="emailNotif" 
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  style={{ width: "18px", height: "18px", marginRight: "12px", cursor: "pointer" }} 
                />
                <label htmlFor="emailNotif" style={{ fontSize: "16px", color: "#334155", fontWeight: "500", cursor: "pointer" }}>
                  Enable Email Notifications
                </label>
              </div>
            )}

            <button 
              className="btn-primary" 
              onClick={handleSaveChanges}
              disabled={loading || saving}
              style={{
                background: "#64748b",
                color: "#ffffff",
                border: "none",
                padding: "10px 24px",
                borderRadius: "6px",
                cursor: (loading || saving) ? "not-allowed" : "pointer",
                fontWeight: "600",
                fontSize: "14px",
                opacity: (loading || saving) ? 0.7 : 1
              }}
            >
              {saving ? "Saving Data..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;