import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
function ForgotPassword() {
  return (
    <div>
      <h1>Forgot Password</h1>

      <input type="email" placeholder="Enter Email" />
      <br /><br />

      <button>Reset Password</button>

      <p>
        <Link to="/">Back to Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;