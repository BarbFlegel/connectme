import { useForm } from "react-hook-form";
import { useAuth } from "../auth/useAuth";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreateActivity() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "activities"), {
        ...data,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });

      alert("Activity created!");
      reset();
    } catch (err) {
      console.error("Error creating activity:", err);
      alert("Failed to create activity");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Activity</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        {/* TITLE */}
        <div className="mb-3">
          <label className="form-label">Activity Title</label>
          <input
            className="form-control"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "Must be at least 3 characters" },
            })}
          />
          {errors.title && (
            <small className="text-danger">{errors.title.message}</small>
          )}
        </div>

        {/* CATEGORY */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            {...register("category", { required: true })}
          >
            <option value="">Select</option>
            <option value="volleyball">Volleyball</option>
            <option value="running">Running</option>
            <option value="gym">Gym</option>
            <option value="painting">Painting</option>
            <option value="coffee">Coffee meetup</option>
          </select>
          {errors.category && (
            <small className="text-danger">Category is required</small>
          )}
        </div>

        {/* LOCATION */}
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            className="form-control"
            {...register("location", { required: true })}
          />
          {errors.location && (
            <small className="text-danger">Location is required</small>
          )}
        </div>

        {/* DATE */}
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            {...register("date", { required: true })}
          />
          {errors.date && <small className="text-danger">Date required</small>}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <label className="form-label">Description (optional)</label>
          <textarea
            className="form-control"
            {...register("description")}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Activity
        </button>
      </form>
    </div>
  );
}
