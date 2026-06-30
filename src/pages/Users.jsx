import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "./PagesCommon.css";

function Users() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content-area">
        <Sidebar />
        <div className="content-box">
          <h1>Team Directory</h1>
          <p className="page-subtitle">List of active team members registered in this suite.</p>
          
          <ul className="data-card-list">
            <li className="data-list-item">👤 <strong>Saloni </strong> (Frontend Developer)</li>
            <li className="data-list-item">👤 <strong>Renuka </strong> (Backend Developer)</li>
            <li className="data-list-item">👤 <strong>Shalini</strong> (Database Administrator)</li>
             <li className="data-list-item">👤 <strong>keya</strong> (API Developer)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Users;