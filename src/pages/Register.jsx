import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; 

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields properly! ⚠️");
      return;
    }

    try {
      // ✅ FIXED: Login sync network endpoint matching
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const sessionToken = data.token;
        const sessionName = data.user && data.user.name ? data.user.name : (data.name || name);

        if (!sessionToken) {
          console.error("Token missing from registration payload!");
          alert("Registration structure sync issue. Redirecting to Login page.");
          navigate("/login");
          return;
        }

        // Insertion safe variables mapping
        localStorage.setItem("token", sessionToken);
        localStorage.setItem("userName", sessionName);

        alert("Account successfully created! 🎉 ✅");
        
        // Navigation cascade path activation
        navigate("/dashboard");
      } else {
        alert(data.msg || "Registration failed! ❌");
      }
    } catch (err) {
      console.error("Register error details:", err);
      alert("Cannot connect to backend server! ❌");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h2>Register</h2>
          <p>Please enter your details to create an account for free.</p>
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="form-group" style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#334155" }}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="login-input"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#334155" }}>Email Address</label>
            <input
              type="email"
              placeholder="e.g. test@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <div className="form-group-password" style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#334155" }}>Password</label>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <button type="submit" className="btn-primary submit-btn" style={{ width: "100%", padding: "12px", fontWeight: "600" }}>
            Register
          </button>
        </form>

        <div className="login-footer" style={{ marginTop: "20px" }}>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="signup-link">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;