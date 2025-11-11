import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // adapte le chemin

function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home"); // redirection automatique ici
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
