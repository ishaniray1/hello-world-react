import { AuthProvider, useAuth } from "./hooks/useAuth";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function AppInner() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="splash">
        <div className="spinner" />
      </div>
    );
  }

  return user ? <HomePage /> : <AuthPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
