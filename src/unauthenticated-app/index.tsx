import { Button, Card } from "antd";
import React, { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";

function UnauthenticatedApp() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        <div>{isLogin ? <LoginScreen /> : <RegisterScreen />}</div>
        <Button
          style={{ marginTop: "10px" }}
          block
          onClick={() => setIsLogin(!isLogin)}
        >
          切换
        </Button>
      </Card>
    </div>
  );
}

export default UnauthenticatedApp;
