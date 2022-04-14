import { Button, Form, Input } from "antd";
import React from "react";
import { useAsyncFn } from "react-use";
import { AuthForm } from "src/auth-provider";
import { useAuth } from "src/context/auth-context";

function LoginScreen() {
  const { login } = useAuth();
  const [{ loading }, doLogin] = useAsyncFn((values) => login(values));

  const handleLoginSubmit = (values: AuthForm) => {
    doLogin(values);
  };

  return (
    <Form onFinish={handleLoginSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" />
      </Form.Item>
      <Button loading={loading} block type="primary" htmlType="submit">
        登陆
      </Button>
    </Form>
  );
}

export default LoginScreen;
