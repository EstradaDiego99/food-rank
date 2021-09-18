import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./styles.css";
export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form className="login-form" onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "#20686c75" }} />}
          type="email"
          name="email"
          placeholder="Email"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "#20686c75" }} />}
          type="password"
          name="password"
          placeholder="Password"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form__button">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
