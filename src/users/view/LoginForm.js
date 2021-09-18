import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";

import "./styles.css";
import { signInApi } from "../api";

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
  const login = async () => {
    const result = await signInApi(inputs);
    console.log(result);
    if (result.message) {
      notification["error"]({
        message: result.message,
      });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      notification["success"]({
        message: "Login exitoso",
      });
      window.location.href = "/";
    }
  };
  return (
    <Form className="login-form" onChange={changeForm} onSubmitCapture={login}>
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
