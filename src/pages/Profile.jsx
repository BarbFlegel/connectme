import { useAuth } from "../auth/useAuth";

export default function Profile() {
  const { user, profile } = useAuth();

  if (!user) return null;

  const displayName = profile?.username || user.email;

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Profile</h2>

      <div className="card">
        <div className="card-body">
          <p>
            <strong>Display name:</strong> {displayName}
          </p>
          <p>
            <strong>Username:</strong> {profile?.username || "—"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Email verified:</strong>{" "}
            {user.emailVerified ? "Yes ✅" : "No ❌"}
          </p>
        </div>
      </div>
    </div>
  );
}
