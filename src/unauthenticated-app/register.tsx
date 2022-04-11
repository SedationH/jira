import React from "react";
import { Button, Form, Input } from "antd";
import { AuthForm } from "src/auth-provider";
import { useAuth } from "src/context/auth-context";

const RegisterScreen = () => {
  const { register } = useAuth();
  const handleSubmit = (values: AuthForm) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubmit}>
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
        注册
      </Button>
    </Form>
  );
};

export default RegisterScreen;
