import styled from "@emotion/styled";
import { Row } from "src/components/lib";
import { useAuth } from "src/context/auth-context";
import ProjectListScreen from "src/screens/project-list";
import { ReactComponent as SoftwareLogo } from "src/assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProjectScreen from "src/screens/project";
import { ProjectModal } from "src/components/project-modal";

const AuthenticatedApp = () => {
  return (
    <Container>
      <BrowserRouter>
        <PageHeader />
        <Routes>
          <Route index element={<Navigate replace to="/projects" />} />
          <Route path="/projects" element={<ProjectListScreen />} />
          <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
        </Routes>

        <ProjectModal />
      </BrowserRouter>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header>
      <HeaderLeft gap={true}>
        <Button
          onClick={() => (window.location.href = window.location.origin)}
          type="link"
        >
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type="link">
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  justify-content: space-between;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

export default AuthenticatedApp;

// 如何使用 gird https://codepen.io/sedationh/pen/gOodbpw
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 */
