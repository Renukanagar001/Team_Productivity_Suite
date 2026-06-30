function AttendanceCard({ percentage = 95 }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        width: "250px",
        margin: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    >
      <h3>Attendance</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981" }}>
        {percentage}% Present
      </p>
    </div>
  );
}

export default AttendanceCard;