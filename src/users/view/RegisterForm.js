import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./styles.css";
import { signUpApi } from "../api";
export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
    dishesELO: {},
  });
  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const register = async () => {
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const emailVal = inputs.email;
    const nameVal = inputs.name;
    if (!emailVal || !passwordVal || !repeatPasswordVal || !nameVal) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification["error"]({
          message: "Las contraseñas deben ser iguales",
        });
      } else {
        // TO-DO: Conectar con API y registrar usuario
        const result = await signUpApi(inputs);
        if (!result.ok) {
          notification["error"]({
            message: result.message,
          });
        } else {
          notification["success"]({
            message: result.message,
          });
          resetForm();
        }
      }
    }
  };
  const resetForm = () => {
    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
    });
  };
  return (
    <Form
      className="login-form"
      onChange={changeForm}
      onSubmitCapture={register}
    >
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "#20686c75" }} />}
          type="text"
          name="name"
          placeholder="Name"
          className="login-form__input"
          value={inputs.name}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "#20686c75" }} />}
          type="email"
          name="email"
          placeholder="Email"
          className="login-form__input"
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "#20686c75" }} />}
          type="password"
          name="password"
          placeholder="Password"
          className="login-form__input"
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "#20686c75" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Confirm Password"
          className="login-form__input"
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form__button">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
