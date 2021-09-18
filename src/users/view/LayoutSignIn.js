import React from "react";
import { Tabs } from "antd";
import "./styles.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LayoutSignIn() {
  const { TabPane } = Tabs;

  return (
    <div className="layout-signin_wrapper">
      <div className="layout-signin_left">
        <h1 className="layout-signin_title">Welcome!</h1>

        <div className="layout-signin-tabs">
          <Tabs className="" type="card">
            <TabPane tab={<span>Log in</span>} key="1">
              <LoginForm></LoginForm>
            </TabPane>
            <TabPane tab={<span>Sign up</span>} key="2">
              <RegisterForm></RegisterForm>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div className="layout-signin_right"></div>
    </div>
  );
}
