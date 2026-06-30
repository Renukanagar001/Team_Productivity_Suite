function ProgressChart({ progress = 75 }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        width: "300px",
        margin: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    >
      <h3>Project Progress</h3>
      <progress value={progress} max="100" style={{ width: "100%", height: "10px" }}></progress>
      <p>{progress}% Completed</p>
    </div>
  );
}

export default ProgressChart;