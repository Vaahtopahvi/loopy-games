import { useState } from "react";
import { Button } from "./ui/button";

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Send login request to backend
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check if login was successful
      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Save token to localStorage for future requests
      localStorage.setItem("adminToken", data.token);

      // Clear form
      setEmail("");
      setPassword("");

      // Notify parent component of successful login
      onLoginSuccess(data.token);
    } catch (err) {
      setError("An error occurred during login");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900 border border-gray-700 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Admin Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            placeholder="admin@example.com"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="text-gray-400 text-sm mt-4 text-center">
        Sorry lil bro, but from here on out it's admin only stuff.
      </p>
    </div>
  );
}
