export const handleLogout = async () => {
  const res = await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);
};
