import { Button, Drawer, Form, Input, Spin } from "antd";
import styled from "@emotion/styled";
import { useProjectModal } from "./utils";
import { useUsers } from "src/screens/project-list/utils";
import IdSelect from "../id-select";
import { useAsyncFn } from "react-use";
import { useRequest } from "src/utils/request";
import { Project } from "src/screens/project-list/list";
import { useTitle } from "src/utils";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";

export const ProjectModal = () => {
  const {
    projectModalOpen,
    closeProjectModal,
    editingProject,
    editingProjectId,
    projectLoading,
  } = useProjectModal();

  const [form] = useForm();

  const closeModal = () => {
    form.resetFields();
    closeProjectModal();
  };

  useEffect(() => {
    form.setFieldsValue(editingProject); //设置输入框的值
  }, [editingProject, form]);

  const { users, userLoading } = useUsers();
  const client = useRequest();

  const [, doAddProject] = useAsyncFn((params: Partial<Project>) =>
    client(`projects`, {
      data: params,
      method: "POST",
    })
  );

  const [, doModifyProject] = useAsyncFn((params: Partial<Project>) => {
    console.log(params);
    return client(`projects/${params.id}`, {
      data: params,
      method: "PATCH",
    });
  });

  const isEditing = editingProjectId !== undefined;

  const title = isEditing ? "编辑项目" : "创建项目";

  const mutateProject = isEditing ? doModifyProject : doAddProject;

  const onFinish = (values: any) => {
    mutateProject({
      ...values,
      id: editingProjectId,
    }).finally(() => {
      closeProjectModal();
    });
  };

  useTitle(title, false);
  return (
    <Drawer
      forceRender
      onClose={closeModal}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {userLoading || projectLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <Form
              form={form}
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
