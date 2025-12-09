import { collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useFirestoreQuery } from "@tanstack/react-query-firebase";
import { Link } from "react-router-dom";

export default function Activities() {
  const activitiesRef = collection(db, "activities");

  const activitiesQuery = query(activitiesRef, orderBy("createdAt", "desc"));

  const {
    data: activities,
    isLoading,
    error,
  } = useFirestoreQuery(["activities"], activitiesQuery, {
    subscribe: true, // real-time updates
  });

  if (isLoading) {
    return (
      <div className="container mt-4">
        <h2>Activities</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="container mt-4">Error loading activities.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Activities</h2>
        <Link to="/create-activity" className="btn btn-primary">
          + Create Activity
        </Link>
      </div>

      {activities?.docs.length === 0 && (
        <p>No activities yet. Be the first to create one!</p>
      )}

      <div className="list-group">
        {activities?.docs.map((doc) => {
          const activity = doc.data();
          return (
            <div className="list-group-item" key={doc.id}>
              <h5>{activity.title}</h5>
              <p className="mb-1">{activity.description}</p>

              <div className="small text-muted">
                <strong>Category:</strong> {activity.category} |
                <strong> Location:</strong> {activity.location} |
                <strong> Date:</strong> {activity.date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
