import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import styled from "@emotion/styled";
import { useProjectModal } from "../screens/project-list/utils";

export const ProjectModal = () => {
  const { projectModalOpen, closeProjectModal } = useProjectModal();
  const closeModal = () => {
    closeProjectModal();
  };

  const isLoading = false;

  const title = false ? "编辑项目" : "创建项目";

  return (
    <Drawer onClose={closeModal} visible={projectModalOpen} width={"100%"}>
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <Form layout={"vertical"} style={{ width: "40rem" }}>
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

              <Form.Item style={{ textAlign: "right" }}>
                <Button type={"primary"} htmlType={"submit"}>
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
