import { Button, Form, Input } from "antd";
import React, { FormEvent } from "react";
import { AuthForm } from "src/auth-provider";
import { useAuth } from "src/context/auth-context";

function LoginScreen() {
  const { login } = useAuth();

  const handleLoginSubmit = (values: AuthForm) => {
    login(values);
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
      <Button block type="primary" htmlType="submit">
        登陆
      </Button>
    </Form>
  );
}

export default LoginScreen;
