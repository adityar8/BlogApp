import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(ev) {
    ev.preventDefault();
    const logindetails = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("Login details", logindetails);
    if (logindetails === "success") {
      alert("User Logged in successfully");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <>
      <form action="" className="login" onSubmit={login}>
        <h1>Login Page</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="register"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </>
  );
}
