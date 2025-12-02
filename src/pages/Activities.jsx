import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "activities"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      setActivities(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Activities</h2>

      {activities.length === 0 && <p>No activities yet.</p>}

      {activities.map((a) => (
        <div key={a.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{a.title}</h5>
            <p className="text-muted mb-1">{a.type}</p>
            <p className="mb-1">{a.location}</p>
            <p className="mb-1">
              {a.date} at {a.time}
            </p>
            <small className="text-muted">Created by: {a.creatorName}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
