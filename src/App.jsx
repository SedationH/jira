import React from "react";
import { useAuth } from "src/context/auth-context";
import AuthenticatedApp from "src/authenticated-app";
import UnauthenticatedApp from "src/unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
