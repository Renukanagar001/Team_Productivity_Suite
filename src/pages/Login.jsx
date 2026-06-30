import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; 

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      // ✅ FIXED: Standardized localhost networking url match
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        // Local storage mechanism updates
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name); 

        // Redirect straight to dashboard
        navigate("/dashboard");
      } else {
        alert(data.msg || "Invalid Email or Password! ❌");
        setError(data.msg);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Cannot connect to backend server! ❌");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        
        <div className="login-header">
          <h2>Sign In</h2>
          <p>Please enter your details to log in to your account.</p>
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="e.g. abcd123@gmail.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              className="login-input"
            />
          </div>

          <div className="form-group-password">
            <div className="password-label-row">
              <label>Password</label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot?
              </Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              className="login-input"
            />
          </div>

          <div className="remember-me-group">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me on this device</label>
          </div>

          <button type="submit" className="btn-primary submit-btn">
            Log In
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="signup-link">
              Sign up free
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;