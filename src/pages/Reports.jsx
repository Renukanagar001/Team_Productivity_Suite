import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "./PagesCommon.css";

function Reports() {
  // ✅ STATE MANAGEMENT: Backend se dynamic metrics store karne ke liye
  const [reportData, setReportData] = useState({
    productivityIncrease: "0%",
    summaryText: "Loading analytics dataset..."
  });
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH LAYER: Component load hote hi backend API trigger karega
  useEffect(() => {
    fetch("http://localhost:5001/api/reports/summary")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch reports backend context");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setReportData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error reading performance summary:", err);
        setLoading(false);
      });
  }, []);

  // 📥 ACTION HANDLER: PDF download button alert mechanism
  const handleDownloadPDF = () => {
    alert("Generating and compiling your dynamic Monthly Analytics PDF Report... 📥");
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content-area" style={{ display: "flex" }}>
        <Sidebar />
        <div className="content-box" style={{ padding: "30px", flex: 1, backgroundColor: "#f8fafc" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", marginBottom: "5px" }}>
            Performance Reports
          </h1>
          <p className="page-subtitle" style={{ color: "#64748b", marginBottom: "25px" }}>
            Analyze team efficiency and overall monthly progress metrics.
          </p>
          
          <div 
            className="profile-card"
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
              border: "1px solid #e2e8f0",
              maxWidth: "600px"
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1e293b", marginBottom: "15px" }}>
              Monthly Analytics Summary
            </h3>
            
            {loading ? (
              <p style={{ margin: "15px 0", color: "#94a3b8" }}>Syncing metric calculations...</p>
            ) : (
              <p style={{ margin: "15px 0", color: "#334155", lineHeight: "1.6", fontSize: "15px" }}>
                Everything looks stable this month. Productivity has increased by{" "}
                <strong style={{ color: "#10b981", fontWeight: "600" }}>
                  {reportData.productivityIncrease}
                </strong>.
              </p>
            )}

            <button 
              className="btn-primary" 
              onClick={handleDownloadPDF}
              disabled={loading}
              style={{
                background: "#64748b",
                color: "#ffffff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "600",
                marginTop: "10px"
              }}
            >
              Download PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;