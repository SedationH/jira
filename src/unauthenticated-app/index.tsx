import styled from "@emotion/styled";
import { Button, Card, Divider } from "antd";
import React, { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";

import logo from "src/assets/logo.svg";
import left from "src/assets/left.svg";
import right from "src/assets/right.svg";

function UnauthenticatedApp() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Container>
      <Background />
      <Header />
      <ShadowedCard>
        <Title>{isLogin ? "请登录" : "请注册"}</Title>
        {isLogin ? <LoginScreen /> : <RegisterScreen />}
        <ButtonWithMargin block onClick={() => setIsLogin(!isLogin)}>
          切换
        </ButtonWithMargin>
      </ShadowedCard>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowedCard = styled(Card)`
  width: 40rem;
  min-height: 50rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const ButtonWithMargin = styled(Button)`
  margin-top: 20px;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export default UnauthenticatedApp;
