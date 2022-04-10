import React, { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";

function UnauthenticatedApp() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <button onClick={() => setIsLogin(!isLogin)}>切换</button>
      <div>{isLogin ? <LoginScreen /> : <RegisterScreen />}</div>
    </div>
  );
}

export default UnauthenticatedApp;
