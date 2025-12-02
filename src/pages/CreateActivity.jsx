import { useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreateActivity() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("volleyball");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "activities"), {
        title,
        type,
        location,
        date,
        time,
        description,
        creatorId: user.uid,
        creatorName: profile?.username || user.email,
        participants: [user.uid],
        createdAt: serverTimestamp(),
      });

      navigate("/activities");
    } catch (err) {
      console.error("Error creating activity:", err);
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Create Activity</h2>

      <form onSubmit={handleCreate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="volleyball">Volleyball</option>
            <option value="running">Running</option>
            <option value="hiking">Hiking</option>
            <option value="painting">Painting</option>
            <option value="gym">Gym</option>
            <option value="boardgames">Board Games</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Prague 5, park, hall…"
            required
          />
        </div>

        <div className="mb-3 d-flex gap-3">
          <div className="flex-fill">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex-fill">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Creating..." : "Create Activity"}
        </button>
      </form>
    </div>
  );
}
