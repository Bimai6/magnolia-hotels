import { useState } from "react";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      console.log("Register with", { email, password });
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
        </form>
      </div>
    );
}

export default Register;