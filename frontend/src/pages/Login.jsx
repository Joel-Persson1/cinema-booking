import { useEffect } from "react";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const formMessage = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (formMessage?.success) {
      navigate("/", {
        state: { message: "Welcome back!" },
      });
    }
  }, [formMessage, navigate]);

  return (
    <div className="login-container">
      {formMessage?.error && <div className="error-message">{formMessage.error}</div>}

      <h1 className="login-title">Login</h1>
      <Form method="POST" className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </Form>

      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export async function action({ request }) {
  const loginData = await request.formData();
  const data = Object.fromEntries(loginData);

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const userData = await res.json();

  if (!res.ok) {
    return { error: userData.error || "An unexpected error happend" };
  } else {
    return { success: userData.message || "Logged in successfully" };
  }
}

export default Login;
