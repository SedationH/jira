import { Button, Drawer, Form, Input, Spin } from "antd";
import styled from "@emotion/styled";
import { useProjectModal } from "./utils";
import { useUsers } from "src/screens/project-list/utils";
import IdSelect from "../id-select";
import { useAsyncFn } from "react-use";
import { useRequest } from "src/utils/request";
import { Project } from "src/screens/project-list/list";
import { useTitle } from "src/utils";

export const ProjectModal = () => {
  const {
    projectModalOpen,
    closeProjectModal,
    editingProject,
    editingProjectId,
  } = useProjectModal();

  const closeModal = () => {
    closeProjectModal();
  };

  const { users, userLoading, usersError, usersRetry } = useUsers();
  const client = useRequest();

  const [_, doAddProject] = useAsyncFn((params: Partial<Project>) =>
    client(`projects`, {
      data: params,
      method: "POST",
    })
  );

  const title = editingProjectId !== undefined ? "编辑项目" : "创建项目";

  useTitle(title, false);

  const onFinish = (values: any) => {
    doAddProject(values).finally(() => {
      closeProjectModal();
    });
  };

  return (
    <Drawer onClose={closeModal} visible={projectModalOpen} width={"100%"}>
      <Container>
        {userLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <Form
              onFinish={onFinish}
              layout={"vertical"}
              style={{ width: "40rem" }}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>

              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <IdSelect
                  defaultOption={{ label: "负责人" }}
                  options={users.map(({ name, id }) => ({ label: name, id }))}
                />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button type={"primary"} htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
