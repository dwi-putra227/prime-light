import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  const correctCode = "admin";
  const correctPassword = "admin@321";

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code === correctCode && password === correctPassword) {
      navigate("/dashboard");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
    console.log("lihat", !showPassword);
  };

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <form onSubmit={handleLogin}>
            <div>
              <h1>PrimeLight</h1>
            </div>
            <div>
              <label>
                <b>Code</b>
                <input
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </label>
              <label>
                <b>Password</b>
                <div className="password-input-wrapper">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </label>
              <button type="submit" className="submit-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
