export const handleLogout = async (navigate, setUser) => {
  const res = await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (res.ok) {
    setUser(null);
    navigate("/", { state: { message: "Du har loggats ut" } });
  }
};
