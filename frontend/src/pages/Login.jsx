import { useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";

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
    <div>
      {formMessage?.error && <div>{formMessage.error}</div>}

      <Form method="POST">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <input type="submit" />
      </Form>
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
