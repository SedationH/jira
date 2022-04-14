import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { AuthForm } from "src/auth-provider";
import { useAuth } from "src/context/auth-context";
import { ValidateStatus } from "antd/lib/form/FormItem";

const RegisterScreen = () => {
  const { register } = useAuth();
  const handleSubmit = ({
    cpassword,
    ...values
  }: { cpassword: string } & AuthForm) => {
    if (cpassword !== values.password) {
      setCpassword({
        validateStatus: "error",
        errorMsg: "密码输入不一致",
      });
      return;
    } else {
      setCpassword({
        validateStatus: "",
        errorMsg: "",
      });
    }

    register(values);
  };

  const [cpassword, setCpassword] = useState<{
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({});

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
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请输入密码" }]}
        validateStatus={cpassword.validateStatus}
        help={cpassword.errorMsg || ""}
      >
        <Input placeholder="确认密码" type="password" />
      </Form.Item>
      <Button block type="primary" htmlType="submit">
        注册
      </Button>
    </Form>
  );
};

export default RegisterScreen;
