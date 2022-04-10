import { useAuth } from "src/context/auth-context";
import ProjectListScreen from "src/screens/project-list";

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};

export default AuthenticatedApp;
