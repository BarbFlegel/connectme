import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "../auth/useAuth";
import { useState } from "react";

export default function ResendVerification() {
  const { user } = useAuth();
  const [status, setStatus] = useState("");

  const handleResend = async () => {
    if (!user) return;
    try {
      await sendEmailVerification(user);
      setStatus("Verification email sent!");
    } catch (err) {
      console.error(err);
      setStatus("Failed to send email. Try again.");
    }
  };

  return (
    <div className="mt-3">
      <button className="btn btn-primary" onClick={handleResend}>
        Resend verification email
      </button>
      {status && <p className="mt-2 text-success">{status}</p>}
    </div>
  );
}
