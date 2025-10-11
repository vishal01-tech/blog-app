import { useState } from 'react'
import "../assets/styles/ForgotPassword.css";
import Navbar from './NavBar';

const API_URL = "http://localhost:8000";

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [step, setStep] = useState(1) // 1: email, 2: otp, 3: new password
    const [errors, setErrors] = useState({ email: "", otp: "", newPassword: "" })
    const [message, setMessage] = useState("")

    const validateField = (value, field) => {
        switch (field) {
            case "email":
                if (!value.trim()) return "Email is required";
                if (!/^[a-zA-Z0-9._-]+@[a-zA-Z,-]+\.[a-zA-z]{2,}$/.test(value)) {
                    return "Invalid email format"
                }
                break;
            case "otp":
                if (!value.trim()) return "OTP is required";
                if (value.length !== 6) return "OTP must be 6 digits";
                break;
            case "newPassword":
                if (!value.trim()) return "New password is required";
                if (value.length < 6) return "Password must be at least 6 characters";
                break;
        }
    }

    const handleChange = (e, field) => {
        const value = e.target.value;
        if (field === "email") setEmail(value);
        if (field === "otp") setOtp(value);
        if (field === "newPassword") setNewPassword(value);

        setErrors((prev)=>({...prev,[field]: ""}))
        setMessage("")
    }

    const handleBlur = (e, field) => {
        const value = e.target.value;
        const error = validateField(value, field);
        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const emailError = validateField(email, "email");
        if (emailError) {
            setErrors({ email: emailError });
            return;
        }
        try {
            const response = await fetch(`${API_URL}/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("OTP sent to your email");
                setStep(2);
            } else {
                setErrors({ email: data.detail || "Failed to send OTP" });
            }
        } catch (error) {
            setErrors({ email: "Network error" });
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const otpError = validateField(otp, "otp");
        if (otpError) {
            setErrors({ otp: otpError });
            return;
        }
        try {
            const response = await fetch(`${API_URL}/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("OTP verified");
                setStep(3);
            } else {
                setErrors({ otp: data.detail || "Invalid OTP" });
            }
        } catch (error) {
            setErrors({ otp: "Network error" });
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const passwordError = validateField(newPassword, "newPassword");
        if (passwordError) {
            setErrors({ newPassword: passwordError });
            return;
        }
        try {
            const response = await fetch(`${API_URL}/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, new_password: newPassword })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Password reset successful");
                // Reset form or redirect
                setStep(1);
                setEmail("");
                setOtp("");
                setNewPassword("");
            } else {
                setErrors({ newPassword: data.detail || "Failed to reset password" });
            }
        } catch (error) {
            setErrors({ newPassword: "Network error" });
        }
    }

  return (
    <>
      <Navbar />
      <div className="main-forgot">
        <h2>Forgot Password</h2>
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <label htmlFor="email">Registered email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => handleChange(e, "email")}
                onBlur={(e) => handleBlur(e, "email")}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="otp-btn">
              <button type="submit" className="button">
                Send OTP
              </button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                name="otp"
                id="otp"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => handleChange(e, "otp")}
                onBlur={(e) => handleBlur(e, "otp")}
              />
              {errors.otp && <p className="error">{errors.otp}</p>}
            </div>
            <div className="verify-btn">
              <button type="submit" className="button">
                Verify OTP
              </button>
            </div>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => handleChange(e, "newPassword")}
                onBlur={(e) => handleBlur(e, "newPassword")}
              />
              {errors.newPassword && (
                <p className="error">{errors.newPassword}</p>
              )}
            </div>
            <div className="reset-btn">
              <button type="submit" className="button">
                Reset Password
              </button>
            </div>
          </form>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
}

export default ForgotPassword
