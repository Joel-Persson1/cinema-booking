import { Form, redirect, useActionData } from "react-router-dom";

function Signup() {
  const formMessage = useActionData();

  return (
    <div>
      {formMessage?.error && <div>{formMessage.error}</div>}

      <Form method="POST">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Name" required />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
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
