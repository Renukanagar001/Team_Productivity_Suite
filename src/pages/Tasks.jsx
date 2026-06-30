import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "./PagesCommon.css";

function Tasks() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content-area">
        <Sidebar />
        <div className="content-box">
          <h1>My Tasks</h1>
          <p className="page-subtitle">View and update tasks currently assigned to you.</p>
          
          <ul className="data-card-list">
            <li className="data-list-item">🔵 <strong>Task 1:</strong> Create Login & Register Layout</li>
            <li className="data-list-item">🔵 <strong>Task 2:</strong> Fix Routing and State Bugs</li>
            <li className="data-list-item">🔵 <strong>Task 3:</strong> Apply Clean CSS Themes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tasks;