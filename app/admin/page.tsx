"use client";

import { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage() {
  const [entered, setEntered] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("mysecret123"); // default
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // Forgot-password modal states (Option 2)
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetStep, setResetStep] = useState<"key" | "new">("key");
  const [resetKeyInput, setResetKeyInput] = useState("");
  const [resetNewPass, setResetNewPass] = useState("");
  const [resetConfirmPass, setResetConfirmPass] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("admin-auth") === "true") {
      setEntered(true);
    }
    const savedPass = localStorage.getItem("admin-password");
    if (savedPass) {
      setStoredPassword(savedPass);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === storedPassword) {
      setEntered(true);
      localStorage.setItem("admin-auth", "true");
    } else {
      alert("Incorrect password!");
    }
  }

  function handleLogout() {
    setEntered(false);
    localStorage.removeItem("admin-auth");
  }

  function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.trim().length < 4) {
      alert("Password should be at least 4 characters long!");
      return;
    }
    setStoredPassword(newPassword);
    localStorage.setItem("admin-password", newPassword);
    setNewPassword("");
    setShowChangePassword(false);
    alert("Password changed successfully!");
  }

  // ---- Forgot Password: Step 1 - verify key ----
  async function handleVerifyKey(e?: React.FormEvent) {
    e?.preventDefault();
    setResetMessage("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: resetKeyInput }),
      });

      if (res.ok) {
        setResetStep("new");
        setResetMessage("Key verified. Enter a new password.");
      } else {
        const json = await res.json().catch(() => ({}));
        setResetMessage(json?.error || "Invalid key");
      }
    } catch (err) {
      console.error("Network error verifying key:", err);
      setResetMessage("Network error. Try again.");
    }
  }

  // ---- Forgot Password: Step 2 - set new password ----
  function handleSetNewPassword(e: React.FormEvent) {
    e.preventDefault();
    setResetMessage("");
    if (resetNewPass.trim().length < 4) {
      setResetMessage("Password must be at least 4 characters.");
      return;
    }
    if (resetNewPass !== resetConfirmPass) {
      setResetMessage("Passwords do not match.");
      return;
    }

    // Save locally (same as existing flow)
    setStoredPassword(resetNewPass);
    localStorage.setItem("admin-password", resetNewPass);
    setResetNewPass("");
    setResetConfirmPass("");
    setResetKeyInput("");
    setShowForgotModal(false);
    setResetStep("key");
    setResetMessage("");
    alert("Password reset successfully. Please login with your new password.");
  }

  // ---- UI ----
  if (!entered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4 w-80"
        >
          <h2 className="text-lg font-semibold text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white"
          >
            Enter
          </button>
        </form>

        <div className="mt-4 flex gap-4">
          <button
            onClick={() => {
              setShowForgotModal(true);
              setResetStep("key");
              setResetMessage("");
              setResetKeyInput("");
            }}
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Forgot-password modal */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-3">
                Reset Admin Password
              </h3>

              {resetStep === "key" ? (
                <form onSubmit={handleVerifyKey} className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Enter the server reset key to continue.
                  </p>
                  <input
                    value={resetKeyInput}
                    onChange={(e) => setResetKeyInput(e.target.value)}
                    placeholder="Enter reset key"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  {resetMessage && (
                    <p className="text-sm text-red-600">{resetMessage}</p>
                  )}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="px-4 py-2 rounded-lg bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                    >
                      Verify Key
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSetNewPassword} className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Enter and confirm a new password.
                  </p>
                  <input
                    type="password"
                    value={resetNewPass}
                    onChange={(e) => setResetNewPass(e.target.value)}
                    placeholder="New password"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <input
                    type="password"
                    value={resetConfirmPass}
                    onChange={(e) => setResetConfirmPass(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  {resetMessage && (
                    <p className="text-sm text-red-600">{resetMessage}</p>
                  )}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotModal(false);
                        setResetStep("key");
                      }}
                      className="px-4 py-2 rounded-lg bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-green-600 text-white"
                    >
                      Save New Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Logged in view
  return (
    <div>
      <div className="p-4 flex justify-between bg-gray-100">
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-500 text-white"
        >
          Logout
        </button>
        <button
          onClick={() => setShowChangePassword(!showChangePassword)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          {showChangePassword ? "Cancel" : "Change Password"}
        </button>
      </div>

      {showChangePassword && (
        <form
          onSubmit={handlePasswordChange}
          className="bg-white p-4 border rounded-xl shadow-md max-w-md mx-auto mt-6 space-y-3"
        >
          <h3 className="font-semibold text-lg">Change Password</h3>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            Save New Password
          </button>
        </form>
      )}

      <AdminDashboard />
    </div>
  );
}
