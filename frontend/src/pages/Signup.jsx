import { Form, redirect, useActionData, Link } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
  const formMessage = useActionData();

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create Account</h1>
      {formMessage?.error && <div className="error-message">{formMessage.error}</div>}

      <Form method="POST" className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Enter your name" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </Form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export async function action({ request }) {
  const signupData = await request.formData();
  const data = Object.fromEntries(signupData);

  const res = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const response = await res.json();

  if (!res.ok) {
    return { error: response.error || "signup failed" };
  } else {
    return redirect("/login");
  }
}

export default Signup;
