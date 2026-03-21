import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="splash">
        <div className="spinner" />
      </div>
    );
  }

  if (!user) {
    // Redirect handled in App.jsx via conditional rendering
    return null;
  }

  return children;
}
