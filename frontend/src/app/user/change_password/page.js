"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/components/user/DashboardSidebar";

export default function Page() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uidb64, setUidb64] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/");
    const uid = segments[segments.length - 2];
    const tok = segments[segments.length - 1];

    setUidb64(uid);
    setToken(tok);

    // Validate token
    fetch(`http://localhost:8000/website/password-reset-confirm/${uid}/${tok}/`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setError("Invalid or expired reset link.");
        }
      })
      .catch(() => {
        setError("Failed to verify the token.");
      });
  }, []);

  const handleSubmit = async () => {
    setError("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/website/set-new-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
          confirm_password: confirmPassword,
          uidb64,
          token,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Password reset successful!");
        setError("");
        setNewPassword("");
        setConfirmPassword("");
        // Optionally redirect after a delay
        // setTimeout(() => router.push("/login"), 2000);
      } else {
        if (data.message) {
          setError(data.message);
        } else if (typeof data === "object") {
          const firstError = Object.values(data)[0];
          setError(Array.isArray(firstError) ? firstError[0] : firstError || "Something went wrong");
        } else {
          setError("Something went wrong.");
        }
      }
    } catch (err) {
      setError("Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container my-5">
      <div className="row">
        <div className="col-md-4 col-12">
          <DashboardSidebar />
        </div>
        <div className="col-md-8 col-12">
          <div className="card">
            <h5 className="card-header">Reset Password</h5>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <div className="row">
                <div className="col-md-5 col-12 mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-5 col-12 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <button className="btn hms-color-dark" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
