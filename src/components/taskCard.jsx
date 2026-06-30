function TaskCard({ title = "Complete Dashboard UI", status = "Pending" }) {
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
      <h3>{title}</h3>
      <p>
        Status:{" "}
        <span
          style={{
            fontWeight: "bold",
            color: status === "In Progress" ? "#3b82f6" : "#f59e0b",
          }}
        >
          {status}
        </span>
      </p>
    </div>
  );
}

export default TaskCard;